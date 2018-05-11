<template>
  <div>
    <!-- <el-date-picker placeholder="选择日期" v-model="date" format="yy-MM-dd" :picker-options="pickerBeginDateAfter">
    </el-date-picker> -->
  </div>
</template>
<script>
export default {
  props: {
    isdot: Boolean
  },
  data() {
    return {
      date: '',
      pickerBeginDateAfter: {
        disabledDate: time => {
          return (
            new Date('2018/5/1').getTime() < time.getTime() &&
            time.getTime() < new Date('2018/5/3').getTime()
          )
        }
      }
    }
  },
  created() {}
}
</script>
