import BaseRequest from "./BaseRequest";

class userRes extends BaseRequest{
    constructor(){
        super('http://localhost:3000/user')
    }
}

export default userRes;