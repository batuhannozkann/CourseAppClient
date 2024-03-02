import { MutatingDots } from 'react-loader-spinner';
import { TailSpin } from 'react-loader-spinner';
export const Loading = ()=>{
    return (
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} className=""><MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
    );
}
export const TailSpinLoader = ()=>{
    return(<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} className="">
        <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>)
}