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
    <ul class="right-nav">
      <li><router-link to="/logout">注销</router-link></li>
      <li><router-link to="/login">登录</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
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
</style> 