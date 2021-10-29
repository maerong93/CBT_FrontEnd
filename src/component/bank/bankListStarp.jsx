import React from "react";
import styles from "./bankItem.module.css";

const BankListStarp = (props) => {
  return (
    <div className={styles.item_strap_wrap}>
      <div className={`${styles.item} ${styles.item_strap}`}>
        <span className={`${styles.content_strap} ${styles.bold} center`}>
          문제 내용
        </span>
        <span className={`${styles.test_name_strap} ${styles.bold} center`}>
          시험 명
        </span>
        <span className={`${styles.btn_strap} ${styles.bold} center`}>
          확인
        </span>

        <span className={`${styles.btn_strap} ${styles.bold} center`}>
          {props.type === "검색 결과" ? "추가" : "제외"}
        </span>
      </div>
    </div>
  );
};

export default BankListStarp;
