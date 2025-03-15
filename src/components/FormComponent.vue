<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="name">姓名</label>
      <input type="text" id="name" v-model="formData.name" required />
    </div>
    <div class="form-group">
      <label for="email">邮箱</label>
      <input type="email" id="email" v-model="formData.email" required />
    </div>
    <div class="form-group">
      <label for="phone_number">电话号码</label>
      <input type="tel" id="phone_number" v-model="formData.phone_number" required />
    </div>
    <div class="form-group">
      <label for="address">地址</label>
      <input type="text" id="address" v-model="formData.address" required />
    </div>
    <div class="form-group">
      <label for="password">密码</label>
      <input type="password" id="password" v-model="formData.password" required />
    </div>
    <button type="submit" class="submit-button">提交</button>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.formData);
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #16a085;
}
</style> 