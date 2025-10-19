<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useProgramaStore } from '@/stores/programa';
  const programaStore = useProgramaStore();

  const props = defineProps({
    programaId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await programaStore.getProgramaDetail(props.programaId);
  });
</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${programaStore.currentPrograma.poster_path}`"
        :alt="programaStore.currentPrograma.name"
      />

      <div class="details">
        <h1>Programa: {{ programaStore.currentPrograma.name }}</h1>
        <p>{{ programaStore.currentPrograma.tagline }}</p>
        <p>{{ programaStore.currentPrograma.overview }}</p>
        <p>Orçamento: ${{ programaStore.currentPrograma.budget }}</p>
        <p>Avaliação: {{ programaStore.currentPrograma.vote_average }}</p>
      </div>
    </div>
  </div>

  <p>Produtoras</p>
  <div class="companies">
    <template
      v-for="company in programaStore.currentPrograma.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>

<style scoped>
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
</style>