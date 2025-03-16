<template>
    <div class="analysis-container">
      <h1>交易数据分析</h1>
      <div class="charts">
        <div class="chart-item">
          <h2>账户类型分布</h2>
          <div ref="accountTypeChart" class="chart"></div>
        </div>
        <div class="chart-item">
          <h2>交易类型分布</h2>
          <div ref="transactionTypeChart" class="chart"></div>
        </div>
        <div class="chart-item">
          <h2>交易日期分布</h2>
          <div ref="transactionDateChart" class="chart"></div>
        </div>
        <div class="chart-item">
          <h2>交易金额分布</h2>
          <div ref="transactionAmountChart" class="chart"></div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const accountTypeChart = ref(null);
const transactionTypeChart = ref(null);
const transactionDateChart = ref(null);
const transactionAmountChart = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/analysis',{
    credentials: 'include', // 允许携带 cookie
    });
    if (response.ok) {
      const data = await response.json();
      renderCharts(data);
    } else {
      console.error('Failed to fetch analysis data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const renderCharts = (data) => {
  // 账户类型分布
  const accountTypeOptions = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '账户类型',
        type: 'pie',
        radius: '50%',
        data: data.account_type_data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 交易类型分布
  const transactionTypeOptions = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '交易类型',
        type: 'pie',
        radius: '50%',
        data: data.transaction_type_data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 交易日期分布
  const transactionDateOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.transaction_dates,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '交易日期',
        type: 'bar',
        data: data.transaction_dates.map((date, index) => ({
          value: data.transaction_amounts[index],
          name: date,
        })),
      },
    ],
  };

  // 交易金额分布
  const transactionAmountOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.transaction_amounts,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '交易金额',
        type: 'line',
        data: data.transaction_amounts,
      },
    ],
  };

  // 渲染图表
  echarts.init(accountTypeChart.value).setOption(accountTypeOptions);
  echarts.init(transactionTypeChart.value).setOption(transactionTypeOptions);
  echarts.init(transactionDateChart.value).setOption(transactionDateOptions);
  echarts.init(transactionAmountChart.value).setOption(transactionAmountOptions);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.analysis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-item {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
 