<template>
  <div class="open-account-container">
    <h1>客户开户</h1>
    <FormComponent :formData="formData" @submit="handleSubmit" />
  </div>
</template>

<script>
import FormComponent from '@/components/FormComponent.vue';

export default {
  name: 'OpenAccount',
  components: {
    FormComponent
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone_number: '',
        address: '',
        password: ''
      }
    };
  },
  methods: {
    async handleSubmit(formData) {
      try {
        const response = await fetch('http://localhost:8000/api/customers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          alert('客户开户成功！');
          this.resetForm();
        } else {
          alert('客户开户失败，请重试。');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('发生错误，请重试。');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone_number: '',
        address: '',
        password: ''
      };
    }
  }
};
</script>

<style scoped>
.open-account-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style> 