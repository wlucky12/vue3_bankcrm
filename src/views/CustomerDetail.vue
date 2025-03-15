<template>
    <div class="customer-detail-container">
      <h1>客户详情</h1>
      <div v-if="customer" class="customer-info">
        <div class="info-item">
          <strong>客户姓名:</strong> {{ customer.name }}
        </div>
        <div class="info-item">
          <strong>客户电话:</strong> {{ customer.phone_number }}
        </div>
        <div class="info-item">
          <strong>客户邮箱:</strong> {{ customer.email }}
        </div>
        <div class="info-item">
          <strong>客户地址:</strong> {{ customer.address }}
        </div>
        <div class="customer-actions">
          <button @click="editCustomer" class="edit-button">更改信息</button>
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
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const customer = ref(null);
  
  const fetchCustomerDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/customers/${route.params.id}/`);
      customer.value = response.data;
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
    }
  };
  
  const editCustomer = () => {
    router.push({ name: 'EditCustomer', params: { id: route.params.id } });
  };
  
  const goBack = () => {
    router.push({ path: '/customer-info' }); // 使用路径而不是名称
  };
  
  onMounted(() => {
    fetchCustomerDetail();
  });
  </script>
  
  <style scoped>
  .customer-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .customer-info {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .info-item {
    margin-bottom: 10px;
  }
  
  .customer-actions {
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