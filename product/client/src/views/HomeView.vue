<template>
  <div class="home">
    <div>
      <div>{{ title }}</div>
      <input type="text" v-model="input1"> 
      <button type="button" @click="getData">click</button>
      <select v-model="resion"  @change="changeResion">
        <option :key="i" :value="d.v" v-for="(d,i) in options">{{d.t}}</option>
      </select>
      <table class="table table-bordered" v-if="tableShow"> 
        <tr :key="i" v-for="(d, i) in options">
          <td>{{ d.v }}</td>
          <td>{{ d.t }}</td>
        </tr>
      </table>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data(){
    return {
      title: "개발자의품격",
      title2:"seoul",
      input1:"abcd",
      options : [
        {v:'S', t:'seoul'},
        {v:'J', t:'jeju'},
        {v:'B', t:'busan'},
      ],
      resion:"J",
      tableShow: true,
    }
  },
  methods: {
    getData(){
      alert(this.input1);
    },
    setData(){
      this.input1 = '123'
    },
    changeResion(){
      alert(this.resion);
    }
  },
  beforeCreate() {
    
  },
  created() {
    
  },
  beforeMount() {
    
  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  updated() {
    
  },

  components: {
    HelloWorld
  }
}
</script>
