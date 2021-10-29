import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DocumentIcon from '../icon/documentIcon';
//import MenuIcon from '../icon/menuIcon';
//import Layout2Icon from '../icon/layout2Icon';
import RefreshIcon from '../icon/refreshIcon';
import ViewIcon from '../icon/viewIcon';
import WriteIcon from '../icon/writeIcon';
import styles from './pageTitle.module.css';

const PageTitle = React.memo(({title, iconName, onResetForm, pageInfo, examID, viewLayout, onChangeLayout, allExamNum}) => {

    const refresh = () => {
        onResetForm();
    };

    const history = useHistory();
    const location = useLocation();

    const pageMove = (event) => {

        const targetName = event.currentTarget.dataset.name;
        const {sei_id, examClass, examTitle, examDate} = location.state;

        if(targetName === 'addExam') {
            history.push({
                pathname: '/addExam',
                state: {
                    sei_id: sei_id,
                    examClass: examClass,
                    examTitle: examTitle,
                    examDate: examDate
                }
            });
        }else if(targetName === 'allExam') {
            history.push({
                pathname: '/viewAllExam',
                state: {
                    sei_id: sei_id,
                    examClass: examClass,
                    examTitle: examTitle,
                    examDate: examDate
                }
            });
        }else if(targetName === 'examList') {
            history.push('/examList');
        }
    };
    //console.log(location);

    /*const changeLayout = (event) => {
        const index = event.currentTarget.dataset.index;
        onChangeLayout(index);
    };*/
    return (
        <section className={styles.pageTitle}>
            <h1 className={pageInfo === 'addExam' ? `${styles.title} ${styles.examInfoPage}` : styles.title}>
                {iconName === 'write' && <WriteIcon size='32' fill='#111' />}
                {iconName === 'document' && <DocumentIcon size='32' fill='#111' />}
                <span>{title}</span>
            </h1>
            <div className={styles.topBtnWrap}>
            {pageInfo === 'addExam' &&
            <>
                <button type="button" className={`${styles.listBtn} btn yellow-btn`} data-name="examList" onClick={pageMove}><DocumentIcon fill='333' />시험목록</button>
                {allExamNum > 0 && <button type="button" className={`${styles.printBtn} btn grey-btn`} data-name="allExam" onClick={pageMove}><ViewIcon fill='#333' />전체문제 보기</button>}
                <button type="button" className={`${styles.refreshBtn} btn grey-btn refresh-btn`} onClick={refresh}><RefreshIcon fill='333' />{examID !== '' ? '수정 취소' : '내용 지우기'}</button>
            </>
            }
            {pageInfo === 'viewAllExam' && 
            <>
                <button type="button" className={`${styles.addBtn} btn yellow-btn`} data-name="addExam" onClick={pageMove}> <WriteIcon fill='#333' /> 문제 등록하기</button>
                {/* {viewLayout !== 1 ? <button className={`grey-btn btn`} data-index="1" onClick={changeLayout}><MenuIcon fill='#333' />1단 보기</button> : <button className={`grey-btn btn`} data-index="2" onClick={changeLayout}><Layout2Icon fill='#333' /> 2단 보기</button>} */}
            </>
            }
            </div>
        </section>
    )
});

export default PageTitle;