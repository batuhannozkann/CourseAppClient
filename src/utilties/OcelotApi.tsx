import axios from 'axios'
const setApiUrl = (catalog:string, controller:string, action?:string) => {
    const url = `http://localhost:5000/services/${catalog}/${controller}`;
    return action ? `${url}/${action}` : url;
}

export const Api = {

    get:async (catalog:string,controller:string,action?:string)=>{
        await axios.get(setApiUrl(catalog,controller,action))
        .then(()=>{})
        .catch(error=>{console.log(error)});
    },
    post:async (catalog:string,controller:string,action?:string)=>{
        await axios.post(setApiUrl(catalog,controller,action))
        .then(()=>{})
        .catch(error=>{console.log(error)});
    },
    delete:async (catalog:string,controller:string,action?:string)=>{
        await axios.delete(setApiUrl(catalog,controller,action))
        .then(()=>{})
        .catch(error=>{console.log(error)});
    },
    put:async (catalog:string,controller:string,action?:string)=>{
        await axios.put(setApiUrl(catalog,controller,action))
        .then(()=>{})
        .catch(error=>{console.log(error)});
    }
}
