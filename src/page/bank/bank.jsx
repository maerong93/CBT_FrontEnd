import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import BankList from "../../component/bank/bankList";
import BankList1 from "../../component/bank/bankList1";
import BankModal from "../../component/bank/bankModal";
import BankTitle from "../../component/bank/bankTitle";
import Header from "../../component/common/header/header";
import CheckIcon from "../../component/icon/checkIcon";
import Exam from '../../api/exam/exam';
import ViewIcon from "../../component/icon/viewIcon";
import configDate from "../../config/config.json";
import "./bank.css";
import axios from 'axios';

const Bank = () => {
  const location = useLocation();
  const {sei_id, examClass, examTitle, examDate} = location.state;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchList, setSearchList] = useState([]); // 검색된 시험list
  const [searchCheck,setSearchCheck] = useState(false); //검색버튼 클릭시 true로 변경
  const [addedExamList, setAddedExamList] = useState([]);

  const [addFinishedExam, setAddFinishedExam] = useState([]); //등록된 문제 list
  const [dataSend, setDataSend] = useState([]);

  const [dataChanged, setDataChanged] = useState(0);

  useEffect(() => {
    const fetchitemlist = async () => {
      const result = await axios.get(`${configDate.API_URL}/manage/itemlist?sid=${sei_id}`);
      setAddFinishedExam([...result.data]);
    }
    fetchitemlist();
    
  },[dataChanged])
  
  let fxsetAddFinishedExam = () => setDataChanged(dataChanged+1);
  let fxsetdelFinishedExam = () => setDataChanged(dataChanged-1);


  var formData = new FormData();
  function modalClose() {
    setModalVisible(false);
  }
  function modalOpen(setValue) {
    setModalVisible(true);
    setDataSend(setValue);
    
  }
  function formSubmit(e) {
    e.preventDefault();
    const searchValue = document.getElementById('searchValue').value;
    formData.append('searchValue',searchValue)
    console.log(searchValue);
    // fetch(`${configDate.API_URL}/manage/showBankSearch`,{
    //   method:'POST',
    //   data: {
    //     searchValue:searchValue
    //   }
    // }).then( res => res)
    // .catch( err => console.log(err))
    axios({
      header:{'Content-type': 'application/x-www-form-urlencoded'},
      method:'post',
      url:`${configDate.API_URL}/manage/showBankSearch`,
      data:formData
    })
    .then(res => setSearchList(res.data))
    .catch(err => console.log(err));
  }
  function sendForm(e) {
    setSearchCheck(true);
  }
  const exam = new Exam();
  const showExamList = () => {
      exam.addedExamList(sei_id)
      .then(result => {
          const sortArr = result.sort((a, b) => {
              return a.id - b.id;
          });
          //console.log(sortArr);
          setAddedExamList(sortArr)
      });
  };
  useEffect(() => {
      showExamList();
  }, []);

  return (
    <>
      <Header />
      <section className="bank_container_wrap container-wrap">
        <BankTitle examClass={examClass} examTitle={examTitle} examDate={examDate}/>
        <form className="bank_upper_area" onSubmit={formSubmit}>
          <input type="text" name="searchValue" id="searchValue" placeholder="검색어를 입력하세요" />
          <button type="submit" onClick={sendForm} className="grey-btn bank_search_btn btn">
            검색
          </button>
        </form>
        <div className="bank_container_body">
          <article className="bank_part">
            <article className="bank_card_container card-container">
              <BankList 
              open={modalOpen} 
              btnType="add" 
              addFinishedExam={addFinishedExam}
              type="검색 결과" 
              sei_id={sei_id} 
              searchList={searchList} 
              searchCheck={searchCheck}
              fxsetAddFinishedExam={fxsetAddFinishedExam} 
              fxsetdelFinishedExam={fxsetdelFinishedExam}
              dataChanged={dataChanged}
              setDataChanged={setDataChanged}
              />
            </article>
          </article>

          <article className="bank_part">            
            <article className="bank_card_container card-container">
              <BankList1
                open={modalOpen}
                addedExamList={addedExamList}
                searchList={searchList}
                addFinishedExam={addFinishedExam}
                searchCheck={searchCheck}
                examTitle={examTitle}
                sei_id={sei_id}
                btnType="substract"
                type="등록된 문제"
                fxsetAddFinishedExam={fxsetAddFinishedExam}
                fxsetdelFinishedExam={fxsetdelFinishedExam}
                dataChanged={dataChanged}
                setDataChanged={setDataChanged}
              />
            </article>
            
            <div className="btn-wrap">
              <button type="button" className="btn big__btn">
                <CheckIcon />
                저장하기
              </button>
            </div>
          </article>
        </div>
      </section>
      <BankModal view={modalVisible} close={modalClose} dataSend={dataSend} addFinishedExam={addFinishedExam} />
    </>
  );
}

export default Bank;
