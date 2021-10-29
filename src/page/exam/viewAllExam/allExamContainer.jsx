import React, { useEffect, useState } from 'react';
import configData from '../../../config/config.json';
import ExamContainer from '../../../component/exam/examContainer';
import DOMPurify from 'dompurify';

const AllExamContainer = React.memo(({exam, item, viewLayout}) => {

    const pageInfo = 'viewAllExam';

    // inputs 초기화
    const initialViewSimpleExam = {
        title: '',
        subTitle: '',
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
    const [viewSimpleSheetInfo, setViewSimpleSheetInfo] = useState(initialViewSimpleSheet);

    // 문항
    /*const initialSheet = [
        {id: 'sheet1', text: '', img: {file: null, value: null, URL: null}, answer: false, value: 1},
        {id: 'sheet2', text: '', img: {file: null, value: null, URL: null}, answer: false, value: 2},
        {id: 'sheet3', text: '', img: {file: null, value: null, URL: null}, answer: false, value: 3},
        {id: 'sheet4', text: '', img: {file: null, value: null, URL: null}, answer: false, value: 4},
        {id: 'sheet5', text: '', img: {file: null, value: null, URL: null}, answer: false, value: 5},
    ];*/
    
    //const [sheet, setSheet] = useState(initialSheet);


    /* ---------- 에디터 HTML 시작 ---------- */
    const [titleHTML, setTitleHTML] = useState();
    const titleResult = DOMPurify.sanitize(titleHTML, {USE_PROFILES: {html: true}});

    const [subTitleHTML, setSubTitleHTML] = useState();
    const subTitleResult = DOMPurify.sanitize(subTitleHTML, {USE_PROFILES: {html: true}});
    
    /* ---------- 에디터 HTML 끝 ---------- */


   // 문제 불러오기
    const loadingExam = () => {
        const selectExam = item;
        exam.loadExam(selectExam)
        .then(result => {
            setTitleHTML(result[0].sti_name);
            setSubTitleHTML(result[0].sti_content);
            //console.log(result)
            setViewSimpleExamInfo({
                title: result[0].sti_name,
                subTitle: result[0].sti_content,
                imgAlign: result[0].img_ori,
                imgFile01: {
                    name: (result[0].sti_file1 != null && result[0].sti_file1 != 'null' && result[0].sti_file1 != ' ') ? result[0].sti_file1 : null,
                    URL: (result[0].bf_file != null && result[0].bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file}` : null,
                },
                imgFile02: {
                    name: (result[0].sti_file2 != null && result[0].sti_file2 != 'null' && result[0].sti_file2 != ' ') ? result[0].sti_file2 : null,
                    URL: (result[0].bf_file2 != null && result[0].bf_file2 != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file2}` : null,
                },
                imgFile03: {
                    name: (result[0].sti_file3 != null && result[0].sti_file3 != 'null' && result[0].sti_file3 != ' ') ? result[0].sti_file3 : null,
                    URL: (result[0].bf_file3 != null && result[0].bf_file3 != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file3}` : null,
                },
                imgFile04: {
                    name: (result[0].sti_file4 != null && result[0].sti_file4 != 'null' && result[0].sti_file4 != ' ') ? result[0].sti_file4 : null,
                    URL: (result[0].bf_file4 != null && result[0].bf_file4 != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file4}` : null,
                },
                imgFile05: {
                    name: (result[0].sti_file5 != null && result[0].sti_file5 != 'null' && result[0].sti_file5 != ' ') ? result[0].sti_file5 : null,
                    URL: (result[0].bf_file5 != null && result[0].bf_file5 != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].bf_file5}` : null,
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
                {id: 'sheet1', text: result[0].sti_1, img: {URL: (result[0].sti1_bf_file != null && result[0].sti1_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti1_bf_file}` : null}},
                {id: 'sheet2', text: result[0].sti_2, img: {URL: (result[0].sti2_bf_file != null && result[0].sti2_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti2_bf_file}` : null}},
                {id: 'sheet3', text: result[0].sti_3, img: {URL: (result[0].sti3_bf_file != null && result[0].sti3_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti3_bf_file}` : null}},
                {id: 'sheet4', text: result[0].sti_4, img: {URL: (result[0].sti4_bf_file != null && result[0].sti4_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti4_bf_file}` : null}},
                {id: 'sheet5', text: result[0].sti_5, img: {URL: (result[0].sti5_bf_file != null && result[0].sti5_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti5_bf_file}` : null}},
                {id: 'sheet6', text: result[0].sti_6, img: {URL: (result[0].sti6_bf_file != null && result[0].sti6_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti6_bf_file}` : null}},
                {id: 'sheet7', text: result[0].sti_7, img: {URL: (result[0].sti7_bf_file != null && result[0].sti7_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti7_bf_file}` : null}},
                {id: 'sheet8', text: result[0].sti_8, img: {URL: (result[0].sti8_bf_file != null && result[0].sti8_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti8_bf_file}` : null}},
                {id: 'sheet9', text: result[0].sti_9, img: {URL: (result[0].sti9_bf_file != null && result[0].sti9_bf_file !=' null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti9_bf_file}` : null}},
                {id: 'sheet10', text: result[0].sti_10, img: {URL: (result[0].sti10_bf_file != null && result[0].sti10_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti10_bf_file}` : null}},
                {id: 'sheet11', text: result[0].sti_11, img: {URL: (result[0].sti11_bf_file != null && result[0].sti11_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti11_bf_file}` : null}},
                {id: 'sheet12', text: result[0].sti_12, img: {URL: (result[0].sti12_bf_file != null && result[0].sti12_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti12_bf_file}` : null}},
                {id: 'sheet13', text: result[0].sti_13, img: {URL: (result[0].sti13_bf_file != null && result[0].sti13_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti13_bf_file}` : null}},
                {id: 'sheet14', text: result[0].sti_14, img: {URL: (result[0].sti14_bf_file != null && result[0].sti14_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti14_bf_file}` : null}},
                {id: 'sheet15', text: result[0].sti_15, img: {URL: (result[0].sti15_bf_file != null && result[0].sti15_bf_file != 'null') ? `${configData.SERVER_URL}/mv31/toolbox/data/${result[0].sti15_bf_file}` : null}},
            ];

            const sheetCopy = sheet.filter(sheet => sheet.text);
            setViewSimpleSheetInfo(sheetCopy);

            //viewExam(2, index);
        });
    }

    useEffect(() => {
        loadingExam();
    }, []);

    return(
        <ExamContainer viewLayout={viewLayout} titleResult={titleResult} subTitleResult={subTitleResult} inputs={viewSimpleExamInfo} sheet={viewSimpleSheetInfo} pageInfo={pageInfo} />
    );
});

export default AllExamContainer;