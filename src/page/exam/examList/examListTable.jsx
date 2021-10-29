import React from 'react';
import Moment from 'react-moment';
import 'moment/locale/ko';
import BringIcon from '../../../component/icon/bringIcon';
import ViewIcon from '../../../component/icon/viewIcon';
import WriteIcon from '../../../component/icon/writeIcon';
import styles from './examList.module.css';

const ExamListTable = React.memo(({list, index, onPageMoveAddExam, onPageBankMove}) => {
    
    //const date = list.sei_start.substring(0, 10);
    const date = new Date(list.sei_start); 


    

    const pageMove = () => {
        onPageMoveAddExam(list);
    };

    const bankMove = () => {
        onPageBankMove(list);
    };
    return(
        
        <tr>
            <td>{index}</td>
            <td className="text-left">{list.class}</td>
            <td className="text-left">{list.name}</td>
            <td>
                <Moment format="YYYY-MM-DD">{date}</Moment></td>
            <td>
                <div className="btn-wrap">
                    <button type="button" className={`${styles.viewBtn} btn grey-btn`} onClick={bankMove}><BringIcon fill="#111" />문제 가져오기</button>                    
                </div>
            </td>
            <td>
                <div className="btn-wrap">
                    <button type="button" className={`${styles.viewBtn} btn view-btn`} onClick={pageMove}><WriteIcon fill="#111" />문제 등록</button>                    
                </div>
            </td>
        </tr>
       
    );
});

export default ExamListTable;