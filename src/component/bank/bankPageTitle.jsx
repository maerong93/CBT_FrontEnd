import React from "react";
import styles from "../../page/exam/addExam/addExam.module.css";

const BankPageTitle = ({examClass, examTitle, examDate}) => {
  return (
    <ul className={styles.examInfo}>
      <li>교시 : {examClass}</li>
      <li>시험명 : {examTitle}</li>
      <li>시험일 : {examDate}</li>
    </ul>
  );
};

export default BankPageTitle;
