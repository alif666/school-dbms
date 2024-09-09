<template>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-multiple">
        <NuxtLink to="/student">Student</NuxtLink>
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
      <!-- Add other navigation items similarly -->
    </v-list>
  </template>
  