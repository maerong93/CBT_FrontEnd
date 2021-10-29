import configData from '../../config/config.json';

class LoginService {
    constructor() {
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }
    
    checkLogin(id, pw) {
        return fetch(`${configData.API_URL}/manage/login?id=${id}&pwd=${pw}`, this.getRequestOptions)
                .then(response => response.json())
                .then(result => result);
    }
}

export default LoginService;