import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { globalRequestParameters, url } from '../utils';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function logout() {
        let login = { msg: false };
        let requestParameters = globalRequestParameters;
        requestParameters.method = 'POST';
        requestParameters.body = JSON.stringify(login);
        fetch(url + 'login', requestParameters)
            .then(res => res.json()
                .then(res => {
                    dispatch({ type: 'loggedOut', payload: res.is_logged_in })
                    navigate('/');
                })
            )
    }

    return (
        <div className='container'>
            <h1>Logout page</h1>
            <Button type="button" className="btn btn-primary" onClick={logout}>Logout</Button>
        </div>
    )
}

export default Logout