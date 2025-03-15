<template>
  <div class="account-info-container">
    <h1>客户账户信息</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="输入账户号或客户姓名查找"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch" class="search-button">搜索</button>
    </div>
    <div class="account-list">
      <div v-for="account in accounts" :key="account.id" class="account-item">
        <div class="account-details">
          <div class="detail-row">
            <p><strong>客户姓名:</strong> {{ account.customer_name }}</p>
            <p><strong>账户号:</strong> {{ account.account_number }}</p>
          </div>
          <div class="detail-row">
            <p><strong>账户余额:</strong> {{ account.account_balance }}</p>
            <p><strong>账户类型:</strong> {{ getAccountType(account.account_type) }}</p>
          </div>
        </div>
        <div class="account-actions">
          <button @click="viewAccountDetail(account.id)" class="detail-button">查看详情</button>
          
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="handlePrevPage" :disabled="!hasPrev">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="handleNextPage" :disabled="!hasNext">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const accounts = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const hasNext = ref(false);
const hasPrev = ref(false);

const fetchAccounts = async (page = 1) => {
  try {
    const url = new URL('http://127.0.0.1:8000/api/accounts/');
    if (searchQuery.value.trim()) {
      url.searchParams.append('search', searchQuery.value);
    }
    url.searchParams.append('page', page);

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched accounts:', data);
      accounts.value = data.results;
      hasNext.value = !!data.next;
      hasPrev.value = !!data.previous;
      currentPage.value = page;
    } else {
      console.error('Failed to fetch accounts');
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

const viewAccountDetail = (accountId) => {
  router.push({ name: 'AccountDetail', params: { id: accountId } });
};



const handleSearch = () => {
  currentPage.value = 1; // 重置为第一页
  fetchAccounts(currentPage.value);
};

const handleNextPage = () => {
  if (hasNext.value) {
    fetchAccounts(currentPage.value + 1);
  }
};

const handlePrevPage = () => {
  if (hasPrev.value) {
    fetchAccounts(currentPage.value - 1);
  }
};

onMounted(() => {
  fetchAccounts();
});
</script>

<style scoped>
.account-info-container {
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

.account-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.account-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.account-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  gap: 20px;
}

.account-actions {
  display: flex;
  gap: 10px;
}

.detail-button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail-button:hover {
  background-color: #2980b9;
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