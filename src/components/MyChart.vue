<template>
  <div ref="chart" style="width: 600px; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);
  const option = {
    title: {
      text: 'ECharts 示例',
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
      },
    ],
  };
  myChart.setOption(option);
});
</script> 