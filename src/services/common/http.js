//GET
const get = async (url) => {
    try {
     const response = await fetch(url);
     const json = await response.json();
     return json.data;
   } catch (error) {
     return error;
   } finally {
    return false;
   }
 }
//POST
const post = async(url,body)=>{
    try{
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            /*   firstParam: 'yourValue',
                secondParam: 'yourOtherValue' */
                body
            })})
    }
    catch(error){
        return error;
    } finally{
        return false;
    }
}
//PUT
const put = async(url,params)=>{
    try{
        return fetch(url+params, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    catch(error){
        return error;
    } finally{
        return false;
    }
}
export default {
    get,post,put
}
