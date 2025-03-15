<template>
  <div class="customer-info-container">
    <h1>客户信息</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="输入客户姓名查找"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch" class="search-button">搜索</button>
    </div>
    <div class="customer-list">
      <div v-for="customer in customers" :key="customer.customer_id" class="customer-item">
        <div class="customer-details">
          <div class="detail-row">
            <p><strong>客户姓名:</strong> {{ customer.name }}</p>
            <p><strong>客户电话:</strong> {{ customer.phone_number }}</p>
          </div>
          <div class="detail-row">
            <p><strong>客户邮箱:</strong> {{ customer.email }}</p>
            <p><strong>客户地址:</strong> {{ customer.address }}</p>
          </div>
        </div>
        <div class="customer-actions">
          <button @click="viewCustomerDetail(customer.customer_id)" class="detail-button">查看详情</button>
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
const customers = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const hasNext = ref(false);
const hasPrev = ref(false);

const fetchCustomers = async (page = 1) => {
  try {
    const url = new URL('http://localhost:8000/api/customers/');
    if (searchQuery.value.trim()) {
      url.searchParams.append('search', searchQuery.value);
    }
    url.searchParams.append('page', page);

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched customers:', data);
      customers.value = data.results;
      hasNext.value = !!data.next;
      hasPrev.value = !!data.previous;
      currentPage.value = page;
    } else {
      console.error('Failed to fetch customers');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const viewCustomerDetail = (customerId) => {
  router.push({ name: 'CustomerDetail', params: { id: customerId } });
};

const handleSearch = () => {
  currentPage.value = 1; // 重置为第一页
  fetchCustomers(currentPage.value);
};

const handleNextPage = () => {
  if (hasNext.value) {
    fetchCustomers(currentPage.value + 1);
  }
};

const handlePrevPage = () => {
  if (hasPrev.value) {
    fetchCustomers(currentPage.value - 1);
  }
};

onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
.customer-info-container {
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

.customer-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.customer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.customer-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.customer-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  gap: 20px;
}

.customer-actions {
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
