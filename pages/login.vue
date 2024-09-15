<script setup lang="ts">
import { authenticate } from '~/store/data-services';
import { useRouter } from 'vue-router'
const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')

const name = ref('');
const errorMsg=ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  const data = await authenticate({email:name.value,password:password.value});
  if(data.length>0){
    user.value = { name: name.value }
    router.push('/');

  }else{
    errorMsg.value = "Wrong Username or Password";
  }
  logins.value = (logins.value || 0) + 1
  
}

// const logout = () => {
//   user.value = null
// }
</script>

<template>
  <NuxtExample class="h-50" dir="advanced/use-cookie">
    
    <template v-if="user">
        <NuxtPage/>
    </template>
    <template v-else>
      <!--Login form-->
      <v-card class="mx-auto pa-12 pb-8 mt-12" elevation="8" max-width="448" rounded="lg">
        <v-list>
          <v-list-item class="login-box" prepend-icon="mdi-school" title="STUDENT DBMS" />
        </v-list>

        <v-text-field v-model="name" density="compact" placeholder="Email address"
          prepend-inner-icon="mdi-email-outline" variant="outlined" />

        <v-text-field v-model="password" @keypress.enter="login"
           :type="password"
          density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
           />

        <template v-if="errorMsg">
          <v-text class="text-red">{{ errorMsg }}</v-text>
        </template>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login">
          Log In
        </v-btn>
      </v-card>
      <!--Login form ends-->
    </template>
  
  </NuxtExample>
</template>
