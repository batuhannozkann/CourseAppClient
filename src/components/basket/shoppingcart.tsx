import  { useEffect, useState } from 'react';
import './shoppingcart.css'
import useApi from '../../utilties/OcelotApi';
import { BasketDto } from '../../dtos/basketdto';
import { BasketItemDto } from '../../dtos/basketitem';
import { AlertifyLibrary, NotificationPosition } from '../../utilties/Alertify';
import { getDecryptedCookie } from '../../utilties/cookieHelper';
import { NavLink } from 'react-router-dom';

const ShoppingCart = (props:any) => {
  const {sendRequest} = useApi();
  const [deleteTrigger,setDeleteTrigger] = useState(0);
  const [basket,setBasket] = useState<BasketDto>();
  const [user,setUser]:any = useState();
  useEffect(()=>{
    setUser(JSON.parse(getDecryptedCookie("user")));
  },[])
  useEffect(()=>{
    sendRequest('get','basket','basket').then((x:any)=>{setBasket(x.data);console.log(x)});
    console.log('çalıştı');
  },[props.trigger])
  useEffect(()=>{
    deleteTrigger==0?"":sendRequest('get','basket','basket').then((x:any)=>{setBasket(x.data);console.log(x.data)});
    console.log('çalıştı');
  },[deleteTrigger])
  return (

      <div className="shoppingcart-section" onClick={(event:any)=>{event.stopPropagation()}}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">

                <div className="row">

                  <div className="col-lg-7">
                    <h5 className="mb-3"><NavLink to="/" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</NavLink></h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {basket?.basketItems.length} items in your cart</p>
                      </div>
                      <div>
                        <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                            className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                      </div>
                    </div>
                    {basket?.basketItems.map((x:BasketItemDto)=>{
                      return(
                        <div key={x.courseId} className="card mb-3">
                       <div className="card-body">
                         <div className="d-flex justify-content-between">
                           <div className="d-flex flex-row align-items-center">
                             <div>
                               <img
                                 src={x.coursePicture}
                                 className=" img-fluid rounded-3" alt="Shopping item" width={"160vw"} />
                             </div>
                             <div className="ms-3">
                               <h6>{x.courseName}</h6>
                               <p className="small mb-0"></p>
                             </div>
                           </div>
                           <div className="d-flex flex-row align-items-center">
                             <div style={{ width: '30%' }}>
                             </div>
                             <div style={{ width: '110px' }}>
                               <h6 className="mb-0">${x.price}</h6>
                             </div>
                             <div className="deleteCourse" onClick={()=>{sendRequest('delete','basket','basket',{},`DeleteElement?courseId=${x.courseId}`).then((y)=>{console.log(y);setDeleteTrigger(deleteTrigger+1);AlertifyLibrary.AlertifyWarning(`${x.courseName} has deleted on your cart`,NotificationPosition.topCenter)})}}  style={{ color: '#cecece' }}><i className="fas fa-trash-alt"></i></div>
                           </div>
                         </div>
                       </div>
                     </div>
                      )
                    })}

                    {/* Diğer kartlar ve içerikleri buraya eklenir */}

                  </div>
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Total</h5>
                          <img src={user?.picture}
                            className="img-fluid rounded-3" style={{ width: '45px' }} alt="Avatar" />
                        </div>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${basket?.totalPrice}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$0</p>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">${basket?.totalPrice}</p>
                        </div>

                        <NavLink to={"/User/Order"} className="btn btn-info btn-block btn-lg">
                          <div className="d-flex justify-content-between">
                            <span>${basket?.totalPrice} Checkout</span>
                            <span><i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                          </div>
                        </NavLink>

                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ShoppingCart;
