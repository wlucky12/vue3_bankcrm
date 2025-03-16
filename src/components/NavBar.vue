<template>
  <nav>
    <ul class="left-nav">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/open-account">客户开户</router-link></li>
      <li><router-link to="/customer-info">客户信息</router-link></li>
      <li><router-link to="/account-info">账户信息</router-link></li>
      <li><router-link to="/transaction">交易</router-link></li>
      <li><router-link to="/data-analysis">数据分析</router-link></li>
    </ul>
    <div class="admin-icon-container">
      <a href="#" class="admin-icon">
        <i class="fas fa-user-cog"></i>
      </a>
      <div class="admin-dropdown">
        <router-link v-if="!authStore.isAuthenticated" to="/login">登录</router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/register">注册</router-link>
        <a v-if="authStore.isAuthenticated" href="#" @click="logout">切换用户</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    await authStore.logout(router);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 20px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.admin-icon-container {
  position: relative;
  display: inline-block;
}

.admin-icon {
  font-size: 24px;
  color: white;
  transition: transform 0.3s ease;
}

.admin-icon:hover {
  transform: scale(1.2);
}

.admin-dropdown {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.admin-dropdown a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.admin-dropdown a:hover {
  background-color: #f1f1f1;
}

.admin-icon-container:hover .admin-dropdown {
  display: block;
}
</style>