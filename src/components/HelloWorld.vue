<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="close">关闭</el-button>
    <el-button @click="start">启动</el-button>
  </div>
</template>

<script>
// const watcher =require('../common/watcher/index')
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    close() {
      this.$watcher.stop()
    },start() {
      this.$watcher.start()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
