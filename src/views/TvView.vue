<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre';
  import { useRouter } from 'vue-router'

const router = useRouter()


function openPrograma(programaId) {
  router.push({ name: 'ProgramaDetails', params: { programaId } });
}

  const genreStore = useGenreStore();

  const isLoading = ref(false);

  //const genres = ref([]);
  const programas = ref([]);
   //const getGenreName = (id) => genres.value.find((genre) => genre.id === id)?.name ?? ''

   const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

    onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');             
    isLoading.value = false;
  });

  const listProgramas = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  programas.value = response.data.results;
  isLoading.value = false;
};

</script>

<template>

  <h1>Programas de TV</h1>
   <ul class="genre-list">
       <li
    v-for="genre in genreStore.genres"
    :key="genre.id"
    @click="listProgramas(genre.id)"
    class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }"

  >
    {{ genre.name }}
  </li>

  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="programa-list">

    <div v-for ="programa in programas" :key ="programa.id" class="programa-card">
        <img
  :src="`https://image.tmdb.org/t/p/w500${programa.poster_path}`"
  :alt="programa.name"
  @click="openPrograma(programa.id)"
/>

      <div class="programa-details">
        <p class="programa-name">{{ programa.name }}</p>
       <p class="programa-release-date">{{ formatDate(programa.first_air_date) }}</p>
        <p class="programa-genres">
  <span
  v-for="genre_id in programa.genre_ids"
  :key="genre_id"
  @click="listProgramas(genre_id)"
  :class="{ active: genre_id === genreStore.currentGenreId }"
>
  {{ genreStore.getGenreName(genre_id) }}
</span>
</p>
      </div>

    </div>

  </div>

</template>

<style scoped>
  .genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}
.programa-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.programa-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.programa-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.programa-details {
  padding: 0 0.5rem;
}

.programa-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.programa-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.programa-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.programa-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.programa-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>