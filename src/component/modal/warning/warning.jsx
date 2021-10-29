import React from 'react';
import styles from './warning.module.css';

const Warning = React.memo(({modalActive, onCloseModal, text, pageInfo, cancleBtn}) => {
    const closeModal = (event) => {
        const dataset = event.target.dataset.name;
        onCloseModal(dataset);
    }

    return(
        <section className={modalActive === true ? styles.modalShow : styles.modalHide}>
            <article className={styles.container}>
                <pre className={styles.header}>{text}</pre>
                <div className={styles.body}>

                    <button data-name="ok" className="btn modal-btn" onClick={closeModal}>확인</button>
                    {(pageInfo === 'addExam' && cancleBtn) && <button data-name="cancle" className="btn modal-btn cancel-btn" onClick={closeModal}>취소</button>}
                </div>
            </article>
        </section>
    );
}); 

export default Warning;