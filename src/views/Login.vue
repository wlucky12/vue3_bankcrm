<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" id="username" type="text" required @input="resetError">
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required @input="resetError">
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      await this.authStore.login(this.username, this.password, this.$router);
      if (!this.authStore.isAuthenticated) {
        this.error = 'Login failed. Please check your credentials.';
      }
    },
    resetError() {
      this.error = "";
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
}
</style>
