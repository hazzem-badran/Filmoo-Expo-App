export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  // console.log("data",data);
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const fetchLovedMovies = async (): Promise<MovieDetails[]> => {  
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/account/{account_id}/favorite/movies?api_key=${TMDB_CONFIG.API_KEY}&language=en-US&sort_by=created_at.asc`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed to fetch loved movies", response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error)
    throw error;
  }
}