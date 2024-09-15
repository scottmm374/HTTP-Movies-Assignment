import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => {
        console.log("movie deleted", res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("movie not deleted", err.message);
      });
  };

  render() {
    console.log("Movie state", this.state.movie);
    console.log("Movie props", this.props);
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Link to={`/update-movie/${this.state.movie.id}`}>
          <button>Edit</button>
        </Link>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={e => this.deleteMovie(e)}>Delete</button>
      </div>
    );
  }
}
