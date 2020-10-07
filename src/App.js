import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from "material-ui-search-bar";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  console.log(process.env.REACT_APP_API_KEY)
  const handleChange = (e) => {
    setMovieTitle(e.target.value.toLowerCase());
    console.log(e.target.value);
  } 

  useEffect(()=>{
    const fetchData = async() => {
      const result = await axios(
      `http://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=${process.env.REACT_APP_API_KEY}`,
    );
    
    if (movieTitle.length > 0) {
      const searchResult = result.data.Search.filter(movies =>
        movies.Title.toLowerCase().includes(movieTitle) 
      )
      setMovieData(searchResult)
    } else {
      setMovieData(result.data.Search)
    }
  }
    fetchData();
  },[movieTitle])

  console.log(movieData)
  return (
    <div>
    <h3>Movie Title</h3>
    <SearchBar
    value={movieTitle}
    onChange={handleChange}
    // onRequestSearch={() => doSomethingWith(this.state.value)}
  />

    </div>
  );
}

export default App;