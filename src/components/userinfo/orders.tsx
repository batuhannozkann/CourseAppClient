import { useEffect, useState } from "react";
import useApi from "../../utilties/OcelotApi";
import Layout from "../layouts/layout";
import { NavLink } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import  RequireAuth  from "../layouts/RequireAuth";
import { useIsAuthenticated } from "react-auth-kit";
import { Loading } from "../../utilties/loading";

export const MyOrders = ()=>{
        const {sendRequest} = useApi();
        const [order,setOrder]:any = useState<OrderDto>();
        const [displayData,setDisplayData]:any = useState();
        const [first, setFirst] = useState(0);
        const [rows, setRows] = useState(7);
        const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
        const isAuthenticated = useIsAuthenticated();
    
        const sortOrders = () => {
            const sortedProducts = [...order].sort((a, b) => {
              if (sortByPriceAsc) {
                return a.totalPrice - b.totalPrice;
              } else {
                return b.totalPrice - a.totalPrice;
              }
            });
            setOrder(sortedProducts);
            console.log(sortedProducts);
            setDisplayData(sortedProducts.slice(first,first+rows));
            setSortByPriceAsc(!sortByPriceAsc);
          };
        const onPageChange = (event:any) => {
            const { first, rows } = event;
            setFirst(first);
            setRows(rows);
            const newData = order.slice(first, first + rows);
            setDisplayData(newData);
        };
        // const [user,setUser] = useState();
        const isMobile = window.innerWidth<=976;
        const [trigger,setTrigger] = useState(0);
        useEffect(() =>{
            if(trigger==0 && isAuthenticated())sendRequest('get','order','order').then((x:any)=>{setOrder(x.data);setDisplayData(x.data.reverse().slice(0,7));setTrigger(trigger+1)});
        },[trigger])
        if(displayData==undefined)
        {
            return(
                <RequireAuth>
            <Layout>
            <Loading/>
            </Layout>
            </RequireAuth>
            )
        }
      return (
        <RequireAuth>
        <Layout>
          <div className="container mt-5">
        <div className="row">
            <div className="col-xl-8">
                        <h5 className="mb-3">My Last Orders</h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-0">You have {order?.length} last orders</p>
                          </div>
                          <div className="justify-content-end">
                            <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" onClick={()=>{sortOrders()}}
                                className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                          </div>
                        </div></div>
                        
                {displayData?.map((x:any)=>{
                    return(
                        <div key={x.productId} className="card border shadow-none">
                    <div className="card-body">
                        <div className="d-flex align-items-start border-bottom pb-3">
                            <div className="flex-grow-1 align-self-center overflow-hidden">
                            <NavLink to={`/User/Order/${x.id}`}><h5 className="text-primary">{`#MC${x.id}`}</h5></NavLink>
                            <hr/>
                                {x.orderItems.map((y:any,index:number)=>{
                                    return(
                                        <div className="row">
                                        <h6 className={`${isMobile?"col-8":"col-9"} text-truncate font-size-18 `}><NavLink to={`/Course/View/${y.productId}`} className="text-dark">{`${index+1}-${y.productName}`}</NavLink></h6>
                                        <h6 className={`${isMobile?"col-4":"col-3"} ps-5`}>${y.price}</h6>
                                    </div>
                                        )
                                })
                                }
                                
                            </div>
                        </div>
    
                        <div>
                            <div className="row">
                            <div className="col-md-4">
                                    <div className="mt-3">
                                        <p className="text-muted mb-2">Date</p>
                                        <div className="d-inline-flex">
                                         {new Date(x.createdDate).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mt-3">
                                        <p className="text-muted mb-2">Quantity</p>
                                        <div className="d-inline-flex">
                                         {x.orderItems.length}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mt-3">
                                        <p className="text-muted mb-2">Total</p>
                                        <h6>${x.totalPrice}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
                    )
                })}
                <div className="row my-4">
                    <div className="col-sm-6">
                        <div className="text-sm-end mt-2 mt-sm-0">
                            <a href="/User/PurchasedCourses" className="btn btn-success">
                                <i className="mdi mdi-cart-outline me-1"></i> Continue Learn </a>
                        </div>
                    </div> {/* end col */}
                </div> {/* end row*/}
            </div>
        </div>
        <div >
            <Paginator first={first} rows={rows} totalRecords={order?.length} rowsPerPageOptions={[10, 7, 5]} onPageChange={onPageChange} />
        </div>
        </Layout></RequireAuth>)
}