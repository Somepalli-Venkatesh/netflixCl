import React from "react";

const PlayCard = ({ movie, trailer, showTrailer, setShowTrailer }) => {
  // Display message when no movie is selected
  if (!movie) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Select a movie to view its details.
      </div>
    );
  }

  // Handle Play button click: Toggle trailer modal
  const handlePlayClick = () => {
    setShowTrailer(!showTrailer); // Toggle the visibility of trailer modal
  };

  return (
    <div className="relative bg-gray-800 text-white rounded w-full h-screen">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className="w-full h-screen object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-gray-900/70 via-gray-900/50 to-transparent">
        <h3 className="text-3xl font-bold">{movie.title}</h3>

        {/* Movie Overview */}
        <p className="mt-6 text-lg text-opacity-80 leading-relaxed">
          {movie.overview || "No description available."}
        </p>

        <div className="mt-6 flex gap-4 items-center">
          {/* Play Button: Trigger trailer modal */}
          <button
            className="flex items-center gap-2 px-6 py-2 bg-white text-black text-lg font-bold rounded hover:opacity-90 transition"
            onClick={handlePlayClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-6 h-6"
            >
              <path d="M6.79 11.093l5.256-3.07a.5.5 0 0 0 0-.858L6.79 4.095A.5.5 0 0 0 6 4.498v6.004a.5.5 0 0 0 .79.591z" />
            </svg>
            {showTrailer ? "Hide Trailer" : "Play"} {/* Toggle text based on trailer state */}
          </button>

          {/* More Info Button */}
          <button
            className="flex items-center gap-2 px-6 py-2 bg-white text-black text-lg font-bold rounded hover:opacity-90 transition"
            title="More Info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M8 3a.5.5 0 0 1 .5.5v5h4a.5.5 0 0 1 0 1h-4v4a.5.5 0 0 1-1 0v-4H3.5a.5.5 0 0 1 0-1H7.5v-5A.5.5 0 0 1 8 3z"
              />
            </svg>
            My List
          </button>
        </div>

        {/* Trailer Modal: Show trailer when `showTrailer` is true */}
        {showTrailer && trailer && (
          <div className="mt-4">
            <iframe
              width="100%"
              height="315"
              src={trailer} // No autoplay query here
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayCard;
