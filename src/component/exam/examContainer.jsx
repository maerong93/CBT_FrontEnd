import React from 'react';
import styles from '../modal/view/viewModal.module.css';

const ExamContainer = React.memo(({modal, titleResult, subTitleResult, inputs, sheet, viewLayout, pageInfo}) => {
    const {type, score, imgAlign, subTitle, imgFile01, imgFile02, imgFile03, imgFile04, imgFile05, videoFile01} = inputs;
    const sheetText = sheet.filter(sheet => sheet.text);

    let answer;
    const checked = sheet.filter(sheet => sheet.answer === true);
    if(type === 'normal') {
        const value = checked.map(sheet => {
            return sheet.value;
        });
        answer = value[0];
    }else {
        const value = checked.map(sheet => {
            return sheet.value;
        });
        const ranswer = value.join(', ');
        answer = ranswer;
    }

    return(
        <section className={(pageInfo === 'viewAllExam' && viewLayout && viewLayout !== 1) ? `${styles.viewExam} ${styles.smallExam}` : styles.viewExam}>
            {(!titleResult && !subTitle && !imgFile01.URL && !imgFile02.URL && !imgFile03.URL && !imgFile04.URL && !imgFile05.URL && sheetText.length === 0)
            && <h6 className={styles.noContents}>※ 입력한 내용이 없습니다. ※</h6>}
    
            {modal === 2 &&
                <ul className={styles.examInfos}>
                <li>문제 유형 &nbsp;:&nbsp; <b>{type !== 'r-question' ? '일반 문제' : 'R타입 문제'}</b></li>
                <li>배점 &nbsp;:&nbsp; <b className="ls-0">{score}</b></li>
                <li>정답 &nbsp;:&nbsp; <b className="ls-0">{answer}</b></li>
            </ul>}

            {titleResult &&
            <ul className={styles.titleWrap}>
                <li>
                    <pre className={styles.title} dangerouslySetInnerHTML={{__html: titleResult}}></pre>
                </li>
                <li className={styles.emptyBtnSize}></li>
            </ul>
            }
            
            {subTitleResult &&
            <pre className={styles.subTitle} dangerouslySetInnerHTML={{__html: subTitleResult}}></pre>}
            
            <ul className={imgAlign === '0' ? styles.imgContainer : `${styles.imgRow} ${styles.imgContainer}`}>
                {imgFile01.URL}
                {imgFile01.URL &&
                <li className={styles.imgBox}>
                    <img src={imgFile01.URL} alt="imgFile01" />
                    <b>&#60;{imgFile01.name}&#62;</b>
                </li>}
                {imgFile02.URL &&
                <li className={styles.imgBox}>
                    <img src={imgFile02.URL} alt="imgFile02" />
                    <b>&#60;{imgFile02.name}&#62;</b>
                </li>}
                {imgFile03.URL &&
                <li className={styles.imgBox}>
                    <img src={imgFile03.URL} alt="imgFile03" />
                    <b>&#60;{imgFile03.name}&#62;</b>
                </li>}
                {imgFile04.URL &&
                <li className={styles.imgBox}>
                    <img src={imgFile04.URL} alt="imgFile04" />
                    <b>&#60;{imgFile04.name}&#62;</b>
                </li>}
                {imgFile05.URL &&
                <li className={styles.imgBox}>
                    <img src={imgFile05.URL} alt="imgFile05" />
                    <b>&#60;{imgFile05.name}&#62;</b>
                </li>}
            </ul>

            {videoFile01.URL &&
            <div className={styles.videoContainer}>
                <video src="" controls played="true" width="800"></video>
                <b>&#60;동영상 문제번호&#62;</b>
            </div>}

            {/* {(pageInfo === 'viewAllExam' && viewLayout && viewLayout !== 1 && imgAlign !== '0') && <div className={styles.clear}></div>} */}
            
            <ul className={styles.sheetContainer}>
                {sheet.map((sheet) => {
                    if(sheet.text === '') {
                        return;
                    }
                    return  <li key={sheet.id} className={styles.sheet}>
                                <div className={styles.sheetText}>
                                    <span className={styles.selectNum}></span>
                                    <pre className={styles.text} dangerouslySetInnerHTML={{__html: sheet.text}}></pre>
                                </div>
                                {(sheet.img.URL) &&
                                <div className={styles.sheetImg}>
                                    <img src={sheet.img.URL} alt="sheetImg" />
                                </div>}
                            </li>;
                })}
            </ul>
        </section>
    );
});

export default ExamContainer;