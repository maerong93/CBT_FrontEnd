import React,{useEffect,useState,useCallback} from "react";
import BankItem from "./bankItem";
import Exam from "../../api/exam/exam";
import styles from "../cardContainer/cardContainer.module.css";
import BankListStarp from "./bankListStarp";
import configDate from "../../config/config.json";
import axios from "axios";

const BankList = ({fxsetdelFinishedExam,fxsetAddFinishedExam,type,btnType,open,searchList,searchCheck,addedExamList,examTitle,sei_id ,addFinishedExam,dataChanged,setDataChanged}) => {
  const formdata = new FormData();
  const myHeaders = new Headers();
  const exam1 = new Exam(myHeaders,formdata);
  const [examList1, setExamList] = useState([]); 
  //const [dataChanged, setDataChanged] = useState(0);
  const [examAdd, setExamAdd] = useState([]);
  //const [addFinishedExam, setAddFinishedExam] = useState([]);
  const [examList2, setExamList2] = useState([]);
  
  useEffect(() =>{  // 종료된 시험 list 불러오기

    fetch(`${configDate.API_URL}/manage/showBank`,{method: 'GET',redirect:'follow'})
    .then(res => res.json())
    .then(res =>{
      setExamList(res)});

  },[]);
  const [registExam,setRegistExam] = useState([]);
  useEffect(() => {    
    setExamAdd(JSON.parse(window.localStorage.getItem('examAdd')));    
  }, []);

  // useEffect(() => {
  //   const fetchitemlist = async () => {
  //     const result = await axios.get(`${configDate.API_URL}/manage/itemlist?sid=${sei_id}`);
  //     console.log('data : ',result.data);
  //     setAddFinishedExam([...result.data]);
  //   }
  //   fetchitemlist();
    
  // },[dataChanged])
  
  //let fxsetAddFinishedExam = () => setDataChanged(dataChanged+1);

  return (
    <>
      <div className={`${styles.cardTitle} bank_card_title`}>
        {type === "검색 결과" ? (
          <span>{type}</span>
        ) : (
          <>
            <span>{type}</span>
            <p>{addFinishedExam.length}&nbsp;/&nbsp;80</p>
          </>
        )}
      </div>

      <BankListStarp type={type} />
      <div className="card-body scroll-wrapper">
        <ul className="bank_list">
          {
            // type =="검색 결과"
            // ?
              searchCheck == false
              ?
              examList1.map((exam,index)=> {
                  return <BankItem  key={index}
                                    exam={exam}
                                    examList1={examList1} 
                                    index={index}
                                    type={type}
                                    btnType={btnType} 
                                    open={open}
                                    sei_id={sei_id}
                                    registExam={registExam} 
                                    setExamAdd={setExamAdd}
                                    addFinishedExam={addFinishedExam}
                                    fxsetAddFinishedExam={fxsetAddFinishedExam}
                                    fxsetdelFinishedExam={fxsetdelFinishedExam}
                                    //setAddFinishedExam={setAddFinishedExam}
                                    setRegistExam={setRegistExam}
                  />
              })
              :
              searchList.map((exam,index)=> {
                    return <BankItem key={index} 
                    exam={exam} 
                    btnType={btnType} 
                    fxsetAddFinishedExam={fxsetAddFinishedExam} 
                    fxsetdelFinishedExam={fxsetdelFinishedExam}
                    sei_id={sei_id} 
                    open={open}/>
              
              })
          //   : addFinishedExam.map((exam,index) => (
          //           <BankItem key={index} registExam={registExam} 
          //                             examList1={examList1}
          //                             setRegistExam={setRegistExam}
          //                             fxsetAddFinishedExam={fxsetAddFinishedExam}
          //                             setExamAdd={setExamAdd}
          //                             examTitle={examTitle}
          //                             addFinishedExam={addFinishedExam}
          //                             sei_id={sei_id}
          //                             type={type}
          //                             exam={exam} 
          //                             index={index}
                                      
          //           />
          //   ))
              
          // }
          
          }

          {/* <BankItem btnType={btnType} open={open} />
          <BankItem btnType={btnType} open={open} /> */}
        </ul>
      </div>
    </>
  );
};

export default BankList;
