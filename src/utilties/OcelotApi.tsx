const setApiUrl = (controller:string,action:string)=>{
    return `http://localhost:5000/services/${controller}/${action}`;
}
export const Api = {

    get:(controller:string,action:string)=>{
        axios.get()
    }
}