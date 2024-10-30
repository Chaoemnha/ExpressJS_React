import axios from 'axios';

class BaseRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl;
    }
    delete(url){
        return axios.delete(`${this.baseUrl}/${url}`);
    }
    get(url){
        return axios.get(`${this.baseUrl}/${url}`);
    }
    post(url,data){
        return axios.post(`${this.baseUrl}/${url}`,data);
    }
}
export default BaseRequest;