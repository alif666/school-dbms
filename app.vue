<script setup lang="ts">
import { authenticate } from './store/data-services';
import { useCookie } from 'nuxt/app';
import { ref } from 'vue';

const user = useCookie<{ name: string, password: string }>('user');
const name = ref('');
const password = ref('');
const errorMsg = ref('');
const visible = ref(false); // For password visibility toggle

const login = async () => {
  const data = await authenticate({ email: name.value, password: password.value });
  if (data.length > 0) {
    user.value = { name: name.value, password: password.value };
  } else {
    name.value = '';
    password.value = '';
    errorMsg.value = 'Wrong Email or Password';
  }
};

const logout = () => {
  user.value = {
    name: '',
    password: '',
  };
};
</script>

<template>
  <NuxtLayout>
    <template v-if="user && user.name && user.password">
      <NuxtPage />
      <!-- Log out button -->
      <div class="mt-3">
        <v-btn @click="logout">
          Log out
        </v-btn>
      </div>
    </template>

    <!-- Login form -->
    <template v-else>
      <v-card class="mx-auto pa-12 pb-8 mt-12" elevation="8" max-width="448" rounded="lg">
        <v-list>
          <v-list-item class="login-box" prepend-icon="mdi-school" title="STUDENT DBMS" />
        </v-list>

        <v-text-field
          v-model="name"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <v-text-field
          v-model="password"
          @keypress.enter="login"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <template v-if="errorMsg">
          <v-text class="text-red">{{ errorMsg }}</v-text>
        </template>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login">
          Log In
        </v-btn>
      </v-card>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.login-box {
  display: flex;
  text-align: start;
  justify-content: flex-start;
  font-weight: 900;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: xx-large;
  text-decoration: wavy;
  color: #09485f;
}
</style>
