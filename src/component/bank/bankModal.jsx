import DOMPurify from "dompurify";
import React from "react";
import CloseIcon from "../icon/closeIcon";
import styles from "../modal/view/viewModal.module.css";
import BankModalSheet from "./bankModalSheet";

const BankModal = ({addFinishedExam,view,close,dataSend}) => {
  const view1 = view;

  const title = DOMPurify.sanitize(dataSend.sti_name, {USE_PROFILES: {html: true}})
  const content = DOMPurify.sanitize(dataSend.sti_content, {USE_PROFILES: {html: true}})
  const ex1 = DOMPurify.sanitize(dataSend.sti_1, {USE_PROFILES: {html: true}})
  const ex2 = DOMPurify.sanitize(dataSend.sti_2, {USE_PROFILES: {html: true}})
  const ex3 = DOMPurify.sanitize(dataSend.sti_3, {USE_PROFILES: {html: true}})
  const ex4 = DOMPurify.sanitize(dataSend.sti_4, {USE_PROFILES: {html: true}})
  const ex5 = DOMPurify.sanitize(dataSend.sti_5, {USE_PROFILES: {html: true}})

  function close1() {
    close();
  }
  console.log(dataSend)
  return (
    <section className={view === true ? styles.modalShow : styles.modalHide}>
      <article className={styles.container}>
        <ul className={styles.header}>
          <h1>문제 미리보기</h1>
          <button
            className={`${styles.closeBtn} btn close-btn blue-btn`}
            onClick={close1}
          >
            <CloseIcon className={styles.svg} />
          </button>
        </ul>

        <ul className={`${styles.body} scroll-wrapper`}>
          <section className={styles.viewExam}>
            
            <ul className={styles.examInfos}>
              <li>문제 유형 &nbsp;:&nbsp;일반 문제</li>
              <li>배점 &nbsp;:&nbsp;{dataSend.sti_score}</li>
              <li>정답 &nbsp;:&nbsp;{dataSend.sti_answer}</li>
            </ul>
            <ul className={styles.titleWrap}>
              <li>
                <span className={styles.title}>
                  <p dangerouslySetInnerHTML={{__html: title}}>
                  </p>
                </span>
              </li>
              <li />
            </ul>
            
              {
                dataSend.sti_content == ""
                ? null
                : <span className={styles.subTitle}><p dangerouslySetInnerHTML={{__html: content}}></p></span>
              }
              
            
            <ul className={`${styles.imgRow} ${styles.imgContainer}`}>
              {/* {
                dataSend.bf_file 
                ? <li className={styles.imgBox}>
                  <img
                    src="C:/Users/dudeh/Desktop/CBTBackEnd/cbt-backend/upload/dd044c29a6ec4599d4bb0a3918bc4684"
                    alt="demoimg01"
                  />
                  <b>&lt;{dataSend.sti_file1}&gt;</b>
                </li>
                : null
              } */}
              {/* {
                dataSend.bf_file2 &&
                <li className={styles.imgBox}>
                  <img
                    src={dataSend.bf_file2}
                    alt="demoimg02"
                  />
                  <b>&lt;{dataSend.sti_file2}&gt;</b>
                </li>
              } */}
              
               {
                dataSend.bf_file != "null"
                ?
                <li className={styles.imgBox}>
                  <img
                    src={`http://localhost:4000/upload/${dataSend.bf_file}`}
                    alt="demoimg03"
                  />
                  <b>&lt;{
                  dataSend.bf_file =='null' || dataSend.bf_file ==' '
                  ?
                    null
                  : 
                    dataSend.sti_file1
                  }&gt;</b>
                </li>    
                : null
              }
               {
                dataSend.bf_file2 != "null" 
                ?
                <li className={styles.imgBox}>
                  <img
                    src={`http://localhost:4000/upload/${dataSend.bf_file2}`}
                    alt="demoimg03"
                  />
                  <b>&lt;{
                  dataSend.bf_file2 =='null' || dataSend.bf_file2 ==' '
                  ?
                    null
                  : 
                    dataSend.sti_file2
                  }&gt;</b>
                </li>    
                : null
              }
              {
                dataSend.bf_file3 != "null" 
                ?
                <li className={styles.imgBox}>
                  <img
                    src={`http://localhost:4000/upload/${dataSend.bf_file3}`}
                    alt="demoimg03"
                  />
                  <b>&lt;{
                  dataSend.bf_file3 =='null' || dataSend.bf_file3 ==' '
                  ?
                    null
                  : 
                    dataSend.sti_file3
                  }&gt;</b>
                </li>    
                : null
              }

              {
                dataSend.bf_file4 != "null" 
                ?
                <li className={styles.imgBox}>
                  <img
                    src={`http://localhost:4000/upload/${dataSend.bf_file4}`}
                    alt="demoimg03"
                  />
                  <b>&lt;{
                  dataSend.bf_file4 =='null' || dataSend.bf_file4 ==' '
                  ?
                    null
                  : 
                    dataSend.sti_file4
                  }&gt;</b>
                </li>    
                : null
              }
              {
                dataSend.bf_file5 != "null" 
                ?
                <li className={styles.imgBox}>
                  <img
                    src={`http://localhost:4000/upload/${dataSend.bf_file5}`}
                    alt="demoimg03"
                  />
                  <b>&lt;{
                  dataSend.bf_file5 =='null' || dataSend.bf_file5 ==' '
                  ?
                    null
                  : 
                    dataSend.sti_file5
                  }&gt;</b>
                </li>    
                : null
              }

              {/* <li className={styles.imgBox}>
                <img
                  src={dataSend.pic2}
                  alt="demoimg01"
                />
                <b>&lt;{dataSend.sti_file2}&gt;</b>
              </li>
              <li className={styles.imgBox}>
                <img
                  src={dataSend.pic3}
                  alt="demoimg01"
                />
                <b>&lt;{dataSend.sti_file3}&gt;</b>
              </li>
              <li className={styles.imgBox}>
                <img
                  src={dataSend.pic4}
                  alt="demoimg01"
                />
                <b>&lt;{dataSend.sti_file4}&gt;</b>
              </li>
              <li className={styles.imgBox}>
                <img
                  src={dataSend.pic5}
                  alt="demoimg01"
                />
                <b>&lt;{dataSend.sti_file5}&gt;</b>
              </li> */}
            </ul>
            <ul className={styles.sheetContainer}>
              <BankModalSheet 
                text={dataSend.sti_1}
                src={dataSend.subpic1}
                alt="demoimg02"
                ex1={ex1}
              />
              <BankModalSheet
                text={dataSend.sti_2}
                src={dataSend.subpic2}
                alt="demoimg03"
                ex2={ex2}
              />
              <BankModalSheet
                text={dataSend.sti_3}
                src={dataSend.subpic3}
                alt="demoimg04"
                ex3={ex3}
              />
              <BankModalSheet
                text={dataSend.sti_4}
                src={dataSend.subpic4}
                alt="demoimg05"
                ex4={ex4}
              />
              <BankModalSheet
                text={dataSend.sti_5}
                src={dataSend.subpic5}
                alt="demoimg06"
                ex5={ex5}
              />
            </ul>
          </section>
        </ul>
      </article>
    </section>
  );
};

export default BankModal;
