<template>
    <div :class="{ 'alternate-layout': isSmallScreen }">
      <header>
        <h1>{{ isSmallScreen ? 'Alternate Layout Header' : 'Default Layout Header' }}</h1>
      </header>
      <NuxtPage />
      <footer>
        <p>{{ isSmallScreen ? 'Alternate Layout Footer' : 'Default Layout Footer' }}</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const isSmallScreen = ref(false);
  
  const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth <= 600;
  };
  
  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  
  </script>
  
  <style scoped>
  /* Styles for small screens */
  @media (max-width: 600px) {
    .alternate-layout {
      display: block;
    }
  }
  
  /* Default styles */
  .alternate-layout {
    display: none;
  }
  </style>
  