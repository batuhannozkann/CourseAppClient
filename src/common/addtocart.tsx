import { TiShoppingCart } from "react-icons/ti"
import useApi from "../utilties/OcelotApi";
import { BasketDto } from "../dtos/basketdto";
import { AlertifyLibrary, NotificationPosition } from "../utilties/Alertify";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";


const AddToCart = ({course,size,isMobile}:any) => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const {sendRequest} = useApi();
    const handleOnClick:any = ()=> {
        if(isAuthenticated())
        {
            const basketDto:BasketDto = {
                basketItems: [{
                    courseId:course.id,
                    courseName:course.name,
                    coursePicture:course.picture,
                    price:course.price,
                    
                }],
                totalPrice: 0
            }
            console.log(course);
            console.log("Sending basketDto:", basketDto);
            sendRequest('post','basket','basket',basketDto).then(()=>{AlertifyLibrary.AlertifySuccess(`${course.name} added on your cart`,NotificationPosition.topCenter)}).catch(e=>console.log(e));
        }
        else{
            navigate('/login');
        }
        
    }
    var className="btn btn-outline-primary btn-sm";
    if(size=='lg')
        {
            className="btn btn-outline-primary btn-lg"
        }
    else if(size =='md')
    {
        className="btn btn-outline-primary btn-md"
    }
    return(
        <div>
            <a onClick={handleOnClick} className={className}>
        {isMobile?"":"Add to cart"}<TiShoppingCart />
      </a>      </div>
         
        )
}
export default AddToCart