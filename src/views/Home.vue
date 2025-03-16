<script setup>
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    await authStore.logout(router);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await authStore.fetchUser();
});
</script>

<template>
  <h1>Welcome to the home page</h1>
  <div v-if="authStore.isAuthenticated">
    <p>Hi there {{ authStore.user?.username }}!</p>
    <p>You are logged in.</p>
    <button @click="logout">Logout</button>
  </div>
  <p v-else>
    You are not logged in. <router-link to="/login">Login</router-link>
  </p>
</template>