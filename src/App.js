import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import { addMv, deleteMv, getMovies } from "./components/actions/axiosActions";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

   const fetchMovies = () => {
    getMovies()
    .then(res=> {
      setMovies(res.data)
    })
  }

  const deleteMovie = (id,handler) => {
    deleteMv(id).then(()=> {
      handler();
      fetchMovies();
    })
  }

  const addMovie = (movieObject) => {
    addMv(movieObject).then(()=> {
      fetchMovies(); 
    });
  }

  const favorite = (id) => {
    const filteredList = movies.filter(n=> n.id === id); 
    const checker = favoriteMovies.filter(n => n.id === id); 
    if (checker && checker.length > 0) {
      return;
    } else {
    setFavoriteMovies([...favoriteMovies, ...filteredList])
    }
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" element = {<EditMovieForm fetchMovies = {fetchMovies}/>} />
            
            <Route path="movies/add" element = {< AddMovieForm addMovie = {addMovie} fetchMovies = {fetchMovies}/>} />

            <Route path="movies/:id" element ={< Movie deleteMovie = {deleteMovie} favorite = {favorite} />} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
