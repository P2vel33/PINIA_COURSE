import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
const api = import.meta.env.VITE_API_KEY;

const url = `https:api.themoviedb.org/3/search/movie?api_key=${api}&query=`;

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    loader: false,
    movies: [],
  }),
  actions: {
    async getMovies(search) {
      this.loader = true;
      const res = await fetch(`${url}${search}`);
      const data = await res.json();
      this.movies = data.results;
      this.loader = false;
      //   console.log(data);
    },
    addToUserMovies(object) {
      const movieStore = useMovieStore();
      movieStore.movies.push({ ...object, isWatched: false });
      movieStore.activeTab = 1;
      //   console.log(object);
      //   console.log(object.id);
    },
  },
});
