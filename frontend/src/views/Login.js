import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { globalRequestParameters, url } from '../utils';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function test_login() {
        let check_loggedIn = localStorage.getItem('is_logged_in');
        if (check_loggedIn) {
            let token = JSON.parse(check_loggedIn)
            let requestParam = globalRequestParameters;
            requestParam.method = 'POST';
            requestParam.headers.Authorization = JSON.stringify(token);
            fetch(url + 'check', requestParam)
                .then(res => res.json()
                    .then(res => {
                        if (res.loggedIn === true) {
                            dispatch({ type: 'isLoggedIn' });
                            navigate('/form');
                        } else {
                            login();
                        }
                    })
                )
        } else {
            login();
        }
    }

    function login() {
        let login = { msg: true };
        let requestParameters = globalRequestParameters;
        requestParameters.method = 'POST';
        requestParameters.body = JSON.stringify(login);
        fetch(url + 'login', requestParameters)
            .then(res => res.json()
                .then((res) => {
                    dispatch({ type: 'loggedIn', payload: res.is_logged_in })
                    navigate('/form');
                })
            )
    }

    return (
        <div className='container'>
            <h1>Login page</h1>
            <Button type="button" className="btn btn-success" onClick={test_login}>Login</Button>
        </div>
    )
}

export default Login