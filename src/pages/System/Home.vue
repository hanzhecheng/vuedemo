<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
  },
  methods: {
    show() {
      this.log(this.$router.options.routes)
      this.log(this.$route.matched)
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
