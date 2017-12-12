<<template>
  <div class="key col-md-1">
    <div class="keyhead" >
      <h5 v-html="keyName"></h5>
    </div>
    <div class="keybody col-md-12">
        <input type="text" class="form-control" v-model="keyCode" v-on:keydown="updateVal($event)" v-on:blur="leave($event)"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'key',
  props:{
    keyName:[String],
    keyValye:[Number],
    Index:[Number],
    Codes:[Array]
  },
  data () {
    return {
        keyCode:"",
    }
  },
  methods:{
    updateVal(event){
      event.preventDefault();
      let ixist= this.Codes.findIndex((item,index)=>item.keyCode==event.keyCode);
      if (ixist!=-1&&ixist!=this.Index) {
        alert("键值重复,请重新选择");
        return;
      }
      this.keyCode=event.key;
      this.$emit("SetVal",this.Index,event.keyCode);
    },
    leave(event){
      console.log(event)
    }
  }
}
</script>
<<style scoped>

  input{
    text-align:center;
    border-radius: 0;
  }
  .keyhead{
    border-bottom:1px solid black;
  }
  .key{
    margin:0;
    padding:0;
    border: 1px solid #ddd;
  }
  [class*=col-md]{
    padding:0;
  }
</style>
