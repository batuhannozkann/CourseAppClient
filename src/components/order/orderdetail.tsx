import { NavLink, useLocation, useParams } from "react-router-dom";
import Layout from "../layouts/layout";
import useApi from "../../utilties/OcelotApi";
import { useEffect, useState } from "react";
import RequireAuth from "../layouts/RequireAuth";
import './orderdetail.css'
import { Loading } from "../../utilties/loading";


export const OrderDetail = () => {
    const {id} = useParams()
    const location = useLocation();
    const {sendRequest} = useApi();
    const [order,setOrder]:any = useState<OrderDto>();
    // const [user,setUser] = useState();
    const [courses,setCourses] = useState<any[]>([]);
    const [trigger,setTrigger] = useState(0);
    const orderCompleted = location.state?.orderCompleted || false;
    // useEffect(()=>{
    //   setUser(JSON.parse(getDecryptedCookie("user")));
    // },[])
    useEffect(() =>{
        if(trigger==0)sendRequest('get','order','order',{},`GetOrderByOrderId?id=${id}`).then((x:any)=>{setOrder(x.data)});
        if(order!=undefined)
        {
            const selectedCourses= order?.orderItems.map((x: OrderItemDto) => {
                return sendRequest('get', 'catalog', 'course', {}, `GetById?id=${x.productId}`)
                    .then((y: any) => y.data);
            });
            Promise.all(selectedCourses).then((results:any)=>{setCourses(results)});
        }
    },[trigger])
    if(order==undefined)
    {
        return(
            <RequireAuth>
        <Layout>
            <Loading/>
        </Layout>
        </RequireAuth>)
    }
  return (
    <Layout>
      <div className="container mt-5">
    <div className="row">
        <div className="col-xl-8">
        <div className="col-lg-12">
        {orderCompleted? <div className="alert alert-success d-inline-block" role="alert">
          Your order has been succesfully created.
        </div>:""}
                    <h5 className="mb-3">Order Detail</h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Order created date: {new Date(order?.createdDate).toLocaleString()}</p>
                        <p className="mb-0">You have {order?.orderItems.length} items in your order</p>
                      </div>
                      <div className="justify-content-end">
                        <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                            className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                      </div>
                    </div></div>
            {order?.orderItems.map((x:OrderItemDto)=>{
                    trigger==0?setTrigger(trigger+1):"";
                    var course = courses.find((course:CourseDto)=>course.id == x.productId);
                return(
                    <div key={x.productId} className="card border shadow-none">
                <div className="card-body">
                    <div className="d-flex align-items-start border-bottom pb-3">
                        <div className="me-4">
                            <img src={x.pictureUrl} alt="" className="avatar-lg rounded" />
                        </div>
                        <div className="flex-grow-1 align-self-center overflow-hidden">
                            <div>
                                <h5 className="text-truncate font-size-18"><a href="#" className="text-dark">{x.productName}</a></h5>
                                <p className="text-muted mb-0">
                                    <i className="bx bxs-star text-warning"></i>
                                    <i className="bx bxs-star text-warning"></i>
                                    <i className="bx bxs-star text-warning"></i>
                                    <i className="bx bxs-star text-warning"></i>
                                    <i className="bx bxs-star-half text-warning"></i>
                                </p>
                                <p className="mb-0 mt-1">Category : <NavLink to={"#"} className="fw-medium">{course?.category.name}</NavLink></p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 ms-2">
                            <ul className="list-inline mb-0 font-size-16">
                                <li className="list-inline-item">
                                    <a href="#" className="text-muted px-1">
                                        <i className="mdi mdi-trash-can-outline"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-muted px-1">
                                        <i className="mdi mdi-heart-outline"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mt-3">
                                    <p className="text-muted mb-2">Price</p>
                                    <h5 className="mb-0 mt-2"><span className="text-muted me-2"></span>${x.price}</h5>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="mt-3">
                                    <p className="text-muted mb-2">Quantity</p>
                                    <div className="d-inline-flex">
                                     1
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mt-3">
                                    <p className="text-muted mb-2">Total</p>
                                    <h5>${x.price}</h5>
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
                        <NavLink to="/User/PurchasedCourses" className="btn btn-success">
                            <i className="mdi mdi-cart-outline me-1"></i> Continue Learn </NavLink>
                    </div>
                </div> {/* end col */}
            </div> {/* end row*/}
        </div>

        <div className="col-xl-4">
            <div className="mt-5 mt-lg-0">
                <div className="card border shadow-none">
                    <div className="card-header bg-transparent border-bottom py-3 px-4">
                        <h5 className="font-size-16 mb-0">Order Summary <span className="float-end">#MC{order?.id}</span></h5>
                    </div>
                    <div className="card-body p-4 pt-2">

                        <div className="table-responsive">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <td>Sub Total :</td>
                                        <td className="text-end">${order?.totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount : </td>
                                        <td className="text-end">$0</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Charge :</td>
                                        <td className="text-end">$0</td>
                                    </tr>
                                    <tr className="bg-light">
                                        <th>Total :</th>
                                        <td className="text-end">
                                            <span className="fw-bold">
                                                ${order?.totalPrice}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* end table-responsive */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* end row */}
    
</div>
    </Layout>
  );
};


        