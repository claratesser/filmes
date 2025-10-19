import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useProgramaStore = defineStore('programa', () => {
  const state = reactive({
    currentPrograma: {},
  });

  const currentPrograma = computed(() => state.currentPrograma);

  const getProgramaDetail = async (programaId) => {
    const response = await api.get(`movie/${programaId}`);
    state.currentPrograma = response.data;
  };

  return { currentPrograma, getProgramaDetail };
});