import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PlayCard from "./PlayCard";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

const Movies = ({ userEmail, onLogout }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // For navigation

  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWJhYjZiZmUyNDg2ZTMyMThjOThkMmJjYjYwYjdlMSIsIm5iZiI6MTczNjk0NDEzNi42ODQsInN1YiI6IjY3ODdhYTA4NjAxYWNmZTdiZDRmYWQwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxGh0o0_1zzzMAi1s1Q5KY0-SVe5Qc4fgpAvhm96wSs",
      },
    };

    try {
      const [trending, nowPlaying, popular, upcoming] = await Promise.all([
        fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options
        ).then((res) => res.json()),
        fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        ).then((res) => res.json()),
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        ).then((res) => res.json()),
        fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          options
        ).then((res) => res.json()),
      ]);

      setTrendingMovies(trending.results || []);
      setNowPlayingMovies(nowPlaying.results || []);
      setPopularMovies(popular.results || []);
      setUpcomingMovies(upcoming.results || []);

      if (trending.results && trending.results.length > 0) {
        const defaultMovie = trending.results[0];
        setSelectedMovie(defaultMovie);
        fetchTrailer(defaultMovie.id);
      }
    } catch {
      setError("An error occurred while fetching the data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrailer = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWJhYjZiZmUyNDg2ZTMyMThjOThkMmJjYjYwYjdlMSIsIm5iZiI6MTczNjk0NDEzNi42ODQsInN1YiI6IjY3ODdhYTA4NjAxYWNmZTdiZDRmYWQwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxGh0o0_1zzzMAi1s1Q5KY0-SVe5Qc4fgpAvhm96wSs",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const data = await response.json();

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setSelectedTrailer(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
    } catch {
      setSelectedTrailer(null);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
    fetchTrailer(movie.id);
  };

  const renderMovieSection = (title, movies) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        navigation
        modules={[Navigation]}
        className="movie-carousel"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative group bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm">{movie.release_date}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="p-6 bg-black min-h-screen">
      <div>
        <div className="d-flex justify-content-end mb-4 ">
          <NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item>{userEmail}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
        <PlayCard
          movie={selectedMovie}
          trailer={selectedTrailer}
          showTrailer={showTrailer}
          setShowTrailer={setShowTrailer}
        />
      </div>
      {renderMovieSection("Trending", trendingMovies)}
      {renderMovieSection("Now Playing", nowPlayingMovies)}
      {renderMovieSection("Popular Movies", popularMovies)}
      {renderMovieSection("Upcoming Movies", upcomingMovies)}

      {/* Modal for Trailer */}
      <Modal
        show={showTrailer}
        onHide={() => setShowTrailer(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrailer ? (
            <iframe
              width="100%"
              height="400"
              src={selectedTrailer}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-center">Trailer not available</div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Movies;
