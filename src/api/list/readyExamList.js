import configData from '../../config/config.json';

class ReadyExamList {
    constructor() {
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    }

    showList() {
        return fetch(`${configData.API_URL}/manage/list`, this.getRequestOptions)
                .then(response => response.json())
                .then(result => result);
    }
}

export default ReadyExamList;