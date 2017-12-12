<template>
  <div class="hello">
  <button type="button" class="btn btn-primary" v-on:click="Export">导出数据</button>
      <Key v-for="(item,index) in values" v-bind:Index="index" v-bind:key="index" v-bind:Codes="values"
        v-bind:keyName="item.keyName" v-bind:keyValye="item.keyValye" v-on:SetVal="setVal"></Key>
      
  </div>
</template>

<script>
import Key from './Key.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      values:[
              {keyName:"本班日报",keyValye:301,keyCode:""},
              {keyName:"本日日报",keyValye:302,keyCode:""},
              {keyName:"会员卡",keyValye:306,keyCode:""},
             ],
     
    }
  },
  methods:{
    setVal(index,keycode){
        this.values[index].keyCode=keycode;
    },
    Export(){
      console.table(this.values)
    }
  },
  components:{
    Key
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
