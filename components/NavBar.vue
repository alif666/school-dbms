<template>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-multiple">
        <NuxtLink to="/students">Student</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple">
        <NuxtLink to="/staff">Staff</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/grade">Grade</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/routine">Routine</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/homework">Homework</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/Exam">Exan</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/inventory">Inventory</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/library">Library</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked">
        <NuxtLink to="/attendance">Attendance</NuxtLink>
      </v-list-item>
    <!-- Logout Button -->
    <v-list-item prepend-icon="mdi-exit-run">
      <button @click="logout">Sign Out</button>
    </v-list-item>
      <!-- Add other navigation items similarly -->
    </v-list>
  </template>
<script setup>
import { useRouter } from 'vue-router'
import { useCookie } from '@vueuse/integrations/useCookie'

const user = useCookie<{ name: string }>('user')
const router = useRouter()

const logout = () => {
  user.value = null
  router.push('/') // Redirect to the login page after logout
}
</script>