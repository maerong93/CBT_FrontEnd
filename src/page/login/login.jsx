import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import Warning from '../../component/modal/warning/warning';
import styles from './login.module.css';
import LoginService from '../../api/login/LoginService';

const Login = React.memo((props) => {

    const login = new LoginService();

    const history = useHistory();

    const idRef = useRef();
    const pwRef = useRef();

     // 로그인 실패
     const [modalActive, setModalActive] = useState(false);
     const closeModal = () => {
         setModalActive(false);
     };

    // 로그인 체크
    const submit = (event) => {
        event.preventDefault();

        const id = idRef.current.value;
        const pw = pwRef.current.value;

        login.checkLogin(id, pw)
        .then(result => {
            //console.log(result);
            if(result === 1) {
                const ransomStr = Math.random().toString(36).substr(2,11);
                sessionStorage.setItem('loginState', ransomStr);
                return history.push('/examList');
            }
            result === 0 && setModalActive(true);
            
        });
    };

    return (
        <>
            <Warning
            modalActive={modalActive}
            onCloseModal={closeModal}
            text={`아이디 또는 비밀번호가 일치하지 않습니다.`}
            />
            <section className={styles.loginWrap}>
                <h1 className={styles.title}>CBT 문제관리</h1>
                <article className={styles.article}>
                    <form onSubmit={submit}>
                        <h2>로그인</h2>
                        <div className={styles.id}>
                            <label>아이디</label>
                            <input ref={idRef} type="text" placeholder="아이디를 입력해주세요." required />
                        </div>
                        <div className={styles.pw}>
                            <label>비밀번호</label>
                            <input ref={pwRef} type="password" placeholder="비밀번호를 입력해주세요." autoComplete="off" required />
                        </div>
                        <button className="big__btn">로그인</button>
                    </form>
                </article>
            </section>
        </>
    );
});

export default Login;