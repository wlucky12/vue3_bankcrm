<template>
  <div class="edit-account-container">
    <h1>编辑账户类型</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="account-type">账户类型</label>
        <select id="account-type" v-model="formData.account_type">
          <option value="1">活期账户</option>
          <option value="2">定期账户</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">保存</button>
        <button type="button" class="cancel-button" @click="handleCancel">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const formData = ref({
  account_type: '1', // 默认选择活期账户
});

const fetchAccountDetail = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/accounts/${route.params.id}/`);
    if (response.ok) {
      const data = await response.json();
      formData.value.account_type = data.account_type.toString(); // 确保类型为字符串
    } else {
      console.error('Failed to fetch account details');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSubmit = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/accounts/${route.params.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_type: parseInt(formData.value.account_type), // 转换为整数
      }),
    });

    if (response.ok) {
      alert('账户类型更新成功！');
      router.push({ name: 'AccountDetail', params: { id: route.params.id } });
    } else {
      const errorData = await response.json();
      alert(`更新失败: ${errorData.message || '未知错误'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('发生错误，请重试。');
  }
};

const handleCancel = () => {
  router.push({ name: 'AccountDetail', params: { id: route.params.id } });
};

onMounted(() => {
  fetchAccountDetail();
});
</script>

<style scoped>
.edit-account-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.submit-button {
  padding: 8px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #16a085;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style> 