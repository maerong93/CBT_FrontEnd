import React,{useEffect,useState,useCallback} from "react";
import BankItem from "./bankItem";
import Exam from "../../api/exam/exam";
import styles from "../cardContainer/cardContainer.module.css";
import BankListStarp from "./bankListStarp";
import configDate from "../../config/config.json";
import axios from "axios";

const BankList1 = ({fxsetdelFinishedExam,fxsetAddFinishedExam,type,btnType,open,searchList,searchCheck,addedExamList,addFinishedExam,examTitle,sei_id,dataChanged,setDataChanged}) => {
  const formdata = new FormData();
  const myHeaders = new Headers();
  const exam1 = new Exam(myHeaders,formdata);
  //const [dataChanged, setDataChanged] = useState(0);
  //const [addFinishedExam, setAddFinishedExam] = useState([]);
  const [registExam,setRegistExam] = useState([]);

 
  return (
    <>
      <div className={`${styles.cardTitle} bank_card_title`}>          
        <span>{type}</span>
        <p>{addFinishedExam.length}&nbsp;/&nbsp;80</p>
      </div>

      <BankListStarp type={type} />
      <div className="card-body scroll-wrapper">
        <ul className="bank_list">

        {
            addFinishedExam.map((exam,index) => (
                    <BankItem key={index} registExam={registExam} 
                                      open={open}
                                      setRegistExam={setRegistExam}
                                      fxsetAddFinishedExam={fxsetAddFinishedExam}
                                      fxsetdelFinishedExam={fxsetdelFinishedExam}
                                      examTitle={examTitle}
                                      addFinishedExam={addFinishedExam}
                                      sei_id={sei_id}
                                      type={type}
                                      exam={exam} 
                                      index={index}
                    />
            ))
              
        }
        </ul>

        
        
      </div>
      
    </>
    
  );
};

export default BankList1;
