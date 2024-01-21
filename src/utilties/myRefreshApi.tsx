import {createRefresh} from 'react-auth-kit';
import {identityServerApi} from './identityServerApi'

const my_refresh_api = createRefresh({
  interval: 10, // The time in sec to refresh the Access token 
  refreshApiCallback: async (param:any): Promise<any>  =>  {
    try {
      const response:any = await identityServerApi.getTokenByRefreshToken(param.refreshToken);
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      };
    }
    catch (error) {
      console.error(error);
      return {
        isSuccess: false
      };
    }
  }
})
export default my_refresh_api;
