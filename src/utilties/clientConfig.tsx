export const getClientConfig = {
    clientConfigWithUsername : (username:string,password:string)=> {
        return (
            {
                client_id:"WebClientForUser",
                client_secret:"secret",
                grant_type:"password",
                username:username,
                password:password
        }
        )
},
clientConfigWithRefreshToken : (refreshToken:string)=>{
    return({
            client_id:"WebClientForUser",
            client_secret:"secret",
            grant_type:"refresh_token",
            refresh_token:refreshToken
            
    })
}
}