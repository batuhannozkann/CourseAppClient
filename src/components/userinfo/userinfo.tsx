import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Api} from '../../utilties/OcelotApi'
import { identityServerApi } from '../../utilties/identityServerApi'
import { FaUserAlt } from "react-icons/fa";
import {Navbar} from '../navbar/navbar'

export const User = ()=>{
    const [userInfo,setUserInfo]:any = useState();
    const params = useParams();
    console.log(params.username);
    useEffect(()=>{
        identityServerApi.getUserInfo().then((x:any)=>setUserInfo(x.data));
    },[])
    console.log(userInfo);
    const cardData = [
        {
          imageUrl: 'https://i.imgur.com/ccMhxvC.png',
          title: 'Stripe',
          subtitle: 'Payment Services',
          ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
          description: 'Get more context on your users with stripe data inside our platform.',
          installs: 'Installed 172 times',
        },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },{
            imageUrl: 'https://i.imgur.com/ccMhxvC.png',
            title: 'Stripe',
            subtitle: 'Payment Services',
            ratings: Array(4).fill().map((_, index) => <i key={index} className="fa fa-star"></i>),
            description: 'Get more context on your users with stripe data inside our platform.',
            installs: 'Installed 172 times',
          },
        // Diğer kart verileri buraya eklenir
      ];
    return(
        <div>
           <Navbar/>
           <div className='row'>
                <div className="col-md-4 ps-5 pt-5">
                    <div className="card">
                        <div className="card-title"><div className="pt-3 ps-3 d-flex"><FaUserAlt></FaUserAlt><div className="h5 mx-3">Account</div></div></div>
                    <div className="p-3 mt-4 card-body">
                <div className="mb-3 row">
      <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email:  </label>
      <div className="col-10">
        <input
          type="text"
          readOnly
          className="form-control"
          id="staticEmail"
          value={userInfo?.username}
        />
      </div>
    </div>
    <div className="mb-3 row">
      <label htmlFor="staticName" className="col-sm-2 col-form-label">Full Name:</label>
      <div className="col-sm-10">
        <input
          type="text"
          readOnly
          className="form-control"
          id="staticEmail"
          value={userInfo?.fullname}
        />
      </div>
    </div>
    <div className="mb-3 row">
      <label htmlFor="staticCity" className="col-sm-2 col-form-label">City:</label>
      <div className="col-sm-10">
        <input
          type="text"
          readOnly
          className="form-control"
          id="staticEmail"
          value="İstanbul"
        />
      </div>
    </div>
    </div>
    </div>
                </div>
                <div className="col-md-8">
                <div className="container mt-4">
      <div className="row">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-4 mt-4">
            <div className="card p-3">
              <div className="d-flex flex-row mb-3">
                <img src={card.imageUrl} width="70" alt={`Logo for ${card.title}`} />
                <div className="d-flex flex-column ml-2">
                  <span>{card.title}</span>
                  <span className="text-black-50">{card.subtitle}</span>
                  <span className="ratings">{card.ratings}</span>
                </div>
              </div>
              <h6>{card.description}</h6>
              <div className="d-flex justify-content-between install mt-3">
                <span>{card.installs}</span>
                <span className="text-primary">View&nbsp;<i className="fa fa-angle-right"></i></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
                </div>
           </div>
        </div>
    )
}