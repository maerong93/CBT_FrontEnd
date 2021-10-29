import React,{useState, useEffect} from "react";
import Exam from "../../api/exam/exam";
import DeleteIcon from "../icon/deleteIcon";
import PlusIcon from "../icon/plusIcon";
import ViewIcon from "../icon/viewIcon";
import styles from "./bankItem.module.css";
import configDate from "../../config/config.json";
import DOMPurify from "dompurify";

const BankItem = ({fxsetdelFinishedExam,
                  fxsetAddFinishedExam,
                  examList,
                  open,
                  btnType,
                  setExamAdd,
                  type,
                  exam,
                  examList1,
                  index,
                  examTitle,
                  sei_id,
                  addFinishedExam,
                  setAddFinishedExam}) => {

  const formdata = new FormData();
  const myHeaders = new Headers();
  const [addExamList, setAddExamList] = useState([examList1]);
  const exam1 = new Exam(myHeaders,formdata);
  const title = DOMPurify.sanitize(exam.sti_name, {USE_PROFILES: {html: true}})

  function open1() {
    open(exam);
  }
  useEffect(() => {
    
  },[])
  const addExam = (e) => {
    const idx = parseInt(e.currentTarget.dataset.index)+1;
    console.log(sei_id);
    
    formdata.append("sei_id", sei_id);
    formdata.append("R_type", exam.R_type);
    formdata.append("sti_score", exam.sti_score);
    formdata.append("sti_name", exam.sti_name);
    formdata.append("sti_content", exam.sti_content)
    formdata.append("sti_po", exam.sti_po); // 구분자
    formdata.append("sti_file1", exam.sti_file1);
    formdata.append("sti_file2", exam.sti_file2);
    formdata.append("sti_file3", exam.sti_file3);
    formdata.append("sti_file4", exam.sti_file4);
    formdata.append("sti_file5", exam.sti_file5);
    formdata.append("sti_1", exam.sti_1);
    formdata.append("sti_2", exam.sti_2);
    formdata.append("sti_3", exam.sti_3);
    formdata.append("sti_4", exam.sti_4);
    formdata.append("sti_5", exam.sti_5);
    formdata.append("sti_6", exam.sti_6);
    formdata.append("sti_7", exam.sti_7);
    formdata.append("sti_8", exam.sti_8);
    formdata.append("sti_9", exam.sti_9);
    formdata.append("sti_10", exam.sti_10);
    formdata.append("sti_11", exam.sti_11);
    formdata.append("sti_12", exam.sti_12);
    formdata.append("sti_13", exam.sti_13);
    formdata.append("sti_14", exam.sti_14);
    formdata.append("sti_15", exam.sti_15);
    formdata.append("sti1_file", exam.sti1_file);
    formdata.append("sti2_file", exam.sti2_file);
    formdata.append("sti3_file", exam.sti3_file);
    formdata.append("sti4_file", exam.sti4_file);
    formdata.append("sti5_file", exam.sti5_file);
    formdata.append("sti6_file", exam.sti6_file);
    formdata.append("sti1_bf_file", exam.sti1_bf_file);
    formdata.append("sti2_bf_file", exam.sti2_bf_file);
    formdata.append("sti3_bf_file", exam.sti3_bf_file);
    formdata.append("sti4_bf_file", exam.sti4_bf_file);
    formdata.append("sti5_bf_file", exam.sti5_bf_file);
    formdata.append("sti6_bf_file", exam.sti6_bf_file);
    
    addFinishedExam.length >= 80
    ? alert("등록된 문제가 80개 초과입니다.")
    : exam1.addExam()
      .then(res => res)
    //console.log(addFinishedExam)
    fxsetAddFinishedExam();
    //setAddFinishedExam(examList1[idx]);
  }
  const delExam = (e) => {
    const idx = e.currentTarget.dataset.index;
    console.log(addFinishedExam[idx].sti_name)

    exam1.delExam(exam.id)
    .then(res => console.log(res))
    

    fxsetdelFinishedExam();
  }
  //console.log(addFinishedExam.length)
  const btnType1 = btnType;
  return (
    <>
    
    <li className={styles.item}>
      <span className={styles.content}>
        {
          type == "검색 결과" 
          ? <p dangerouslySetInnerHTML={{__html: title}}></p>
          : <p dangerouslySetInnerHTML={{__html: title}}></p>
        }          
      </span>
      <span className={`${styles.test_name} center`}>
        {
          type == "검색 결과"
          ? exam.sei_students
          : examTitle
        }
      </span>
      <span className={`center ${styles.btn_wrap}`}>
        <button
          type="button"
          className={`btn grey-btn center iconBtn ${styles.iconBtn}`}
          onClick={open1}
        >
          <ViewIcon fill="#333" />
        </button>
      </span>
      <span className={`center ${styles.btn_wrap}`}>
        {btnType === "add" ? (
          <button
            type="button"
            data-index={index}
            className={`btn blue-btn center iconBtn ${styles.iconBtn}`}
            onClick={addExam}
          >
            <PlusIcon />
          </button>
        ) : (
          <button
            type="button"
            className={`btn del-btn center iconBtn ${styles.iconBtn}`}
            onClick={delExam}
            data-index={index}
          >
            <DeleteIcon />
          </button>
        )}
      </span>
    </li>
    </>
  );
};

export default BankItem;
