<template>
  <div class="edit-customer-container">
    <h1>编辑客户信息</h1>
    <FormComponent :formData="formData" @submit="handleSubmit" />
  </div>
</template>

<script>
import FormComponent from '@/components/FormComponent.vue';

export default {
  name: 'EditCustomer',
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
      },
      isSubmitting: false
    };
  },
  async created() {
    await this.fetchCustomer();
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await fetch(`http://localhost:8000/api/customers/${this.$route.params.id}/`);
        if (response.ok) {
          const customer = await response.json();
          this.formData = { ...customer, password: '' }; // 不显示密码
        } else {
          console.error('Failed to fetch customer');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async handleSubmit(formData) {
      if (this.isSubmitting) return; // 防止重复提交
      this.isSubmitting = true;

      try {
        const response = await fetch(`http://localhost:8000/api/customers/${this.$route.params.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json(); // 解析响应数据
          console.log('更新成功:', data);
          alert('客户信息更新成功！');
          this.$router.push({ name: 'CustomerDetail', params: { id: this.$route.params.id } });
        } else {
          const errorData = await response.json(); // 解析错误信息
          console.error('更新失败:', errorData);
          alert(`客户信息更新失败: ${errorData.message || '未知错误'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('发生错误，请重试。');
      } finally {
        this.isSubmitting = false; // 重置提交状态
      }
    }
  }
};
</script>

<style scoped>
.edit-customer-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style> 