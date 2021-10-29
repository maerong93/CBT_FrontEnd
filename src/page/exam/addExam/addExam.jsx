import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import configData from '../../../config/config.json';
import Header from '../../../component/common/header/header';
import PageTitle from '../../../component/pageTitle/pageTitle';
import CardHeader from '../../../component/cardContainer/cardHeader';
import DocumentIcon from '../../../component/icon/documentIcon';
import AddFile from '../../../component/inputs/addFile/addFile';
import PlusIcon from '../../../component/icon/plusIcon';
import SheetRow from './sheetRow';
import DoubleArrowIcon from '../../../component/icon/doubleArrowIcon';
import Warning from '../../../component/modal/warning/warning';
import styles from './addExam.module.css';
import './addExam.css';
import AllExamRow from './allExamRow';
import QuestionIcon from '../../../component/icon/questionIcon';
import ViewIcon from '../../../component/icon/viewIcon';
import ViewModal from '../../../component/modal/view/viewModal';
import CheckIcon from '../../../component/icon/checkIcon';
import Exam from '../../../api/exam/exam';
import PenIcon from '../../../component/icon/penIcon';
import ExclamationIcon from '../../../component/icon/exclamationIcon';
import DOMPurify from 'dompurify';

const AddExam = React.memo(({onControlTab}) => {

    const location = useLocation();
    const {sei_id, examClass, examTitle, examDate} = location.state;

    /* ---------- 등록한 문제 보여주기 시작 ---------- */
    const [addedExamList, setAddedExamList] = useState([]);

    const myHeaders = new Headers();
    myHeaders.append("charset", "UTF-8");
    const formdata = new FormData();

    const exam = new Exam(myHeaders, formdata);

    const showExamList = () => {
        exam.addedExamList(sei_id)
        .then(result => {
            const sortArr = result.sort((a, b) => {
                return a.id - b.id;
            });
            //console.log(sortArr);
            setAddedExamList(sortArr)
        });
    };
    //console.log(addedExamList.length);

    useEffect(() => {
        showExamList();
    }, []);
    /* ---------- 등록한 문제 보여주기 끝 ---------- */


    /* ---------- state 시작 ---------- */
    const pageInfo = 'addExam'; // 문제 등록화면에서 쓰이는 변수 (warning 컴포넌트에서 체크)

    const [titles] = useState(['문제 등록', '문제 유형', '문제 내용', '문제 설명', '문제 이미지', '문제 동영상', '답가지', '배점']);
    
    // inputs 초기화
    const initialInputs = {
        examID: '',
        type: '',
        score: '',
        //title: '',
        subTitle: '',
        imgAlign: '0',
        imgFile01: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        imgFile02: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        imgFile03: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        imgFile04: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        imgFile05: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        videoFile01: {
            file: null,
            value: null,
            name: null,
            URL: null
        },
        videoURL: {
            file: null,
            value: null,
            name: null,
            URL: null
        }
    };

    // inputs 저장
    const [inputs, setInputs] = useState(initialInputs);
    const {examID, type, score, title, subTitle, imgAlign, imgFile01, imgFile02, imgFile03, imgFile04, imgFile05, videoURL} = inputs;

    const warningTexts = {
        type: { // 문제유형
            emptyType: `먼저 문제 유형을 선택한 후, 내용을 입력해주세요.`,
            changeType: `문제유형 변경시 기존에 입력했던 내용이 사라집니다. 변경하시겠습니까?`,
        },
        sheet: { // 문항
            minSheet: `더 이상 삭제할 수 없습니다. 최소 문항 개수는 2개입니다.`,
            maxSheet: `더 이상 추가할 수 없습니다. 최대 문항 개수는 15개입니다.`,
        },
        file: { // 파일
            noneFile: `선택한 파일이 없습니다. 먼저 파일을 선택하세요.`
        },
        submit: { // 등록시
            noneAnswer: `문항에 정답을 하나도 선택하지 않았습니다.\n정답을 선택해주세요..`,
            noneAnswer2: `문항에 정답을 하나도 선택하지 않았습니다.\n정답 개수는 최소 1개 이상이어야 합니다.`, // R타입
            success: `문제가 등록되었습니다.`,
            successModify: `문제가 수정되었습니다.`,
            fail: `문제가 등록되지 않았습니다.`,
            //exceptString: `문항 내용에 \'(작은 따옴표) 또는\n\"(큰따옴표)는 입력할 수 없습니다.`,
            exceedExam: `문제 등록개수를 초과했습니다.\n문제는 총 80개까지 등록 가능합니다.`,
            noTitleValue: `문제 내용에 입력한 내용이 없습니다.\n내용을 입력해주세요.`,
            noneSheetText: `답가지에 입력하지 않은 내용이 있습니다.\n내용을 입력해주세요.`
        },
        sideNave: { // 등록한 문제
            delete: `번 문제를 삭제하면 복구할 수 없습니다.\n삭제하시겠습니까?`,
            modify01: `다른 문제를 수정하면 현재 입력한 내용이 사라집니다.`,
            modify02: `번 문제를 수정하시겠습니까?`
        }
    };

    // 상황에 따라 보여주는 경고창 문구 컨트롤
    const [changeText, setChangeText] = useState(warningTexts.type.emptyType);  
    const [cancleBtn, setBtnActive] = useState(false); // 취소버튼
    
    // 문항
    const initialSheet = [
        {id: 'sheet1', text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: 1},
        {id: 'sheet2', text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: 2},
        {id: 'sheet3', text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: 3},
        {id: 'sheet4', text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: 4},
        {id: 'sheet5', text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: 5},
    ];
    
    const [sheet, setSheet] = useState(initialSheet);
     /* ---------- state 끝 ---------- */


    /* ---------- form 리셋 시작 ---------- */ 
     // form 리셋: file value 초기화
     const formRef = useRef();

     const resetForm = () => {
         formRef.current.reset();
         setInputs(initialInputs);
         setSheet(initialSheet);
     };
     /* ---------- form 리셋 끝 ---------- */ 

     /* ---------- 유형 시작 ---------- */
     const examTypeRef = useRef();
    // 문제유형 선택
    const selectedOption = (event) => {
        const value = event.target.value;
        changeOption(value);
    };

    const changeOption = (value) => {

        // 문항 정답 false 처리
        const sheetCopy = sheet.map(sheet => {
            return {...sheet, answer: false};
        });
        setSheet(sheetCopy);

        if(value === 'normal') {
            const sheetMax5 = sheetCopy.filter((sheet, index) => {
                if(index < 5) {
                    return sheet;
                }
            });
            //console.log(sheetIndex);
            setInputs(prevState => ({...prevState, type: 'normal'}));
            return setSheet(sheetMax5);
        }else if(value === 'r-sub') {
            return setInputs(prevState => ({...prevState, type: 'r-sub'}));
        }else {
            setInputs(prevState => ({...prevState, type: 'r-question'}));
            setSheet(sheetCopy);
        }
    };
     /* ---------- 문제 유형 끝 ---------- */

    /* ---------- 경고창 시작 ---------- */
    // 경고창 변수
    const [modalActive, setModalActive] = useState(false);
    
    // 문제 수정 선택시 (에디터 무한 렌더링 방지)
    const [currentModifyExam, setCurrentModifyExam] = useState(false);

    // 경고창 닫기
    const closeModal = (dataset) => {
        setModalActive(false);
        
        // 문제 유형 확인/취소 버튼
        if(changeText === warningTexts.type.changeType && dataset === 'ok') {
            return changeOption(examTypeRef.current.value);
        }else if(dataset === 'cancle') {
            return examTypeRef.current.value = type;
        }

        // 문제 삭제 확인 버튼
        const find = changeText.includes(warningTexts.sideNave.delete);
        if(find && dataset === 'ok') {
            return deleteExam();
        }

        // 문제 수정 확인 버튼
        const findModify = changeText.includes(warningTexts.sideNave.modify02);
        if(findModify && dataset === 'ok') {
            //console.log('문제 수정 확인 버튼');
            setCurrentModifyExam(true);
            return loadingExam();
        }
    }
    /* ---------- 경고창 끝 ---------- */

    // 문제 유형 미선택시
    const checkedSelectExamType = () => {
        resetForm();
        setModalActive(true);
        setBtnActive(false);
        setChangeText(warningTexts.type.emptyType);
    };

    // inputs 저장
    const changeInputs = (event) => {
        const {name, value} = event.target;

        if(type === '') {
            return checkedSelectExamType();
        }
        
        if(event.target.type === 'file') {
            if(value == '') {
                return setInputs(prevState => ({...prevState, [name]: {file: null, value: null, name: null, URL: null}}));
            }else {
                let reader = new FileReader();
                let file = event.target.files[0];
                let fileName;
                reader.onloadend = () => {
                    if (file.name !== undefined && file.name !== null) {
                        fileName = file.name.replace(/^.*[\\\/]/, '').replace(/(.jpg|.JPG|.png|.PNG|.jpge|.JPGE|.gif|.tif|.tiff|.bmp|.eps|.svg|.ico|.pjpeg|.pjp|.jfif|.xbm|.dib|.jxl|.svgz|.webp|.avif|.raw|.cr2|.nef|.orf|.sr2)$/,'');
                    }
                    setInputs(prevState => ({...prevState, [name]: {file: file, value: value, name: fileName, URL: reader.result}}));
                };
                return reader.readAsDataURL(file);
            }
        }

        setInputs(prevState => ({...prevState, [name]: value}));
    };

    /* ---------------첨부파일 시작 ---------- */
    // 이미지 정렬 check
    const changeImgAlign = (event) => {
        if(!currentModifyExam && type === '') {
            return checkedSelectExamType();
        }
        const value = event.currentTarget.dataset.name;
        setInputs(prevState => ({...prevState, imgAlign: value}));
    };

    // 동영상 첨부
    const [UploadTab, setUploadTab] = useState(true);
    const clickUploadTab = (event) => {
        if(event.target.dataset.index === '1') {
            return setUploadTab(true);
        }
        setUploadTab(false);
    };

    // 첨부파일 삭제
    const deleteFiles = async (event) => {
        //console.log(event);

        if(examID && examID !== '' && event.type === 'file') {
            let imgIndex;
            const name = event.name;
            name === 'imgFile01' && await (imgIndex = 1);
            name === 'imgFile02' && await (imgIndex = 2);
            name === 'imgFile03' && await (imgIndex = 3);
            name === 'imgFile04' && await (imgIndex = 4);
            name === 'imgFile05' && await (imgIndex = 5);

            exam.deleteFile(inputs.examID, imgIndex);
        }

        // videoURL 제외한 value 초기화
        if(event.type === 'file') {
            const name = event.name;
            //console.log(name);
            return setInputs(prevState => ({...prevState, [name]: {file: null, value: null, name: null, URL: null}}));
        }
        // videoURL value 삭제
        /*const videoURLContainer = event.currentTarget.closest('.videoURL-container');
        const name = videoURLContainer.childNodes[0].name;

        setInputs(prevState => ({...prevState, [name]: null}));*/
    }
    /* ---------- 첨부파일 끝 ---------- */


    /* ---------- 문항 시작 ---------- */
    // 문항 첨부파일 삭제
    const deleteSheetFiles = async (target, currentSheet) => {
        //console.log(target.name);

        if(examID && examID !== '') {
            let imgIndex;
            target.name === 'sheetImg1' && await (imgIndex = 6);
            target.name === 'sheetImg2' && await (imgIndex = 7);
            target.name === 'sheetImg3' && await (imgIndex = 8);
            target.name === 'sheetImg4' && await (imgIndex = 9);
            target.name === 'sheetImg5' && await (imgIndex = 10);

            exam.deleteFile(inputs.examID, imgIndex);
        }

        const sheetCopy = sheet.map(sheet => {
            if(sheet.id === currentSheet.id) {
                return {...sheet, img: {file: null, value: null, name: null, URL: null}};
            }
            return sheet;
        });
        setSheet(sheetCopy);
    };

    const addSheet = () => {
        if(sheet.length >= 15) {
            setBtnActive(false);
            setChangeText(warningTexts.sheet.maxSheet);
            return setModalActive(true);
        }
        setSheet([...sheet, {id: Date.now(), text: '', img: {file: null, value: null, name: null, URL: null}, answer: false, value: sheet.length + 1}]);
    };

    /* 문항 에디터 수정 */
    const changeSheetText = (currentSheet, sheetTextRef) => {
        if(sheetTextRef.current) {
            const sheetCopy = sheet.map(sheet => {
                if(sheet.id === currentSheet.id) {
                    return {...sheet, text: sheetTextRef.current.getContent()};
                }
                return sheet;
            });
            return setSheet(sheetCopy);
        }
    };

    // 문항 value 저장 (첨부파일 제외)
    const changeSheet = (event, currentSheet, sheetTextRef) => {
        const {name, value, checked, type} = event.target;
        //console.log(checked);

        if(name === 'answer') {

            if(type === 'radio') {
                const sheetCopy = sheet.map(sheet => {
                    if(sheet.id === currentSheet.id) {
                        return {...sheet, answer: true};
                    }
                    return {...sheet, answer: false};
                });
                return setSheet(sheetCopy);
            }else {
                const sheetCopy = sheet.map(sheet => {
                    if(sheet.id === currentSheet.id) {
                        return {...sheet, answer: checked};
                    }
                    return sheet;
                });
                return setSheet(sheetCopy);
            }
        }

        if(type === 'file') {
            let reader = new FileReader();
            let file = event.target.files[0];
            //console.log(file);
            let fileName;
            reader.onloadend = () => {
                if (file.name !== undefined && file.name !== null) {
                    fileName = file.name.replace(/^.*[\\\/]/, '').replace(/(.jpg|.JPG|.png|.PNG|.jpge|.JPGE|.gif|.tif|.tiff|.bmp|.eps|.svg|.ico|.pjpeg|.pjp|.jfif|.xbm|.dib|.jxl|.svgz|.webp|.avif|.raw|.cr2|.nef|.orf|.sr2)$/,'');
                }
                const sheetCopy = sheet.map(sheet => {
                    if(sheet.id === currentSheet.id) {
                        return {...sheet, img: {file: file, value: value, name: fileName, URL: reader.result}};
                    }
                    return sheet;
                });
                setSheet(sheetCopy);
                //setSheet(prevState => ({...prevState, [name]: {file: file, value: value, URL: reader.result}}));
            };
            return reader.readAsDataURL(file);
        }

        if(sheetTextRef.current) {
            const sheetCopy = sheet.map(sheet => {
                if(sheet.id === currentSheet.id) {
                    return {...sheet, text: sheetTextRef.current.getContent()};
                }
                return sheet;
            });
            return setSheet(sheetCopy);
        }

        const sheetCopy = sheet.map(sheet => {
            if(sheet.id === currentSheet.id) {
                return {...sheet, [name]: value};
            }
            return sheet;
        });
        setSheet(sheetCopy);
    };

    // 문항 삭제
    const deleteRow = (currentSheet) => {
        if(sheet.length < 3) {
            setBtnActive(false);
            setChangeText(warningTexts.sheet.minSheet);
            return setModalActive(true);
        }
        const _sheetCopy = sheet.filter(sheet => sheet.id !== currentSheet.id);
        const sheetCopy = _sheetCopy.map((sheet, index) => {
            return {...sheet, value: index + 1};
        });
        return setSheet(sheetCopy);
    };
    /* ----- 문항 끝 ----- */


    // 미리보기
    const [modalClass, setModalClass] = useState(false); // modal class
    const [viewTitle, setViewTitle] = useState(null);

    const hideModal = () => {
        setModalClass(false);
    };

    // 선택한 문제 저장
    const [selectExam, setSelectExam] = useState();

    // sideNav > 문제 삭제 경고창
    const confirmDeleteExam = (index, item) => {
        setBtnActive(true);
        setChangeText(`${index}${warningTexts.sideNave.delete}`);
        setModalActive(true);
        setSelectExam(item); // 선택한 문제 변수에 저장
    };
    // sideNav에 있는 문제 수정
    const modifyExam =  (index, item) => {        
        setSelectExam(item);

        // 입력한 내용이 있다면
        const inputsKey = Object.values(inputs).filter(value => {
            return value !== null;
        });

        (type !== '' && inputsKey.length > 1) && setChangeText(`${warningTexts.sideNave.modify01}\n${index}${warningTexts.sideNave.modify02}`);
        (type === '') && setChangeText(`${index}${warningTexts.sideNave.modify02}`);
        
        setModalActive(true);
        setBtnActive(true);
    };

    /* ---------- 문제내용 시작 ---------- */
    const titleEditorRef = useRef(null);

    const [titleHTML, setTitleHTML] = useState();

    const changeTitle = () => {
        if(!currentModifyExam && type === '') {
            return checkedSelectExamType();
        }
        
        titleEditorRef.current && setTitleHTML(titleEditorRef.current.getContent());
    };

    const titleResult = DOMPurify.sanitize(titleHTML, {USE_PROFILES: {html: true}});
    
    /* ---------- 문제내용 끝 ---------- */

    /* ---------- 문제설명 시작 ---------- */
    const subTitleEditorRef = useRef(null);

    const [subTitleHTML, setSubTitleHTML] = useState();

    const changeSubTitle = () => {
        if(!currentModifyExam && type === '') {
            return checkedSelectExamType();
        }
        subTitleEditorRef.current && setSubTitleHTML(subTitleEditorRef.current.getContent());
    };

    const subTitleResult = DOMPurify.sanitize(subTitleHTML, {USE_PROFILES: {html: true}});
    
    /* ---------- 문제설명 끝 ---------- */

    // 문제 불러오기
    const loadingExam = () => {
        exam.loadExam(selectExam)
        .then(result => {
            //console.log(result);
            setTitleHTML(result[0].sti_name);
            setSubTitleHTML(result[0].sti_content);
            setInputs({
                examID: result[0].id,
                type: result[0].R_type !== 'Y' ? 'normal' : 'r-question',
                score: result[0].sti_score,
                imgAlign: result[0].img_ori,
                imgFile01: {
                    file: null,
                    value: (result[0].sti_file1 != null && result[0].sti_file1 != ' ') ? result[0].sti_file1 : null,
                    name: (result[0].sti_file1 != null && result[0].sti_file1 != ' ') ? result[0].sti_file1 : null,
                    URL: (result[0].bf_file != null && result[0].bf_file != 'null' && result[0].bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file}` : null
                },
                imgFile02: {
                    file: null,
                    value: (result[0].sti_file2 != null && result[0].sti_file2 != ' ') ? result[0].sti_file2 : null,
                    name: (result[0].sti_file2 != null && result[0].sti_file2 != ' ') ? result[0].sti_file2 : null,
                    URL: (result[0].bf_file2 != null && result[0].bf_file2 != 'null' && result[0].bf_file2) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file2}` : null
                },
                imgFile03: {
                    file: null,
                    value: (result[0].sti_file3 != null && result[0].sti_file3 != ' ') ? result[0].sti_file3 : null,
                    name: (result[0].sti_file3 != null && result[0].sti_file3 != ' ') ? result[0].sti_file3 : null,
                    URL: (result[0].bf_file3 != null && result[0].bf_file3 != 'null' && result[0].bf_file3) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file3}` : null
                },
                imgFile04: {
                    file: null,
                    value: (result[0].sti_file4 != null && result[0].sti_file4 != ' ') ? result[0].sti_file4 : null,
                    name: (result[0].sti_file4 != null && result[0].sti_file4 != ' ') ? result[0].sti_file4 : null,
                    URL: (result[0].bf_file4 != null && result[0].bf_file4 != 'null' && result[0].bf_file4) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file4}` : null
                },
                imgFile05: {
                    file: null,
                    value: (result[0].sti_file5 != null && result[0].sti_file5 != ' ') ? result[0].sti_file5 : null,
                    name: (result[0].sti_file5 != null && result[0].sti_file5 != ' ') ? result[0].sti_file5 : null,
                    URL: (result[0].bf_file5 != null && result[0].bf_file5 != 'null' && result[0].bf_file5) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file5}` : null
                },
                videoFile01: {
                    file: null,
                    value: null,
                    name: null,
                    URL: null
                },
                videoURL: {
                    file: null,
                    value: null,
                    name: null,
                    URL: null
                }
            });

            let _answer;

            if(result[0].R_type === 'Y') {
                _answer = Array.from(result[0].sti_answer.split('|'));
            }else {
                _answer = result[0].sti_answer;
            }

            const sheet = [
                {id: 'sheet1', text: result[0].sti_1, img: {file: null, value: null, name: null, URL: (result[0].sti1_bf_file != null && result[0].sti1_bf_file != 'null' && result[0].sti1_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti1_bf_file}` : null}, answer: false, value: 1},
                {id: 'sheet2', text: result[0].sti_2, img: {file: null, value: null, name: null, URL: (result[0].sti2_bf_file != null && result[0].sti2_bf_file != 'null' && result[0].sti2_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti2_bf_file}` : null}, answer: false, value: 2},
                {id: 'sheet3', text: result[0].sti_3, img: {file: null, value: null, name: null, URL: (result[0].sti3_bf_file != null && result[0].sti3_bf_file != 'null' && result[0].sti3_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti3_bf_file}` : null}, answer: false, value: 3},
                {id: 'sheet4', text: result[0].sti_4, img: {file: null, value: null, name: null, URL: (result[0].sti4_bf_file != null && result[0].sti4_bf_file != 'null' && result[0].sti4_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti4_bf_file}` : null}, answer: false, value: 4},
                {id: 'sheet5', text: result[0].sti_5, img: {file: null, value: null, name: null, URL: (result[0].sti5_bf_file != null && result[0].sti5_bf_file != 'null' && result[0].sti5_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti5_bf_file}` : null}, answer: false, value: 5},
                {id: 'sheet6', text: result[0].sti_6, img: {file: null, value: null, name: null, URL: (result[0].sti6_bf_file != null && result[0].sti6_bf_file != 'null' && result[0].sti6_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti6_bf_file}` : null}, answer: false, value: 6},
                {id: 'sheet7', text: result[0].sti_7, img: {file: null, value: null, name: null, URL: (result[0].sti7_bf_file != null && result[0].sti7_bf_file != 'null' && result[0].sti7_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti7_bf_file}` : null}, answer: false, value: 7},
                {id: 'sheet8', text: result[0].sti_8, img: {file: null, value: null, name: null, URL: (result[0].sti8_bf_file != null && result[0].sti8_bf_file != 'null' && result[0].sti8_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti8_bf_file}` : null}, answer: false, value: 8},
                {id: 'sheet9', text: result[0].sti_9, img: {file: null, value: null, name: null, URL: (result[0].sti9_bf_file != null && result[0].sti9_bf_file != 'null' && result[0].sti9_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti9_bf_file}` : null}, answer: false, value: 9},
                {id: 'sheet10', text: result[0].sti_10, img: {file: null, value: null, name: null, URL: (result[0].sti10_bf_file != null && result[0].sti10_bf_file != 'null' && result[0].sti10_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti10_bf_file}` : null}, answer: false, value: 10},
                {id: 'sheet11', text: result[0].sti_11, img: {file: null, value: null, name: null, URL: (result[0].sti11_bf_file != null && result[0].sti11_bf_file != 'null' && result[0].sti11_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti11_bf_file}` : null}, answer: false, value: 11},
                {id: 'sheet12', text: result[0].sti_12, img: {file: null, value: null, name: null, URL: (result[0].sti12_bf_file != null && result[0].sti12_bf_file != 'null' && result[0].sti12_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti12_bf_file}` : null}, answer: false, value: 12},
                {id: 'sheet13', text: result[0].sti_13, img: {file: null, value: null, name: null, URL: (result[0].sti13_bf_file != null && result[0].sti13_bf_file != 'null' && result[0].sti13_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti13_bf_file}` : null}, answer: false, value: 13},
                {id: 'sheet14', text: result[0].sti_14, img: {file: null, value: null, name: null, URL: (result[0].sti14_bf_file != null && result[0].sti14_bf_file != 'null' && result[0].sti14_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti14_bf_file}` : null}, answer: false, value: 14},
                {id: 'sheet15', text: result[0].sti_15, img: {file: null, value: null, name: null, URL: (result[0].sti15_bf_file != null && result[0].sti15_bf_file != 'null' && result[0].sti15_bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti15_bf_file}` : null}, answer: false, value: 15},
            ];

            const sheetCopy = sheet.filter(sheet => sheet.text);

            const _sheetCopy = sheetCopy.map(sheet => {
                if(_answer.includes(String(sheet.value))) {
                    return {...sheet, answer: true};
                }
                return sheet;
            });
            setSheet(_sheetCopy);
        });
    }
            
    //console.log(`examID: ${examID}`);

    // sideNav에 있는 문제 삭제
    const deleteExam = () => {
        exam.deleteExam(selectExam)
        .then(showExamList());

        //console.log(selectExam);
    };

    const submitForm = (event) => {
        event.preventDefault();

        // 정답 선택개수 체크
        const checked = sheet.filter(sheet => sheet.answer === true);
        //console.log(`checked: ${checked} / length: ${checked.length}`);
        if(checked.length === 0) {
            setModalActive(true);
            setBtnActive(false);
            //console.log(checked.length);
            return setChangeText(warningTexts.submit.noneAnswer);
        }

        // 문항에 내용 체크
        const sheetTextValue = sheet.filter(sheet => !sheet.text);
        if(sheetTextValue.length > 0) {
            setModalActive(true);
            setBtnActive(false);
            return setChangeText(warningTexts.submit.noneSheetText);
        }

        // 문항에 특수문자 체크
        /*const sheetValue = Object.values(sheet);
        const sheetText = sheetValue.filter(value => value.text.includes('"') || value.text.includes("'"));
        console.log(sheetValue);
        console.log(sheetText);

        if(sheetText.length > 0) {
            setModalActive(true);
            setBtnActive(false);
            return setChangeText(warningTexts.submit.exceptString);
        }*/

        // 80문제 초과시
        if(addedExamList.length >= 80 && examID === '') {
            setModalActive(true);
            setBtnActive(false);
            setChangeText(warningTexts.submit.exceedExam);
            return resetForm();
        }

        if(!titleHTML) {
            setModalActive(true);
            setBtnActive(false);
            return setChangeText(warningTexts.submit.noTitleValue);
        }

        // 수정된 문제
        if(examID !== '') {
            modifyResult(checked);
            setCurrentModifyExam(false);
        }else {
            addResult(checked);
        }
    };

    // 문제 수정
    const modifyResult = (checked) => {
        // 정답개수
        let answer;
        let R_count;
        if(type === 'normal') {
            const value = checked.map(sheet => {
                return sheet.value;
            });
            answer = value[0];
            //console.log(answer);
        }else {
            const value = checked.map(sheet => {
                return sheet.value;
            });
            const ranswer = value.join('|');
            answer = ranswer;
            R_count = value.length;
        }

        // 전송
        //formdata.append("sei_id", sei_id);
        formdata.append("id", examID);
        formdata.append("R_type", type === 'normal' ? '' : 'Y');
        formdata.append("sti_score", score);
        formdata.append("sti_name", titleResult);
        formdata.append("sti_content", subTitleResult);

        //formdata.append("sti_po", '');
        
        formdata.append("img_ori", imgAlign);
        
        // 문제 첨부파일 경로
        imgFile01.file && formdata.append("pic1", imgFile01.file, imgFile01.value);
        imgFile02.file && formdata.append("pic2", imgFile02.file, imgFile02.value);
        imgFile03.file && formdata.append("pic3", imgFile03.file, imgFile03.value);
        imgFile04.file && formdata.append("pic4", imgFile04.file, imgFile04.value);
        imgFile05.file && formdata.append("pic5", imgFile05.file, imgFile05.value);

        // 문제 첨부파일명
        imgFile01.file && formdata.append("sti_file1", imgFile01.name);
        imgFile02.file && formdata.append("sti_file2", imgFile02.name);
        imgFile03.file && formdata.append("sti_file3", imgFile03.name);
        imgFile04.file && formdata.append("sti_file4", imgFile04.name);
        imgFile05.file && formdata.append("sti_file5", imgFile05.name);

        sheet[0] ? formdata.append("sti_1", sheet[0].text) : formdata.append("sti_1", '');
        sheet[1] ? formdata.append("sti_2", sheet[1].text) : formdata.append("sti_2", '');
        sheet[2] ? formdata.append("sti_3", sheet[2].text) : formdata.append("sti_3", '');
        sheet[3] ? formdata.append("sti_4", sheet[3].text) : formdata.append("sti_4", '');
        sheet[4] ? formdata.append("sti_5", sheet[4].text) : formdata.append("sti_5", '');
        sheet[5] ? formdata.append("sti_6", sheet[5].text) : formdata.append("sti_6", '');
        sheet[6] ? formdata.append("sti_7", sheet[6].text) : formdata.append("sti_7", '');
        sheet[7] ? formdata.append("sti_8", sheet[7].text) : formdata.append("sti_8", '');
        sheet[8] ? formdata.append("sti_9", sheet[8].text) : formdata.append("sti_9", '');
        sheet[9] ? formdata.append("sti_10", sheet[9].text) : formdata.append("sti_10",'');
        sheet[10] ? formdata.append("sti_11", sheet[10].text) : formdata.append("sti_11", '');
        sheet[11] ? formdata.append("sti_12", sheet[11].text) : formdata.append("sti_12", '');
        sheet[12] ? formdata.append("sti_13", sheet[12].text) : formdata.append("sti_13", '');
        sheet[13] ? formdata.append("sti_14", sheet[13].text) : formdata.append("sti_14", '');
        sheet[14] ? formdata.append("sti_15", sheet[14].text) : formdata.append("sti_15", '');
        
        sheet[0].img.value && formdata.append("subpic1", sheet[0].img.file, sheet[0].img.value); // 문항 첨부파일
        sheet[1].img.value && formdata.append("subpic2", sheet[1].img.file, sheet[1].img.value);
        sheet[2].img.value && formdata.append("subpic3", sheet[2].img.file, sheet[2].img.value);
        sheet[3].img.value && formdata.append("subpic4", sheet[3].img.file, sheet[3].img.value);
        sheet[4].img.value && formdata.append("subpic5", sheet[4].img.file, sheet[4].img.value);

        //sheet[0].img.value && formdata.append("sti1_file", sheet[0].img.value); // 문항 첨부파일
        //sheet[1].img.value && formdata.append("sti2_file", sheet[1].img.value);
        //sheet[2].img.value && formdata.append("sti3_file", sheet[2].img.value);
        //sheet[3].img.value && formdata.append("sti4_file", sheet[3].img.value);
        //sheet[4].img.value && formdata.append("sti5_file", sheet[4].img.value);

        formdata.append("R_count", type === 'normal' ? 0 : R_count);
        formdata.append("sti_answer", answer);
        
        exam.modifyExamResult02()
        .then(result => {
            if(result === '1') {
                setChangeText(warningTexts.submit.successModify);
                showExamList();
                resetForm();
                //console.log('문제 수정 성공')
            }else if(result === '0') {
                setChangeText(warningTexts.submit.fail);
                //console.log('문제 수정 실패')
            }
            setBtnActive(false);
            setModalActive(true);
        });
        return;
    };

    // 데이터 전송
    const addResult = (checked) => {        
        //console.clear();

        // 정답개수
        let answer;
        let R_count;
        if(type === 'normal') {
            const value = checked.map(sheet => {
                return sheet.value;
            });
            answer = value[0];
            //console.log(answer);
        }else {
            const value = checked.map(sheet => {
                //console.log(sheet.value);
                return sheet.value;
            });
            const ranswer = value.join('|');
            answer = ranswer;
            R_count = value.length;
           // console.log(`answer: ${answer} / answer.length: ${answer.length} / R_count: ${R_count}`);
        }

        // 전송
        formdata.append("sei_id", sei_id);
        formdata.append("R_type", type === 'normal' ? '' : 'Y');
        formdata.append("sti_score", score);
        formdata.append("sti_name", titleResult);
        formdata.append("sti_content", subTitleResult);

        formdata.append("sti_po", ''); // 구분자
        
        formdata.append("img_ori", imgAlign);
        imgFile01.file && formdata.append("pic1", imgFile01.file, imgFile01.value); // 문제 첨부파일 경로
        imgFile02.file && formdata.append("pic2", imgFile02.file, imgFile02.value);
        imgFile03.file && formdata.append("pic3", imgFile03.file, imgFile03.value);
        imgFile04.file && formdata.append("pic4", imgFile04.file, imgFile04.value);
        imgFile05.file && formdata.append("pic5", imgFile05.file, imgFile05.value);

        imgFile01.file && formdata.append("sti_file1", imgFile01.name); // 문제 첨부파일명
        imgFile02.file && formdata.append("sti_file2", imgFile02.name);
        imgFile03.file && formdata.append("sti_file3", imgFile03.name);
        imgFile04.file && formdata.append("sti_file4", imgFile04.name);
        imgFile05.file && formdata.append("sti_file5", imgFile05.name);

        //sheet[0] && console.log(sheet[0].text);
        sheet[0] ? formdata.append("sti_1", sheet[0].text) : formdata.append("sti_1", '');
        sheet[1] ? formdata.append("sti_2", sheet[1].text) : formdata.append("sti_2", '');
        sheet[2] ? formdata.append("sti_3", sheet[2].text) : formdata.append("sti_3", '');
        sheet[3] ? formdata.append("sti_4", sheet[3].text) : formdata.append("sti_4", '');
        sheet[4] ? formdata.append("sti_5", sheet[4].text) : formdata.append("sti_5", '');
        sheet[5] ? formdata.append("sti_6", sheet[5].text) : formdata.append("sti_6", '');
        sheet[6] ? formdata.append("sti_7", sheet[6].text) : formdata.append("sti_7", '');
        sheet[7] ? formdata.append("sti_8", sheet[7].text) : formdata.append("sti_8", '');
        sheet[8] ? formdata.append("sti_9", sheet[8].text) : formdata.append("sti_9", '');
        sheet[9] ? formdata.append("sti_10", sheet[9].text) : formdata.append("sti_10",'');
        sheet[10] ? formdata.append("sti_11", sheet[10].text) : formdata.append("sti_11", '');
        sheet[11] ? formdata.append("sti_12", sheet[11].text) : formdata.append("sti_12", '');
        sheet[12] ? formdata.append("sti_13", sheet[12].text) : formdata.append("sti_13", '');
        sheet[13] ? formdata.append("sti_14", sheet[13].text) : formdata.append("sti_14", '');
        sheet[14] ? formdata.append("sti_15", sheet[14].text) : formdata.append("sti_15", '');

        (type === 'normal' && sheet[0].img.value) && formdata.append("subpic1", sheet[0].img.file, sheet[0].img.value); // 문항 첨부파일
        (type === 'normal' && sheet[1].img.value) && formdata.append("subpic2", sheet[1].img.file, sheet[1].img.value);
        (type === 'normal' && sheet[2].img.value) && formdata.append("subpic3", sheet[2].img.file, sheet[2].img.value);
        (type === 'normal' && sheet[3].img.value) && formdata.append("subpic4", sheet[3].img.file, sheet[3].img.value);
        (type === 'normal' && sheet[4].img.value) && formdata.append("subpic5", sheet[4].img.file, sheet[4].img.value);

        (type === 'normal' && sheet[0].img.value) && formdata.append("sti1_file", sheet[0].img.value); // 문항 첨부파일
        (type === 'normal' && sheet[1].img.value) && formdata.append("sti2_file", sheet[1].img.value);
        (type === 'normal' && sheet[2].img.value) && formdata.append("sti3_file", sheet[2].img.value);
        (type === 'normal' && sheet[3].img.value) && formdata.append("sti4_file", sheet[3].img.value);
        (type === 'normal' && sheet[4].img.value) && formdata.append("sti5_file", sheet[4].img.value);

        formdata.append("R_count", type === 'normal' ? 0 : R_count);
        formdata.append("sti_answer", answer); 

        exam.addExam()
        .then(result => {
            //console.log(result);
            if(result === '1') {
                setChangeText(warningTexts.submit.success);
                showExamList();
                resetForm();
                //console.log('새 문제 업로드 성공')
            }else if(result === '0') {
                setChangeText(warningTexts.submit.fail);
                //console.log('새 문제 업로드 실패')
            }
            setBtnActive(false);
            setModalActive(true);
        });
    }

    // 문제 미리보기
    const viewExam = (number, index) => {
        if(number === 2) { // sideNav 문제 미리보기
            setModal(2);
        }else { // 현재 문제 미리보기
            setModal(1);
        }

        let text;

        if(!index && addedExamList.length < 80) {
            text = `${addedExamList.length + 1}번 문제 미리보기`;
        }else if(!index && addedExamList.length >= 80) {
            text = `문제 미리보기`;
        }else if(index) {
            text = `${index}번 문제 미리보기`;
        }

        setViewTitle(text);
        setModalClass(true);
    };

    // inputs 초기화
    const initialViewSimpleExam = {
        //title: '',
        type: '',
        score: '',
        //subTitle: '',
        imgAlign: '0',
        imgFile01: {
            name: null,
            URL: null
        },
        imgFile02: {
            name: null,
            URL: null
        },
        imgFile03: {
            name: null,
            URL: null
        },
        imgFile04: {
            name: null,
            URL: null
        },
        imgFile05: {
            name: null,
            URL: null
        },
        videoFile01: {
            name: null,
            URL: null
        },
        videoURL: {
            name: null,
            URL: null
        }
    };

    const initialViewSimpleSheet = [
        {id: 'sheet1', text: '', img: {URL: null}},
        {id: 'sheet2', text: '', img: {URL: null}},
        {id: 'sheet3', text: '', img: {URL: null}},
        {id: 'sheet4', text: '', img: {URL: null}},
        {id: 'sheet5', text: '', img: {URL: null}},
    ];

    const [viewSimpleExamInfo, setViewSimpleExamInfo] = useState(initialViewSimpleExam);

    const [viewSimpleTitleHTML, setViewSimpleTitleHTML] = useState();
    const viewSimpleTitleResult = DOMPurify.sanitize(viewSimpleTitleHTML, {USE_PROFILES: {html: true}});

    const [viewSimpleSubTitleHTML, setViewSimpleSubTitleHTML] = useState();
    const viewSimpleSubTitleResult = DOMPurify.sanitize(viewSimpleSubTitleHTML, {USE_PROFILES: {html: true}});

    const [viewSimpleSheetInfo, setViewSimpleSheetInfo] = useState(initialViewSimpleSheet);

    // 변수에 따른 미리보기 컴포넌트 보여주기
    const [modal, setModal] = useState(1);

    // 다음, 이전 문제 보여주기
    const prevAndNextExam = (str) => {
        const find = addedExamList.indexOf(selectExam); // 현재 문제 index

        let index;
        let item;
        if(str === 'prev') {
            if(find === 0) {
                return;
            }
            index = find;
            item = addedExamList[find - 1];
        }else {
            if(find + 1 >= addedExamList.length) {
                return;
            }
            index = find + 2;
            item = addedExamList[find + 1];
        }

        viewSideExam(item, index);

        //console.log(`current index: ${find} / next index: ${index}`);
        //console.log(item);
    };

    // sideNav 문제 미리보기
    const viewSideExam = (item, index) => {
        const selectExam = item;
        setSelectExam(item);

        exam.loadExam(selectExam)
        .then(result => {
            //console.log(result);
            setViewSimpleTitleHTML(result[0].sti_name);
            setViewSimpleSubTitleHTML(result[0].sti_content);
            setViewSimpleExamInfo({
                //title: result[0].sti_name,
                type: result[0].R_type !== 'Y' ? 'normal' : 'r-question',
                score: result[0].sti_score,
                //subTitle: result[0].sti_content,
                imgAlign: result[0].img_ori,
                imgFile01: {
                    name: (result[0].sti_file1 != null && result[0].sti_file1 != 'null' && result[0].sti_file1 != ' ') ? result[0].sti_file1 : null,
                    URL: (result[0].bf_file != null && result[0].bf_file != 'null' && result[0].bf_file) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file}` : null,
                },
                imgFile02: {
                    name: (result[0].sti_file2 != null && result[0].sti_file2 != 'null' && result[0].sti_file2 != ' ') ? result[0].sti_file2 : null,
                    URL: (result[0].bf_file2 != null && result[0].bf_file2 != 'null' && result[0].bf_file2) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file2}` : null,
                },
                imgFile03: {
                    name: (result[0].sti_file3 != null && result[0].sti_file3 != 'null' && result[0].sti_file3 != ' ') ? result[0].sti_file3 : null,
                    URL: (result[0].bf_file3 != null && result[0].bf_file3 != 'null' && result[0].bf_file3) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file3}` : null,
                },
                imgFile04: {
                    name: (result[0].sti_file4 != null && result[0].sti_file4 != 'null' && result[0].sti_file4 != ' ') ? result[0].sti_file4 : null,
                    URL: (result[0].bf_file4 != null && result[0].bf_file4 != 'null' && result[0].bf_file4) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file4}` : null,
                },
                imgFile05: {
                    name: (result[0].sti_file5 != null && result[0].sti_file5 != 'null' && result[0].sti_file5 != ' ') ? result[0].sti_file5 : null,
                    URL: (result[0].bf_file5 != null && result[0].bf_file5 != 'null' && result[0].bf_file5) ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file5}` : null,
                },
                videoFile01: {
                    name: null,
                    URL: null
                },
                videoURL: {
                    name: null,
                    URL: null
                }
            });

            const sheet = [
                {id: 'sheet1', text: result[0].sti_1, img: {URL: (result[0].sti1_bf_file != null && result[0].sti1_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti1_bf_file}` : null}, answer: false, value: 1},
                {id: 'sheet2', text: result[0].sti_2, img: {URL: (result[0].sti2_bf_file != null && result[0].sti2_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti2_bf_file}` : null}, answer: false, value: 2},
                {id: 'sheet3', text: result[0].sti_3, img: {URL: (result[0].sti3_bf_file != null && result[0].sti3_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti3_bf_file}` : null}, answer: false, value: 3},
                {id: 'sheet4', text: result[0].sti_4, img: {URL: (result[0].sti4_bf_file != null && result[0].sti4_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti4_bf_file}` : null}, answer: false, value: 4},
                {id: 'sheet5', text: result[0].sti_5, img: {URL: (result[0].sti5_bf_file != null && result[0].sti5_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti5_bf_file}` : null}, answer: false, value: 5},
                {id: 'sheet6', text: result[0].sti_6, img: {URL: (result[0].sti6_bf_file != null && result[0].sti6_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti6_bf_file}` : null}, answer: false, value: 6},
                {id: 'sheet7', text: result[0].sti_7, img: {URL: (result[0].sti7_bf_file != null && result[0].sti7_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti7_bf_file}` : null}, answer: false, value: 7},
                {id: 'sheet8', text: result[0].sti_8, img: {URL: (result[0].sti8_bf_file != null && result[0].sti8_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti8_bf_file}` : null}, answer: false, value: 8},
                {id: 'sheet9', text: result[0].sti_9, img: {URL: (result[0].sti9_bf_file != null && result[0].sti9_bf_file !=' null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti9_bf_file}` : null}, answer: false, value: 9},
                {id: 'sheet10', text: result[0].sti_10, img: {URL: (result[0].sti10_bf_file != null && result[0].sti10_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti10_bf_file}` : null}, answer: false, value: 10},
                {id: 'sheet11', text: result[0].sti_11, img: {URL: (result[0].sti11_bf_file != null && result[0].sti11_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti11_bf_file}` : null}, answer: false, value: 11},
                {id: 'sheet12', text: result[0].sti_12, img: {URL: (result[0].sti12_bf_file != null && result[0].sti12_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti12_bf_file}` : null}, answer: false, value: 12},
                {id: 'sheet13', text: result[0].sti_13, img: {URL: (result[0].sti13_bf_file != null && result[0].sti13_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti13_bf_file}` : null}, answer: false, value: 13},
                {id: 'sheet14', text: result[0].sti_14, img: {URL: (result[0].sti14_bf_file != null && result[0].sti14_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti14_bf_file}` : null}, answer: false, value: 14},
                {id: 'sheet15', text: result[0].sti_15, img: {URL: (result[0].sti15_bf_file != null && result[0].sti15_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti15_bf_file}` : null}, answer: false, value: 15},
            ];

            const sheetCopy = sheet.filter(sheet => sheet.text);
            
            let _answer;

            if(result[0].R_type === 'Y') {
                _answer = Array.from(result[0].sti_answer.split('|'));
            }else {
                _answer = result[0].sti_answer;
            }

            const _sheetCopy = sheetCopy.map(sheet => {
                if(_answer.includes(String(sheet.value))) {
                    return {...sheet, answer: true};
                }
                return sheet;
            });

            setViewSimpleSheetInfo(_sheetCopy);

            viewExam(2, index);
        });
    };


    /* ---------- ui 시작 ---------- */
    //sideNav tab 버튼
    const sideToggle = (event) => {
        if(event.target.closest('.side-tab-btn')) {
            event.currentTarget.classList.toggle(`${styles.hideNav}`);
            const mainContainer = event.currentTarget.closest('article').previousElementSibling;
            mainContainer.classList.toggle(`${styles.addExamWrapFull}`);
        }
    };
    /* ---------- ui 끝 ---------- */

    /*useEffect(() => {
        console.log(inputs);
    }, [inputs]);

    useEffect(() => {
        console.log(sheet);
    }, [sheet]);

    useEffect(() => {
        console.log(viewSimpleExamInfo);
        console.log(viewSimpleSheetInfo);
    }, [viewSimpleExamInfo, viewSimpleSheetInfo]);*/

    return(
        <>
            <Header />
            <Warning
            pageInfo={pageInfo}
            cancleBtn={cancleBtn}
            modalActive={modalActive}
            onCloseModal={closeModal}
            text={changeText}
            cancleBtn={cancleBtn}
            />

            <ViewModal
            modalClass={modalClass}
            hideModal={hideModal}
            modalTitle={viewTitle}
            modal={modal}
            inputs={modal === 1 ? inputs : viewSimpleExamInfo}
            sheet={modal === 1 ? sheet : viewSimpleSheetInfo}
            onPrevAndNextExam={prevAndNextExam}
            titleResult={modal === 1 ? titleResult : viewSimpleTitleResult}
            subTitleResult={modal === 1 ? subTitleResult : viewSimpleSubTitleResult}
            />
            
            <section className={`${styles.addExamWrap} container-wrap scroll-wrapper`}>
                <div className={styles.mainContents}>
                    <PageTitle pageInfo={pageInfo} title={titles[0]} iconName={'write'} onResetForm={resetForm} allExamNum={addedExamList.length} examID={inputs.examID} />
                    <ul className={styles.examInfo}>
                        <li>교시 : {examClass}</li>
                        <li>시험명 : {examTitle}</li>
                        <li>시험일 : {examDate}</li>
                    </ul>
                    <form ref={formRef} onReset={resetForm} onSubmit={submitForm}>
                        <div className={`${styles.inputsContainer} card-container-wrap`}>
                            {/* 문제 유형 */}
                            <article className="card-container required" onClick={onControlTab}>
                                <CardHeader title={titles[1]} />
                                <div className='card-body'>
                                    <select ref={examTypeRef} className={styles.select} name="type" value={type} /*disabled={type !== '' ? true : false}*/ required onChange={selectedOption}>
                                        <option value="" disabled hidden>선택하세요</option>
                                        <option value="normal" >일반 문제</option>
                                        {/* <option value="r-sub">R타입 설명글</option> */}
                                        <option value="r-question">R타입 문제</option>
                                    </select>
                                </div>
                            </article>

                            {/* 점수 */}
                            <article className="card-container active required" onClick={onControlTab}>
                                <CardHeader title={titles[7]} />
                                <div className='card-body'>
                                    <input type="number" value={score} className={styles.score} name="score" min="1" placeholder="점수를 입력하세요" required onChange={changeInputs} />
                                </div>
                            </article>
                        </div>

                        {/* 문제 내용 */}
                        <article className={`${styles.editorContainer} card-container active required`} onClick={onControlTab}>
                            <CardHeader title={titles[2]} />
                            <div className={`${styles.cardBody} card-body`}>

                            <Editor
                            value={titleHTML}
                            onEditorChange={changeTitle}
                            onInit={(evt, editor) => titleEditorRef.current = editor}
                            init={{
                            height: 300,
                            menubar: false,
                            object_resizing: ":not(table)",
                            plugins: [
                                'advlist autolink lists image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'Source code | undo redo | ' +
                                    'bold italic underline | superscript subscript | ' +
                                    'alignleft aligncenter alignright alignjustify | outdent indent |' +
                                    'table | ' +
                                    'removeformat',
                            content_style: 'body { font-family: NotoSansKR, sans-serif; font-size: inherit; } table[border]:not([border="0"]):not([style*=border-color]) td, table[border]:not([border="0"]):not([style*=border-color]) th {border-color: #000}'
                            }}
                            />
                            </div>
                        </article>

                        {/* 문제 설명 */}
                        <article className="card-container" onClick={onControlTab}>
                            <CardHeader title={titles[3]} />
                            <div className='card-body'>
                                <Editor
                                value={subTitleHTML}
                                onEditorChange={changeSubTitle}
                                onInit={(evt, editor) => subTitleEditorRef.current = editor}
                                init={{
                                height: 300,
                                menubar: false,
                                object_resizing: ":not(table)",
                                plugins: [
                                    'advlist autolink lists image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'Source code | undo redo | ' +
                                        'bold italic underline | superscript subscript | ' +
                                        'alignleft aligncenter alignright alignjustify | outdent indent | ' +
                                        'table | ' +
                                        'removeformat',
                                content_style: 'body { font-family: NotoSansKR, sans-serif; font-size: inherit; } table[border]:not([border="0"]):not([style*=border-color]) td, table[border]:not([border="0"]):not([style*=border-color]) th {border-color: #000}'
                                }}
                                />
                            </div>
                        </article>

                        {/* <div className={type === 'r-question' ? "hide" : `${styles.inputsContainer} card-container-wrap`}> */}
                        <div className={`${styles.inputsContainer} card-container-wrap`}>
                            {/* 이미지 첨부*/}
                            <article className={examID !== '' ? "card-container add-file-container" : "card-container"} onClick={onControlTab}>
                                <CardHeader title={titles[4]} />
                                <div className='card-body'>
                                    <div className={`${styles.imgOption} btn-left-wrap`}>
                                        <span>이미지 정렬</span>

                                        
                                        <label htmlFor="column" className={imgAlign === '0' ? `${styles.radioBtn} ${styles.active} btn` : `${styles.radioBtn} btn`}>
                                            <input type="radio" id="column" data-name="0" name="imgAlign" className="d-none" checked={imgAlign === '0' ? true : false} onChange={changeImgAlign} />
                                            <div><CheckIcon fill='#5083d4' />세로</div>
                                        </label>

                                        
                                        <label htmlFor="row" className={imgAlign === '1' ? `${styles.radioBtn} ${styles.active} btn` : `${styles.radioBtn} btn`}>
                                            <input type="radio" id="row" data-name="1" name="imgAlign" className="d-none" checked={imgAlign === '1' ? true : false} onChange={changeImgAlign} />
                                            <div><CheckIcon fill='#5083d4' />가로</div>
                                        </label>
                                    </div>
                                    <table className="table">
                                        <colgroup>
                                            <col width="22%" />
                                            <col width="78%" />
                                        </colgroup>
                                        <tbody>                                        
                                            <tr>
                                                <td className="text-left">첨부파일 1</td>
                                                <td><AddFile id={'imgFile01'} name={'imgFile01'} file={inputs.imgFile01} onChangeInputs={changeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">첨부파일 2</td>
                                                <td><AddFile id={'imgFile02'} name={'imgFile02'} file={inputs.imgFile02} onChangeInputs={changeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">첨부파일 3</td>
                                                <td><AddFile id={'imgFile03'} name={'imgFile03'} file={inputs.imgFile03} onChangeInputs={changeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">첨부파일 4</td>
                                                <td><AddFile id={'imgFile04'} name={'imgFile04'} file={inputs.imgFile04} onChangeInputs={changeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">첨부파일 5</td>
                                                <td><AddFile id={'imgFile05'} name={'imgFile05'} file={inputs.imgFile05} onChangeInputs={changeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </article>

                            {/* 동영상 첨부 */}
                            {/* <article className="card-container" onClick={onControlTab}>
                                <CardHeader title={titles[5]} />
                                <div className='card-body'>

                                    <table className="table">
                                        <colgroup>
                                            <col width="22%" />
                                            <col width="78%" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td className="text-left">첨부파일</td>
                                                <td>
                                                    <AddFile
                                                    id={'videoFile01'}
                                                    name={'videoFile01'}
                                                    onChangeInputs={onChangeInputs}
                                                    video={true}
                                                    examType={inputs.type}
                                                    onDeleteFiles={deleteFiles}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    //URL 업로드
                                    <ul className={`${styles.tabBtnWrap} vertical`}>
                                        <li data-index="1" className={UploadTab === true ? `${styles.tabBtn} ${styles.active}` : styles.tabBtn} onClick={clickUploadTab}>첨부파일 업로드</li>
                                        <li data-index="2" className={UploadTab === true ? styles.tabBtn : `${styles.tabBtn} ${styles.active}`} onClick={clickUploadTab}>동영상 링크</li>
                                    </ul>
                                    <ul className={styles.tabContainer}>
                                        <li className={UploadTab === true ? styles.tabContent : styles.tabContentHide}>
                                            <AddFile
                                            id={'videoFile01'}
                                            name={'videoFile01'}
                                            onChangeInputs={onChangeInputs}
                                            video={true}
                                            examType={inputs.type}
                                            onDeleteFiles={deleteFiles}
                                            />
                                        </li>
                                        <li className={UploadTab === true ? styles.tabContentHide : `${styles.tabContent} videoURL-container`}>
                                            <input type="text" name="videoURL" value={videoURL === null ? '' : videoURL} className={styles.urlInput} placeholder="URL을 입력하세요" onChange={onChangeInputs} />
                                            <button type="button" className="btn del-btn" onClick={deleteFiles}>
                                                <DeleteIcon /> 링크 삭제
                                            </button>
                                            <button type="button" data-name="videoURL" className={`${styles.viewBtn} btn view-btn`} onClick={viewModal}><ViewIcon fill={'#333'} /> 미리보기</button>
                                        </li>
                                    </ul>
                                </div>
                            </article>*/}
                        </div> 

                        {/* 문항*/}
                        <article className={(type !== 'r-question' && examID !== '' ? "add-file-container card-container required sheet-container" : "card-container required sheet-container") || (type === 'r-sub' ? "hide" : "card-container required") } onClick={onControlTab}>
                            <CardHeader title={titles[6]} />
                            <div className='card-body'>
                                <div className={type === 'r-question' ? "btn-right-wrap" : "hide btn-right-wrap"}>
                                    <button type="button" className="btn add-btn" onClick={addSheet}><PlusIcon fill={'#333'} />문항 추가</button>
                                </div>
                                <table className={`${styles.sheetTable} table sheet-row-table`}>
                                    {/* {type === 'r-question' &&
                                    <colgroup>
                                        <col width="10%" />
                                        <col width="50%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                    </colgroup>} */}
                                    
                                    {type !== 'r-question' &&
                                    <colgroup>
                                        <col width="8%" />
                                        <col width="36%" />
                                        <col width="36%" />
                                        <col width="20%" />
                                    </colgroup>}

                                    {type === 'r-question' &&
                                    <colgroup>
                                        <col width="10%" />
                                        <col width="50%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                    </colgroup>}
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>내용</th>
                                            {type !== 'r-question' && <th>이미지</th>}
                                            <th><span className={styles.spanWrap}>정답 <small className={styles.toolTip}><QuestionIcon fill='#9e9e9e' /></small></span></th>
                                            {type === 'r-question' && <th>문항 삭제</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sheet.map((sheet, index) => {
                                            console.log(index)
                                            return <SheetRow
                                                    key={sheet.id}
                                                    type={type}
                                                    index={index + 1}
                                                    sheet={sheet}
                                                    sheetText={`SheetText${index + 1}`}
                                                    answer={inputs.answer}
                                                    onDeleteRow={deleteRow}
                                                    onChangeSheet={changeSheet}
                                                    onChangeInputs={changeInputs}
                                                    onDeleteFiles={deleteFiles}
                                                    examType={inputs.type}
                                                    onDeleteSheetFiles={deleteSheetFiles}
                                                    currentModifyExam={currentModifyExam}
                                                    onChangeSheetText={changeSheetText}
                                                    onCheckedSelectExamType={checkedSelectExamType}
                                                    />;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </article>

                        <div className={`${styles.btnWrap} btn-wrap`}>
                            <button type="submit" className="btn big__btn">
                                {examID === '' ? <><PlusIcon />문제 등록</> : <><PenIcon /> 문제 수정</>}
                            </button>
                            <button type="button" className={`${styles.viewExamBtn} btn big__btn view-btn`} onClick={viewExam}><ViewIcon fill='#333' /> 문제 미리보기</button>
                        </div>
                    </form>
                </div>
            </section>

            <article className={`${styles.sideNav}`} onClick={sideToggle}>
                <div className={styles.navHeader}>
                    <button type="button" className={`${styles.sideNavBtn} btn side-tab-btn`}><DoubleArrowIcon /></button>
                    <p><DocumentIcon size={32} fill={'#fff'} /> <b>등록한 문제</b>({addedExamList.length !== 0 ? `${addedExamList.length}개` : `없음`})</p>
                </div>

                <ul className={`${styles.navBody} scroll-wrapper`}>
                    {addedExamList.map((item, index) => 
                        <AllExamRow
                        key={item.id}
                        index={index+1}
                        item={item}
                        onViewSideExam={viewSideExam}
                        onModifyiExam={modifyExam}
                        onConfirmDeleteExam={confirmDeleteExam}
                        />
                    )}
                </ul>
                
            </article>
        </>
    )
});

export default AddExam;