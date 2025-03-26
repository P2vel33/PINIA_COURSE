import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
const api = import.meta.env.VITE_API_KEY;

const url = `https:api.themoviedb.org/3/search/movie?api_key=${api}&query=`;

// export const useSearchStore = defineStore("searchStore", {
//   state: () => ({
//     loader: false,
//     movies: [],
//   }),
//   actions: {
//     async getMovies(search) {
//       this.loader = true;
//       const res = await fetch(`${url}${search}`);
//       const data = await res.json();
//       this.movies = data.results;
//       this.loader = false;
//       //   console.log(data);
//     },
//     addToUserMovies(object) {
//       const movieStore = useMovieStore();
//       movieStore.movies.push({ ...object, isWatched: false });
//       movieStore.activeTab = 1;
//       //   console.log(object);
//       //   console.log(object.id);
//     },
//   },
// });

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search) => {
    try {
      loader.value = true;
      const res = await fetch(`${url}${search}`);
      const data = await res.json();
      movies.value = data.results;
    } catch (error) {
      console.log(error);
    } finally {
      loader.value = false;
    }
  };

  const addToUserMovies = (object) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...object, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});
