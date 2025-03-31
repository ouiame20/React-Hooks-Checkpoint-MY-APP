import React, { useState } from 'react';

// Composant MovieCard
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Note: {movie.rating}</p>
    </div>
  );
};

// Composant MovieList
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

// Composant Filtre
const Filtre = ({ filterTitle, filterRating, setFilterTitle, setFilterRating }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtrer par titre"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrer par note"
        value={filterRating}
        onChange={(e) => setFilterRating(e.target.value)}
      />
    </div>
  );
};

// Composant App
const App = () => {
  // État des films
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', description: '', posterURL: '', rating: '' });
  const [filterTitle, setFilterTitle] = useState('');
  const [filterRating, setFilterRating] = useState('');

  // Fonction pour ajouter un film
  const handleAddMovie = () => {
    setMovies([
      ...movies,
      {
        ...newMovie,
        rating: parseFloat(newMovie.rating),
      },
    ]);
    setNewMovie({ title: '', description: '', posterURL: '', rating: '' });
  };

  // Filtrage des films
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      movie.rating >= filterRating
    );
  });

  return (
    <div className="app">
      <h1>Application de Cinéma</h1>

      {/* Formulaire d'ajout de film */}
      <div className="add-movie">
        <input
          type="text"
          placeholder="Titre du film"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de l'affiche"
          value={newMovie.posterURL}
          onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
        />
        <input
          type="number"
          placeholder="Note"
          value={newMovie.rating}
          onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
        />
        <button onClick={handleAddMovie}>Ajouter un film</button>
      </div>

      {/* Filtre */}
      <Filtre
        filterTitle={filterTitle}
        filterRating={filterRating}
        setFilterTitle={setFilterTitle}
        setFilterRating={setFilterRating}
      />

      {/* Liste des films filtrés */}
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
    