<script setup lang="ts">
const user = useCookie<{ name: string, password: string }>('user')
const logins = useCookie<number>('logins')


const name = ref('')
const password = ref('')

const login = () => {
  logins.value = (logins.value || 0) + 1
  user.value = { name: name.value, password: password.value }
}

const logout = () => {
  user.value = {
    name: '',
    password: '',
  }
}
</script>
<template>
  <NuxtExample class="h-50" dir="advanced/use-cookie">
    <template v-if="user">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <!-- <div class="mt-3">
        <button @click="logout">
          Log out
        </button>
      </div> -->
    </template>

    <!--Login form-->
    <template v-else>
      <div>
       
        <v-card class="mx-auto pa-12 pb-8 mt-12" elevation="8" max-width="448" rounded="lg">
          <v-card-title>Student Database Management System</v-card-title>

          <v-text-field v-model="name" density="compact" placeholder="Email address"
            prepend-inner-icon="mdi-email-outline" variant="outlined" />
    
          <v-text-field v-model="password" @keypress.enter="login"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
            @click:append-inner="visible = !visible" />
            <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
              Forgot login password?</a>
     -->
          <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              Warning: After 3 consecutive failed login attempts, you account will
              be temporarily locked for three hours. If you must login now, you can
              also click "Forgot login password?" below to reset the login password.
            </v-card-text>
          </v-card> -->

          <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login">
            Log In
          </v-btn>

          <!-- <v-card-text class="text-center">
            <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text> -->
        </v-card>
      </div>
    </template>
    <!--Login form ends-->


    <!-- <template v-else>
      <h1 class="text-3xl mb-3">
        Login
      </h1>
      <div class="login-box mt-3">
        <label htmlFor="name">Email</label>
        <input type="email" v-model="name" class="w-100 m-auto" placeholder="Enter your email..." />
        <label htmlFor="password">Password</label>
        <input type="password" v-model="password" class="w-100 m-auto" @keypress.enter="login()" />

        <button icon="i-heroicons-user" :disabled="!name" name="Log in" @click="login">
          Log in
        </button>
      </div>
    </template> -->
  </NuxtExample>
</template>

<style scoped>
.login-box {
  max-width: 50%;
  align-items: center;
  align-self: center;
  background-color: aqua;
  display: flexbox;
  padding: 1rem;
  justify-self: center;
  justify-content: center;
}
</style>
