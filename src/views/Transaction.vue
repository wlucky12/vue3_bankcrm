<template>
  <div class="transaction-container">
    <h1>交易管理</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="输入客户姓名查找"
        @keyup.enter="fetchTransactions"
      />
      <button @click="fetchTransactions" class="search-button">搜索</button>
    </div>
    <div class="transaction-list">
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-details">
          <div class="detail-row">
            <p><strong>交易类型:</strong> {{ transaction.transaction_type }}</p>
            <p><strong>交易金额:</strong> {{ transaction.amount }}</p>
          </div>
          <div class="detail-row">
            <p><strong>交易日期:</strong> {{ formatDate(transaction.date) }}</p>
            <p><strong>描述:</strong> {{ transaction.description }}</p>
          </div>
          <div class="detail-row">
            <p><strong>交易账户:</strong> {{ transaction.account }}</p>
            <p><strong>交易账户客户姓名:</strong> {{ transaction.account_customer_name }}</p>
          </div>
          <div v-if="transaction.transaction_type === 'transfer'" class="detail-row">
            <p><strong>目标账户:</strong> {{ transaction.target_account }}</p>
            <p><strong>目标账户客户姓名:</strong> {{ transaction.target_account_customer_name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="!hasPrev">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="!hasNext">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const transactions = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const hasNext = ref(false);
const hasPrev = ref(false);

const fetchTransactions = async () => {
  try {
    const url = new URL('http://localhost:8000/api/transactions/');
    if (searchQuery.value.trim()) {
      url.searchParams.append('search', searchQuery.value);
    }


    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched transactions:', data);
      transactions.value = data.results;
      hasNext.value = !!data.next;
      hasPrev.value = !!data.previous;
    } else {
      console.error('Failed to fetch transactions');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const prevPage = () => {
  if (hasPrev.value) {
    fetchTransactions();
  }
};

const nextPage = () => {
  if (hasNext.value) {
    fetchTransactions();
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
.transaction-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-button {
  padding: 8px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #16a085;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transaction-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.transaction-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  gap: 20px;
}

.transaction-actions {
  display: flex;
  gap: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #16a085;
}
</style> 