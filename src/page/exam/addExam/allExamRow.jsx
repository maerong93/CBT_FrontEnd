import DOMPurify from 'dompurify';
import React from 'react';
import DeleteIcon from '../../../component/icon/deleteIcon';
import PenIcon from '../../../component/icon/penIcon';
import ViewIcon from '../../../component/icon/viewIcon';
import styles from './addExam.module.css';

const AllExamRow = React.memo(({index, item, onConfirmDeleteExam, onViewSideExam, onModifyiExam}) => {
    const viewExam = () => {
        onViewSideExam(item, index);
    };

    const modifyiExam = () => {
        onModifyiExam(index, item);
    };

    const confirmDeleteExam = () => {
        onConfirmDeleteExam(index, item);
    };
    //console.log(item);
    const title = DOMPurify.sanitize(item.sti_name, {USE_PROFILES: {html: true}});
    return(
        <li>
            <button type="button" className={`${styles.numBtn} btn`}>{index}</button>
            <p className={styles.examTitle}>
                <span dangerouslySetInnerHTML={{__html: title}}></span>
                {/* <span>{item.sti_name}</span> */}
            </p>
            <div className={`${styles.btnWrap} btn-wrap`}>
                <button title="미리보기" type="button" className={`${styles.viewBtn} btn view-btn center`} onClick={viewExam}>
                    <ViewIcon fill='#5083d4' />
                </button>
                <button title="수정" type="button" className="btn mod-btn center" onClick={modifyiExam}>
                    <PenIcon fill='#ff9a00' />
                </button>
                <button title="삭제" type="button" className="btn del-btn center" onClick={confirmDeleteExam}>
                    <DeleteIcon fill='#da131e' />
                </button>
            </div>
        </li>
    );
});

export default AllExamRow;