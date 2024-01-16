import {createRefresh} from 'react-auth-kit';
import {identityServerApi} from './identityServerApi'

 const refresh = createRefresh({
  interval:10,
  refreshApiCallback: async (param:any): Promise<any> => {
    try {
      // Gerçek bir API çağrısı yapılmalıdır
      console.log(param);
      const response = await identityServerApi.getTokenByRefreshToken(param.refreshToken);
      console.log(response.data);
      console.log("Refreshing");

      // Gerçek API yanıtlarına uygun şekilde değerleri ayarlayın
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: response.data.expires_in,
        newRefreshToken:response.data.refresh_token,
        newRefreshTokenExpiresIn: 3600,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false
      };
    }
  }
});
export default refresh;