import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import { globalRequestParameters, url } from './utils';
import Login from './views/Login';
import Logout from './views/Logout';
import AddUser from './views/AddUser';
import Movies from './views/Movies';
import Table_data from './components/Table_data';
import NavbarMenu from './views/NavbarMenu';


function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.data);
  const is_logged_in = useSelector((state) => state.users.is_logged_in);
  const [loggedIn, setLoggedIn] = useState(false);
  const [finishedCheking, setFinishedChecking] = useState(false);

  useEffect(() => {
    if (!data.length) {
      let requestParameters = globalRequestParameters;
      fetch(url + 'users', requestParameters)
        .then(res => res.json()
          .then(res => {
            if (res.message) {
              dispatch({ type: 'setUsers', payload: res.data })
            }
          })
        )
    }

    if (localStorage.getItem('is_logged_in')) {
      check_data()
    } else {
      setFinishedChecking(true);
    }

  }, [])

  async function check_data() {
    let check_loggedIn = JSON.parse(localStorage.getItem('is_logged_in'));
    let requestParam = globalRequestParameters;
    requestParam.method = 'POST';
    requestParam.headers.Authorization = JSON.stringify(check_loggedIn);

    let fetch_data = await fetch(url + 'check', requestParam)
    const data = await fetch_data.json();

    if (data.loggedIn === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setFinishedChecking(true);
  }

  return (
    <div>
      <NavbarMenu />
      {finishedCheking === false ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : loggedIn === true || is_logged_in === true ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<Table_data />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/form" element={<AddUser />} />
            <Route exact path="/movies" element={<Movies />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Table_data />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route
              exact
              path="/form"
              element={<Navigate replace to="/login" />}
            />
            <Route exact path="/movies" element={<Movies />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
