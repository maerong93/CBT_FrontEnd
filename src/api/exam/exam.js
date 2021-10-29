import configData from '../../config/config.json';

class Exam {
    constructor(myHeaders, formdata) {
        this.myHeaders = myHeaders;
        this.formdata = formdata;

        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        this.postRequestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
    }

    // 등록한 문제
    addedExamList(sei_id) {
        return fetch(`${configData.API_URL}/manage/itemlist?sid=${sei_id}`, this.getRequestOptions)
        .then(response => response.json())
        .then(result => result);
    }

    // 문제 등록
    addExam() {
        return fetch(`${configData.API_URL}/manage/up`, this.postRequestOptions)
        .then(response => response.text())
        .then(result => result);
    }

    // 문제 불러오기
    loadExam(selectExam) {
        return  fetch(`${configData.API_URL}/manage/itemget?id=${selectExam.id}`, this.getRequestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            return result;
        });
    }

    // up3
    modifyExamResult02() {
        return fetch(`${configData.API_URL}/manage/up3`, this.postRequestOptions)
            .then(response => response.text())
            .then(result => result);
    }

    // 이미지 삭제
    deleteFile(examID, imgIndex) {
        return fetch(`${configData.API_URL}/manage/picdelete?id=${examID}&pic=${imgIndex}`, this.getRequestOptions)
        .then(response => response.text())
        .then(result =>result);
    }

    // 문제 삭제
    deleteExam(selectExam) {
        return fetch(`${configData.API_URL}/manage/itemdelete?id=${selectExam.id}`, this.getRequestOptions)
        .then(response => response.json())
        .then(result => result);
    }

    //등록한 문제 삭제
    delExam(sei_id) {
        return fetch(`${configData.API_URL}/manage/itemdel?id=${sei_id}`, this.getRequestOptions)
        .then(response => response.json())
        .then(result => result);
    }
}

export default Exam;