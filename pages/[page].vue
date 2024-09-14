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
    case 'home':
      pageTitle.value = 'Home Page';
      pageContent.value = 'Welcome to the Home Page.';
      break;
    case 'about':
      pageTitle.value = 'About Us';
      pageContent.value = 'Learn more about us on this page.';
      break;
    case 'contact':
      pageTitle.value = 'Contact Us';
      pageContent.value = 'Get in touch with us!';
      break;
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
