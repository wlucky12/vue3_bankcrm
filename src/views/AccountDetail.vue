<template>
  <div class="account-detail-container">
    <h1>账户详情</h1>
    <div v-if="account" class="account-info">
      <div class="info-item">
        <strong>账户号:</strong> {{ account.account_number }}
      </div>
      <div class="info-item">
        <strong>客户姓名:</strong> {{ account.customer_name }}
      </div>
      <div class="info-item">
        <strong>账户余额:</strong> {{ account.account_balance }}
      </div>
      <div class="info-item">
        <strong>账户类型:</strong> {{ getAccountType(account.account_type) }}
      </div>
      <div class="account-actions">
        <button @click="editAccount" class="edit-button">编辑账户</button>
        <button @click="viewTransactionHistory" class="history-button">查看历史交易</button>
        <button @click="goBack" class="back-button">返回</button>
      </div>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const account = ref(null);

const fetchAccountDetail = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/accounts/${route.params.id}/`);
    if (response.ok) {
      account.value = await response.json();
    } else {
      console.error('Failed to fetch account details');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getAccountType = (type) => {
  switch (type) {
    case 1:
      return '活期账户';
    case 2:
      return '定期账户';
    default:
      return '未知类型';
  }
};

const editAccount = () => {
  router.push({ name: 'EditAccount', params: { id: route.params.id } });
};

const viewTransactionHistory = () => {
  router.push({
    name: 'TransactionHistory',
    query: { customerName: account.value.customer_name },
  });
};

const goBack = () => {
  router.push({ name: 'AccountInfo' }); // 返回到账户信息页面
};

onMounted(() => {
  fetchAccountDetail();
});
</script>

<style scoped>
.account-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.account-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  margin-bottom: 10px;
}

.account-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.edit-button {
  padding: 8px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #16a085;
}

.history-button {
  padding: 8px 16px;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.history-button:hover {
  background-color: #8e44ad;
}

.back-button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}
</style> 