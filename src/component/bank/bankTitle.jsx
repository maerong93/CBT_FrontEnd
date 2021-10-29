import React from "react";
import WriteIcon from "../icon/writeIcon";
import styles from "../pageTitle/pageTitle.module.css";
import BankPageTitle from "./bankPageTitle";
import DocumentIcon from "../icon/documentIcon";
import configDate from "../../config/config.json";

const BankTitle = ({examClass, examTitle, examDate}) => {
  const goToList = () => {
    document.location.href=`${configDate.CLIENT_URL}`
  }

  return (
    <>
      <section className={styles.pageTitle}>
        <h1 className={styles.title}>
          <WriteIcon size="32" fill="#111" />
          <span>문제 가져오기</span>
        </h1>
        <div className={`${styles.topBtnWrap}`}>
          <button
            type="button"
            onClick={goToList}
            className={`${styles.listBtn} center btn yellow-btn`}
          >
            <DocumentIcon fill={`var(--font-color-010)`} />
            시험목록
          </button>
        </div>
      </section>
      <BankPageTitle examClass={examClass} examTitle={examTitle} examDate={examDate} />
    </>
  );
};

export default BankTitle;
