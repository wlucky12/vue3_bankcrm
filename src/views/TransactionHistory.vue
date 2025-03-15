<template>
  <div class="transaction-history-container">
    <h1>历史交易记录</h1>
    <div v-if="transactions.length > 0" class="transaction-list">
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-details">
          <div class="detail-row">
            <p><strong>交易ID:</strong> {{ transaction.id }}</p>
            <p><strong>客户姓名:</strong> {{ transaction.account_customer_name }}</p>
          </div>
          <div v-if="transaction.transaction_type === 'transfer'" class="detail-row">
            <p><strong>目标客户:</strong> {{ transaction.target_account_customer_name }}</p>
          </div>
          <div class="detail-row">
            <p><strong>交易金额:</strong> {{ transaction.amount }}</p>
            <p><strong>交易类型:</strong> {{ transaction.transaction_type }}</p>
          </div>
          <div class="detail-row">
            <p><strong>交易时间:</strong> {{ formatDate(transaction.date) }}</p>
            <p><strong>描述:</strong> {{ transaction.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-transactions">
      <p>暂无交易记录</p>
    </div>
    <div v-if="transactions.length > 0" class="pagination">
      <button @click="prevPage" :disabled="!hasPrev">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="!hasNext">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const transactions = ref([]);
const currentPage = ref(1);
const hasNext = ref(false);
const hasPrev = ref(false);

const fetchTransactions = async (page = 1) => {
  try {
    const url = new URL('http://localhost:8000/api/transactions/');
    if (route.query.customerName) {
      url.searchParams.append('search', route.query.customerName);
    }
    url.searchParams.append('page', page);

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched transactions:', data);
      transactions.value = data.results;
      hasNext.value = !!data.next;
      hasPrev.value = !!data.previous;
      currentPage.value = page;
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
    fetchTransactions(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (hasNext.value) {
    fetchTransactions(currentPage.value + 1);
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
.transaction-history-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
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

.no-transactions {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
}
</style> 