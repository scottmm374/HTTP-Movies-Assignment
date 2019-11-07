import React, { useState, useEffect } from "react";
import axios from "axios";
import { importDefaultSpecifier } from "@babel/types";

function UpdateMovie(props) {
  const [movieUpdate, setMovieUpdate] = useState({
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovieUpdate(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleChange = e => {
    setMovieUpdate({
      ...movieUpdate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movieUpdate.id}`, movieUpdate)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => {
        console.log("edit error", err);
      });
    setMovieUpdate({ title: "", director: "", metascore: "", stars: [] });
  };

  console.log("Update", movieUpdate);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={movieUpdate.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="director"
        placeholder="director"
        value={movieUpdate.director}
        onChange={handleChange}
      />
      <input
        type="number"
        name="metascore"
        placeholder="metascore"
        value={movieUpdate.metascore}
        onChange={handleChange}
      />
      <input
        type="text"
        name="stars"
        placeholder="stars"
        value={movieUpdate.stars}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateMovie;
