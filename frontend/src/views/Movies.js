import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

function Movies() {
    const [movies, setMovies] = useState('null');
    const [dataLoaded, setDataLoaded] = useState(0);

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows')
            .then(res => res.json()
            .then(res => {
                setMovies(res);
                setDataLoaded(1);
            })).catch(() => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('error_msg').style.display = 'inline-block';
            })
    }, [])

    return (
      <div className="container mt-5">
        {dataLoaded === 0 ? 
          <div id="loading" className='alert alert-warning'>Loading data...</div>
         : movies[0] ? 
          <div>
            <h1 style={{ textAlign: "center" }}>Movies List</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Language</th>
                  <th>Runtime</th>
                  <th>Average Runtime</th>
                  <th>Premiered</th>
                  <th>Ended</th>
                  <th>Rating</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie.id}</td>
                    <td>{movie.name}</td>
                    <td>{movie.language}</td>
                    <td>{movie.runtime} min</td>
                    <td>{movie.averageRuntime} min</td>
                    <td>{movie.premiered}</td>
                    <td>{movie.ended}</td>
                    <td>{movie.rating.average}</td>
                    <td>{movie.url}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
         : 
          <div className="alert alert-danger">
            Datele nu au putut fi preluate
          </div>
        }
        <div className="alert alert-danger" id='error_msg' style={{display: 'none'}}>
            Datele nu au putut fi preluate
          </div>
      </div>
    );
}

export default Movies