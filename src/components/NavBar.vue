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
      <a href="http://localhost:8000/admin" class="admin-icon" target="_blank">
        <i class="fas fa-user"></i><!-- 用户图标 -->
      </a>
      <div class="admin-dropdown">
        <div v-if="authStore.isAuthenticated" class="user-info">
          <p v-if="authStore.user?.is_staff">你好，{{ authStore.user.username }} 管理员</p>
          <p v-else>你好，{{ authStore.user.username }} 员工</p>
        </div>
        <div class="user-actions">
          <router-link v-if="!authStore.isAuthenticated" to="/login" class="dropdown-item">登录</router-link>
          <router-link v-if="!authStore.isAuthenticated" to="/register" class="dropdown-item">注册</router-link>
          <a v-if="authStore.isAuthenticated" href="#" @click="logout" class="dropdown-item">切换用户</a>
        </div>
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
/* 导航栏样式 */
nav {
  background-color: #ffffff; /* 背景为白色 */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

/* 左侧导航链接样式 */
.left-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px; /* 链接间距 */
}

.left-nav li a {
  color: #333; /* 文字颜色为深灰色 */
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  transition: color 0.3s ease;
}

.left-nav li a:hover {
  color: #007bff; /* 悬停时文字变为蓝色 */
}

/* 用户图标样式 */
.admin-icon-container {
  position: relative;
  display: inline-block;
}

.admin-icon {
  font-size: 24px;
  color: #333; /* 图标颜色为深灰色 */
  transition: all 0.3s ease;
  cursor: pointer;
}

.admin-icon:hover {
  transform: scale(1.2); /* 悬停时图标放大 */
  color: #007bff; /* 悬停时图标变为蓝色 */
}

/* 下拉菜单样式 */
.admin-dropdown {
  display: none;
  position: absolute;
  right: 0;
  background-color: #ffffff;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  overflow: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.admin-icon-container:hover .admin-dropdown {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* 用户信息样式 */
.user-info {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
}

.user-info p {
  margin: 0;
  font-size: 14px;
  color: #333;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 500;
}

/* 用户操作样式 */
.user-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.dropdown-item {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: all 0.3s ease;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: left; /* 文字左对齐 */
}

.dropdown-item:hover {
  background-color: #f5f5f5; /* 悬停时背景变为浅灰色 */
  color: #007bff; /* 悬停时文字变为蓝色 */
}
</style>