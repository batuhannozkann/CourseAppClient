import {createRefresh} from 'react-auth-kit';
import {identityServerApi} from './identityServerApi'
import Cookies from 'js-cookie';


const my_refresh_api = createRefresh({
  interval:3, // The time in sec to refresh the Access token 
  refreshApiCallback: async (param:any): Promise<any>  =>  {
    try {
      const response:any = await identityServerApi.getTokenByRefreshToken(param.refreshToken);
      console.log('refreshing');
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: response.data.expires_in,
        newRefreshTokenExpiresIn: 60*60*24
      };
    }
    catch (error) {
      Cookies.remove('_auth');
      window.location.reload();
      return {
        isSuccess: false
      };
    }
  }
})
export default my_refresh_api;
