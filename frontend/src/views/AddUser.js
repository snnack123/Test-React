import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { globalRequestParameters, url } from '../utils';

function AddUser() {
    const [email, setEmail] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const dispacth = useDispatch();
    const navigate = useNavigate();

    function addUser(e) {
        let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        e.preventDefault();
        if(email === "" || birthYear === "") {
            document.getElementById('error').innerHTML = 'Toate campurile sunt obligatorii!';
            document.getElementById('error').style.display = 'inline-block';
        } else if (!email.match(emailRegEx)) {
            document.getElementById('error').innerHTML = 'Adresa de mail nu este corecta!';
            document.getElementById('error').style.display = 'inline-block';
        } else if (!(birthYear >= new Date().getFullYear() - 100 && birthYear <= new Date().getFullYear())) {
            document.getElementById('error').innerHTML = 'Data nasterii invalida!';
            document.getElementById('error').style.display = 'inline-block';
        } else {
            document.getElementById('error').style.display = 'none';
            let data = JSON.parse(window.localStorage.getItem('data')) || [];
            let new_user = {
                email: email,
                birthYear: birthYear
            }
            data.push(new_user);

            let requestParameters = globalRequestParameters;
            requestParameters.method = 'POST';
            requestParameters.body = JSON.stringify(new_user);
            fetch(url + 'user', requestParameters)
                .then(res => res.json()
                    .then(res => {
                        if (res._id) {
                            new_user._id = res._id;
                            dispacth({ type: 'addUser', payload: new_user });
                            localStorage.setItem('data', JSON.stringify(data));
                            navigate('/');
                        }
                    })
                )
        }
    }

    return (
        <div>
            <div className='container mt-5' style={{ width: '350px' }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' id='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='birthYear' className='form-label'>Year of Birth</label>
                        <input type='number' id='birthYear' className='form-control' value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <Button className='btn btn-success' onClick={addUser}>Send</Button>
                    </div>
                </form>
                <div className="alert alert-danger" id='error'>
                    Datele sunt completate gresit!
                </div>
            </div>
        </div>
    )
}

export default AddUser