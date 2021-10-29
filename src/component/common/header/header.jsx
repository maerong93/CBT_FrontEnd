import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = React.memo((props) => {
    const history = useHistory();
    const logOut = () => {
        sessionStorage.removeItem('loginState');
        history.push('/');
    };
    return(
        <header>
            <span></span>
            <h4>CBT 문제관리</h4>
            <span onClick={logOut}>로그아웃</span>
        </header>
    );
});

export default Header;