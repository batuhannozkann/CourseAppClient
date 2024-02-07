import React, { useEffect, useState } from 'react';
import useApi from '../../utilties/OcelotApi';
import { BasketDto } from '../../dtos/basketdto';
import { BasketItemDto } from '../../dtos/basketitem';
import { AlertifyLibrary, NotificationPosition } from '../../utilties/Alertify';
import RequireAuth from '../layouts/RequireAuth';
import Layout from '../layouts/layout';
import { getDecryptedCookie } from '../../utilties/cookieHelper';
import { Formik, Field, Form, useFormik } from 'formik';
import { orderSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';


export const Order = () => {
  const navigate = useNavigate();
  const {sendRequest} = useApi();
  const [deleteTrigger,setDeleteTrigger] = useState(0);
  const [basket,setBasket] = useState<BasketDto>();
  const [basketItems,setBasketItems] = useState()
  useEffect(()=>{
    sendRequest('get','basket','basket').then((x:any)=>{setBasket(x.data);console.log(x.data)});
    console.log('çalıştı');
  },[deleteTrigger])
  useEffect(() => {
      orderFormik.validateForm();
  }, [])
  const [user,setUser] = useState(JSON.parse(getDecryptedCookie("user")));
  const handleOnClick=()=>{
    if(orderFormik.errors)
    {
        const errorFields = [
            'province',
            'district',
            'street',
            'line',
            'zipcode',
            'cardholderName',
            'cardNumber',
            'expirationMonth',
            'expirationYear',
            'cvv',
          ];
        const errorsObject = Object.values(orderFormik.errors);
        var schemaErrors = ""
        errorFields.forEach((field, index) => {
            const errorMessage = errorsObject[index];
            if (errorMessage) {
              schemaErrors += errorMessage + '<br>';
            }
          });
          schemaErrors!=""?AlertifyLibrary.AlertifyWarning(schemaErrors,NotificationPosition.topCenter):"";
        
    }
  }
  const orderFormik = useFormik({
    initialValues:{
        province:"",
        district:"",
        street:"",
        line:"",
        zipcode:"",
        cardholderName:"",
        cardNumber:"",
        expirationMonth:"",
        expirationYear:"",
        cvv:""
    },
    validationSchema:orderSchema,
    onSubmit:(values)=>{
        sendRequest('get','fakepayment','fakepayment').then((x:any)=>{
            console.log(x);
            if(x.data)
            {
              sendRequest('post','catalog','course',basket?.basketItems.map(x => ({ courseId: x.courseId })),'CreatePurchasedCoursesToUser')
              .then(()=>sendRequest('post','order','order',addOrderCommand))
              .then((x:any)=>{navigate(`/User/Order/${x.data.id}`, { state: { orderCompleted: true } })})
              .then(()=>{sendRequest('delete','basket','basket')})
              

            }
        });
        const addOrderCommand:OrderDto = {
            address: {
                province: values.province,
                district: values.district,
                street: values.street,
                line: values.line,
                zipcode: values.zipcode.toString()
            },
            orderItems: []
        }
        basket?.basketItems.map((x)=>{
            addOrderCommand.orderItems.push({
                productId:x.courseId,
                productName:x.courseName,
                price:x.price.toString(),
                pictureUrl:x.coursePicture,
            })
        })
        
        
    }
  });

  return (
    <RequireAuth>
        <Layout>
      <div className="order-section" onClick={(event:any)=>{event.stopPropagation()}}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card" style={{minHeight:`calc(100vh - 96px)`}}>
              <div className="card-body p-4">

                <div className="row">

                  <div className="col-lg-7">
                    <h5 className="mb-3"><a href="#!" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
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
                                 className="img-fluid rounded-3" alt="Shopping item" style={{ width: '65px' }} />
                             </div>
                             <div className="ms-3">
                               <h5>{x.courseName}</h5>
                               <p className="small mb-0"></p>
                             </div>
                           </div>
                           <div className="d-flex flex-row align-items-center">
                             <div style={{ width: '50px' }}>
                             </div>
                             <div style={{ width: '80px' }}>
                               <h5 className="mb-0">${x.price}</h5>
                             </div>
                             <a onClick={()=>{sendRequest('delete','basket','basket',{},`DeleteElement?courseId=${x.courseId}`).then((y)=>{console.log(y);setDeleteTrigger(deleteTrigger+1);AlertifyLibrary.AlertifyWarning(`${x.courseName} has deleted on your cart`,NotificationPosition.topCenter)})}} href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt"></i></a>
                           </div>
                         </div>
                       </div>
                     </div>
                      )
                    })}

                    {/* Diğer kartlar ve içerikleri buraya eklenir */}

                  </div>
                  <div className="col-lg-5">
                  <div className="card mb-2 bg-dark text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-0">
                          <h5 className="mb-0">Address</h5>
                        </div>
                        <form className="mt-1">
                        <div className="row">
                          <div className="form-outline col-6 form-white input-group-sm mb-1">
                          <label className="form-label" htmlFor="province">Province</label>
                            <input type="text" id="province" name="province" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                              placeholder="Province" />
                            
                          </div>
                          <div className="form-outline col-6 form-white input-group-sm mb-1">
                          <label className="form-label" htmlFor="district">District</label>
                            <input type="text" id="district" name="district" onChange={orderFormik.handleChange} className="form-control form-control-lg" 
                              placeholder="District" />
                              
                          </div>
                          </div>
                          <div className="row">
                          <div className="form-outline col-6 input-group-sm form-white mb-1">
                          <label className="form-label" htmlFor="street">Street</label>
                            <input type="text" id="street" name="street" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                              placeholder="Street" />
                            
                          </div>
                          <div className="form-outline col-6 input-group-sm form-white mb-1">
                          <label className="form-label" htmlFor="line">Line</label>
                            <input type="text" id="line" name="line" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                              placeholder="Line" />
                             
                          </div>
                          <div className="form-outline col-3 input-group-sm form-white mb-1">
                          <label className="form-label" htmlFor="zipcode">Zipcode</label>
                            <input type="number" id="zipcode" name="zipcode" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                              placeholder="Zipcode" />
                              
                          </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Credit card</h5>
                        </div>

                        <p className="small mb-2">Card type</p>
                        <a href="#!" type="submit" className="text-white"><i
                            className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                        <a href="#!" type="submit" className="text-white"><i
                            className="fab fa-cc-visa fa-2x me-2"></i></a>
                        <a href="#!" type="submit" className="text-white"><i
                            className="fab fa-cc-amex fa-2x me-2"></i></a>
                        <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                        <form className="mt-4">
                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="cardholderName">Cardholder's Name</label>
                            <input type="text" id="cardholderName" name="cardholderName" onChange={orderFormik.handleChange} className="form-control form-control-lg" 
                              placeholder="Cardholder's Name" /> 
                          </div>

                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="cardNumber">Card Number</label>
                            <input maxLength={17} type="text" id="cardNumber" name="cardNumber" onChange={orderFormik.handleChange}  className="form-control form-control-lg" 
                              placeholder="1234 5678 9012 3457" />
                          </div>

                          <div className="row mb-4 mx-1">
                            <div className="col-md-2 px-0">
                              <div className="form-outline form-white">
                              <label className="form-label" htmlFor="expirationMonth">Month</label>
                                <input maxLength={2} type="text" id="expirationMonth" name="expirationMonth" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                                  placeholder="MM"  /> 
                              </div>
                            </div>
                            <div className="col-md-2 px-0">
                              <div className="form-outline form-white">
                              <label className="form-label" htmlFor="expirationYear">Year</label>
                                <input maxLength={4} type="text" id="expirationYear" name="expirationYear" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                                  placeholder="YYYY"  /> 
                              </div>
                              
                            </div>
                            <div className="col-md-2">
                              <div className="form-outline form-white">
                              <label className="form-label" htmlFor="cvv">Cvv</label>
                                <input maxLength={3} type="password" id="cvv" name="cvv" onChange={orderFormik.handleChange} className="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;"/>
                              </div>
                            </div>
                          </div>

                        </form>

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
                        {basket?.totalPrice==0?<button type="button" className="btn btn-danger btn-block btn-lg">
                          <div className="d-flex justify-content-between">
                            <span>Your cart empty</span>
                            </div>
                        </button>
                        :
                        <button onClick={()=>{orderFormik.submitForm();handleOnClick()}} type="button" className="btn btn-info btn-block btn-lg">
                          <div className="d-flex justify-content-between">
                            <span>${basket?.totalPrice} Place Order</span>
                            <span> <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                          </div>
                        </button>}
                        

                      </div>
                    </div>
                    

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
      </RequireAuth>
  );
}

