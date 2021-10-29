import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../../component/common/header/header';
import PageTitle from '../../../component/pageTitle/pageTitle';
import CardHeader from '../../../component/cardContainer/cardHeader';
import ExamListTable from './examListTable';
import styles from './examList.module.css';
import ReadyExamList from '../../../api/list/readyExamList';

const ExamList = ({onControlTab}) => {
    const [titles] = useState(['시험 목록', '시험별 등록한 문제 보기']);

    const [examLsit, setExamList] = useState([]);
    
    const readyExamList = new ReadyExamList();
    useEffect(() => {
        readyExamList.showList()
        .then(result => {
            //console.log(result);
            setExamList(result);
        });
    }, []);

    const history = useHistory();
    const pageMoveAddExam = (list) => {
        history.push({
            pathname: '/addExam',
            state: {
                sei_id: list.sei_id,
                examClass: list.class,
                examTitle: list.name,
                examDate: list.sei_start.substring(0, 10)
            }
        });
        //history.push('/addExam');
    };
    const history1 = useHistory();
    const pageBankMove = (list) => {
        history1.push({
            pathname: '/bank',
            state: {
                sei_id: list.sei_id,
                examClass: list.class,
                examTitle: list.name,
                examDate: list.sei_start.substring(0, 10)
            }
        });
    };

    const pageMoveBank = () => {
        history.push('/bank');
    };

    return(
        <>
            <Header />
            <section className="examlist-wrap container-wrap">
                <PageTitle title={titles[0]} iconName={'document'} />
                <article className="card-container" onClick={onControlTab}>
                    <CardHeader title={titles[1]} />
                    <div className='card-body'>
                        <table className="table">
                            <colgroup>
                                <col width="10%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="15%" />
                                <col width="15%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th className="text-left">교시</th>
                                    <th className="text-left">시험명</th>
                                    <th>시험일</th>
                                    <th>문제은행</th>
                                    <th>문제 등록</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examLsit.map((list, index) => (
                                    <ExamListTable key={list.sei_id} list={list} index={index + 1} onPageMoveAddExam={pageMoveAddExam} onPageBankMove={pageBankMove}/>
                                ))}
                                {examLsit.length === 0
                                && <tr className={styles.noneList}><td colSpan="5">※ 현재 준비된 시험이 없습니다. ※</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        </>
    );
};

export default ExamList;