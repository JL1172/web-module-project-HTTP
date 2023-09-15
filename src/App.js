import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import { addMv, deleteMv, getMovies } from "./components/actions/axiosActions";
import EditMovieForm from "./components/EditMovieForm";

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

  const deleteMovie = (id) => {
    deleteMv(id).then(()=> {
      fetchMovies();
    })
  }

  const addToFavorites = (movie) => {
    addMv();
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
            <Route path="movies/edit/:id" element = {<EditMovieForm/>} />

            <Route path="movies/:id" element ={< Movie/>} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
