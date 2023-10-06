<template>
  <div :class="{ 'dark': darkMode }"
    class="bg-rgb-bg duration-200 bg-center dark:bg-transparent bg-cover dark:bg-main-bg h-screen flex flex-col justify-center items-center font-jost">
    <header
      class="fixed justify-between dark:bg-rgb-bg dark:bg-cover bg-center md:h-16 flex items-center top-0 bg-black w-full h-12">
      <img class="w-14 md:w-16" src="@/assets/logo.png" alt="Logo" />
      <button @click="toggleDarkMode" class="text-white ml-2 w-auto mr-2 h-auto">
        <img src="@/assets/dark.png" class="w-7 md:w-9" alt="">
      </button>
    </header>
    <div class="text-center w-full px-10 md:px-32 lg:px-64 xl:px-80 2xl:container">
      <div class="mb-6 dark:bg-rgb-bg dark:bg-clip-text dark:bg-center dark:bg-cover dark:text-transparent">
        <h2 class="text-3xl md:text-4xl xl:text-5xl mb-6 font-bold ">Selecione o ano que você nasceu</h2>
        <input
          class="bg-transparent dark:bg-cover md:text-3xl xl:text-4xl text-main dark:bg-rgb-bg dark:bg-center outline-none border-2 p-2 rounded-md py-3 border-main w-5/6 px-10 text-2xl"
          v-model="birthDateTime" type="date" @input="handleInputChange" />
      </div>
      <div
        class="text-xl md:text-2xl xl:text-3xl dark:bg-cover font-medium dark:bg-rgb-bg px-6 md:px-12 dark:bg-clip-text dark:bg-center dark:text-transparent">
        <p class="font-bold text-2xl md:text-3xl xl:text-4xl pb-2 mt-2">Você existe há:</p>
        <p class="border-b border-main pb-2 mt-6">Existência em anos: {{ resultYears }}</p>
        <div class="dark:bg-rgb-bg dark:bg-cover dark:bg-left dark:h-0.5 dark:w-full"></div>
        <p class="border-b border-main pb-2 mt-6">Existência em meses: {{ resultMonths }}</p>
        <div class="dark:bg-rgb-bg dark:bg-cover dark:bg-left dark:h-0.5 dark:w-full"></div>
        <p class="border-b border-main pb-2 mt-6">Existência em dias: {{ resultDays }}</p>
        <div class="dark:bg-rgb-bg dark:bg-cover dark:bg-left dark:h-0.5 dark:w-full"></div>
      </div>
    </div>
    <footer
      class="fixed bottom-0 md:h-12 h-8 flex dark:bg-rgb-bg dark:bg-cover dark:bg-center bg-main items-center justify-center w-full">
      <p class="text-xs bg-center md:text-base text-white">© 2023 - Kohako. Todos os direitos reservados</p>
    </footer>
  </div>
</template>

<script lang="ts">

import { ref, watch, onMounted } from 'vue';
import {
  differenceInCalendarDays,
  differenceInMonths,
  parse,
} from 'date-fns';

export default {
  name: 'AgeCalculator',
  setup() {
    const birthDateTime = ref<string>('');
    const currentDate = ref(new Date());
    const resultYears = ref<number | ''>('');
    const resultMonths = ref<number | ''>('');
    const resultDays = ref<number | ''>('');
    const darkMode = ref<boolean>(
      localStorage.getItem("darkMode") === "true"
    );

    const handleInputChange = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      birthDateTime.value = value;
    };

    const calculateAge = () => {
      if (birthDateTime.value) {
        const birthDate = parse(birthDateTime.value, 'yyyy-MM-dd', new Date());

        const years = differenceInCalendarDays(currentDate.value, birthDate) / 365;
        const months = differenceInMonths(currentDate.value, birthDate);
        const days = differenceInCalendarDays(currentDate.value, birthDate);

        resultYears.value = Math.floor(years).toString();
        resultMonths.value = months.toString();
        resultDays.value = days.toString();
      } else {
        resultYears.value = '';
        resultMonths.value = '';
        resultDays.value = '';
      }
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    watch(darkMode, (newValue) => {
      // Atualiza o localStorage diretamente
      localStorage.setItem("darkMode", newValue.toString());

      // Aplica as classes de tema com base no valor atualizado
      if (newValue) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    });

  onMounted(() => {
      if (darkMode.value) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      }
    });

    watch(birthDateTime, calculateAge);

    return {
      birthDateTime,
      handleInputChange,
      resultYears,
      resultMonths,
      resultDays,
      darkMode,
      toggleDarkMode,
    };
  },
};

</script>
