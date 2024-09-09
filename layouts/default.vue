<template>
    <v-card>
      <v-layout>
        <v-app-bar color="secondary" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          />

          <v-toolbar-title>
            Student Database Management System
          </v-toolbar-title>

          <v-spacer/>
  
          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"/>
  
            <v-btn icon="mdi-filter" variant="text"/>
          </template>
  
          <v-btn icon="mdi-dots-vertical" variant="text"/>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmail.com" title="Sandra Adams" />
        </v-list>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account-multiple" title="Student" @click="navigateTo('/student')" />
          <v-list-item prepend-icon="mdi-account-multiple" title="Staff" @click="navigateTo('/staff')" />
          <v-list-item prepend-icon="mdi-checkbox-marked" title="Attendance" @click="navigateTo('/attendance')" />
          <v-list-item prepend-icon="mdi-school" title="Grade" @click="navigateTo('/grade')" />
          <v-list-item prepend-icon="mdi-calendar-multiple" title="Routine" @click="navigateTo('/routine')" />
          <v-list-item prepend-icon="mdi-book-multiple" title="Homework" @click="navigateTo('/homework')" />
          <v-list-item prepend-icon="mdi-exit-run" title="Exam" @click="navigateTo('/exam')" />
          <v-list-item prepend-icon="mdi-archive" title="Inventory" @click="navigateTo('/inventory')" />
          <v-list-item prepend-icon="mdi-book-plus-multiple" title="Library" @click="navigateTo('/library')" />
        </v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 100vh">
            <NuxtPage/>
        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        drawer: false,
        group: null,
        items: [
          {
            title: 'Foo',
            value: 'foo',
          },
          {
            title: 'Bar',
            value: 'bar',
          },
          {
            title: 'Fizz',
            value: 'fizz',
          },
          {
            title: 'Buzz',
            value: 'buzz',
          },
        ],
      }),
  
      watch: {
        group() {
          this.drawer = false
        },
      },
    }
  </script>
  