<template>
    <div>
      <h1 class="text-uppercase text-center">{{ pageTitle }}</h1>
      <div class="text-uppercase text-center">{{ pageContent }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  // Reactive reference to store page data
  const pageTitle = ref('');
  const pageContent = ref('');
  
  // Use the useRoute hook to get the current route parameters
  const route = useRoute();
  
  // Function to fetch data based on the page parameter
  const fetchPageData = async (page) => {
    // Simulate fetching data based on the page parameter
    // Replace this with actual data fetching logic
    switch (page) {
      case page:
        pageTitle.value = page;
        pageContent.value = 'In Progress';
        break;
      // Add more cases as needed
      default:
        pageTitle.value = 'Page Not Found';
        pageContent.value = 'The page you are looking for does not exist.';
        break;
    }
  };
  
  // Fetch data when the component is mounted
  onMounted(() => {
    const page = route.params.page;
    fetchPageData(page);
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  