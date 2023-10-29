export const clientConfig = (username:string,password:string)=> {
    return (
        {
            client_id:"WebClientForUser",
            client_secret:"secret",
            grant_type:"password",
            username:username,
            password:password
    }
    )
}