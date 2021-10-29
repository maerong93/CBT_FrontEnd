import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Exam from '../../../api/exam/exam';
import Header from '../../../component/common/header/header';
import ArrowIcon from '../../../component/icon/arrowIcon';
import PageTitle from '../../../component/pageTitle/pageTitle';
import AllExamContainer from './allExamContainer';
import styles from './viewAllExam.module.css';

const ViewAllExam = React.memo((props) => {

    const pageInfo = 'viewAllExam';

    const location = useLocation();
    const {sei_id, examClass, examTitle, examDate} = location.state;

    const exam = new Exam();

    const [addedExamList, setAddedExamList] = useState([]);

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
    //console.log(addedExamList);

    useEffect(() => {
        showExamList();
    }, []);

    /* 1단, 2단보기 */
    const [viewLayout, setViewLayout] = useState(1);

    const [style, setStyle] = useState(`${styles.layout1}`);

    const changeLayout = (index) => {
        if(index === '2') {
            setViewLayout(2);
            localStorage.setItem("viewLayout", "2");
            localStorage.setItem("style", "2");
            setStyle(`${styles.layout2}`);
        }else {
            setViewLayout(1);
            localStorage.setItem("viewLayout", "1");
            localStorage.setItem("style", "1");
            setStyle(`${styles.layout1}`);
        }
    };

    useEffect(() => {
        localStorage.getItem("viewLayout") === "2" && setViewLayout(2);
        localStorage.getItem("style") === "2" && setStyle(`${styles.layout2}`);
    }, []);
    
    const movePageTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    return(
        <>
            <Header />
            <section className={`${styles.allExamContainer} ${style} container-wrap scroll-wrapper`}>
                <PageTitle pageInfo={pageInfo} title='전체 문제' iconName={'document'} viewLayout={viewLayout} onChangeLayout={changeLayout} />
                    <p className={styles.warning}>※ <b>시험문제 전체보기</b>로 확인 용도로 사용하시길 바랍니다. ※<br/>만약, 인쇄시 현재 화면과 다르게 출력될 수 있습니다. 꼭 '인쇄 미리보기' 화면으로 확인해주세요.</p>
                    <div className={styles.allExamWrap}>
                        <article className={`${styles.examInfo} ${styles.examHeader}`}>
                            <h4 className={styles.exmaTitle}>{examTitle}</h4>
                            <ul className={styles.infos}>
                                <li>교시 : {examClass}</li>
                                <li>과목 : {examTitle}</li>
                                <li>시험일 : {examDate}</li>
                            </ul>
                        </article>

                        <table className={styles.tableWrap}>
                            <thead>
                                <tr>
                                    <td><div className={styles.headerSpace}></div></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={styles.tbodyContainer}>
                                            {addedExamList.map((item, index) =>
                                                <AllExamContainer viewLayout={viewLayout} key={`exam${index + 1}`} exam={exam} item={item} />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><div className={styles.footerSpace}></div></td>
                                </tr>
                            </tfoot>
                        </table>

                        <article className={styles.pageNumber}><p></p></article>
                    </div>
                    <button type="button" className={`${styles.topBtn} btn`} onClick={movePageTop}>
                        <ArrowIcon />
                    </button>
            </section>
        </>
    );
});

export default ViewAllExam;