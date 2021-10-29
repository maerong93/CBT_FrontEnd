import React from 'react';
import styles from './viewModal.module.css';
import CloseIcon from '../../icon/closeIcon';
import ArrowIcon from '../../icon/arrowIcon';
import ExamContainer from '../../exam/examContainer';

const ViewModal = React.memo(({modal, onPrevAndNextExam, modalClass, hideModal, modalTitle, titleResult, subTitleResult, inputs, sheet}) => {

    const prevViewExam = () => {
        onPrevAndNextExam('prev');
    };

    const nextViewExam = () => {
        onPrevAndNextExam('next');
    };

    return(
        <section className={modalClass === true ? styles.modalShow  : styles.modalHide}>
            <article className={styles.container}>
                <ul className={styles.header}>
                    <h1>{modalTitle}</h1>
                    <button className={`${styles.closeBtn} btn close-btn blue-btn`} onClick={hideModal}><CloseIcon className={styles.svg} /></button>
                </ul>

                <ul className={`${styles.body} scroll-wrapper`}>
                    <button type="button" className={modal === 2 ? `${styles.prevBtn} btn` : 'hide'} onClick={prevViewExam}><ArrowIcon fill='#333' /></button>
                    <ExamContainer titleResult={titleResult} subTitleResult={subTitleResult} inputs={inputs} sheet={sheet} modal={modal} />
                    <button type="button" className={modal === 2 ? `${styles.nextBtn} btn` : 'hide'} onClick={nextViewExam}><ArrowIcon fill='#333' /></button>
                </ul>
            </article>
        </section>
    );
});

export default ViewModal;