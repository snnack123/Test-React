import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../App.css';

function Table_data() {
    const data = useSelector((state) => state.users.data);
    const [users, setUsers] = useState(data);
    const [dataLoaded, setDataLoaded] = useState(0);

    useEffect(() => {
        if (data) {
            setUsers(data);
            setDataLoaded(1);
        }
    }, [data])

    function sort() {
        let new_data = [...users].sort((a, b) => a.email.localeCompare(b.email));
        setUsers(new_data);
        document.getElementById('data_sort').style.display = 'none';
        document.getElementById('cancel_sort').style.display = 'inline-block';
    }

    function cancel() {
        document.getElementById('data_sort').style.display = 'inline-block';
        document.getElementById('cancel_sort').style.display = 'none';
        setUsers(data);
    }

    return (
        <div className='container mt-5'>
            {dataLoaded === 0 ? 
                <div id="loading" className='alert alert-warning'>Loading data...</div>
            : users ? <div>
                <div className='mb-5'>
                    <Button className='btn btn-primary btn-lg' id='data_sort' onClick={sort}>Alphabetical Sort</Button>
                    <Button className='btn btn-secondary btn-lg' id='cancel_sort' onClick={cancel}>Cancel Sort</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Year of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.birthYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div> 
            : 
            <div className="alert alert-danger">
                Datele nu au putut fi preluate
            </div>}
    </div>
    )
}

export default Table_data