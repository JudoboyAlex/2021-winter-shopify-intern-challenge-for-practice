import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from "material-ui-search-bar";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

  const handleChange = (e) => {
    setMovieTitle(e.target.value.toLowerCase());
    console.log(e.target.value);
  } 

  useEffect(()=>{
    const fetchData = async() => {
      console.log("yo " + movieTitle)
      const result = await axios(
      `http://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=${process.env.REACT_APP_API_KEY}`,
    );
    
    if (movieTitle.length > 2) {
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

  return (
    <div>
      <h3>Movie Title</h3>
      <form>
        <input
        value={movieTitle}
        onChange={handleChange}
        type="text"
        placeholder="Search By Name" 
        />
      </form>
    </div>
  );
}

export default App;