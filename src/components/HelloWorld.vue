<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="close">关闭</el-button>
    <el-button @click="start">启动</el-button>
    <el-button @click="notice">通知</el-button>
    <el-button @click="query">获取</el-button>
    <el-input @keydown="keydown" @keypress="keypress" @keyup="keyup"></el-input>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.$watcher.query((docs) => {
      this.records = docs;
    })
  },
  data() {
    ipcRenderer.on('on-record-change', (event, args) => {
      this.records.push(args)
    })
    return {
      records: [],
      keys: ''
    }
  },
  methods: {
    close() {
      this.$watcher.stop()
    }, start() {
      this.$watcher.start()
    }, notice() {
      this.$notice.show({
        title: "批量复制",
        body: "记录中..."
      })
    }, keydown(key) {
      console.log("onkeydown", key)
    },
    query() {
      console.log(this.records)
    },
    keypress(key) {
      console.log("onkeypress", key)
    },
    keyup(key) {
      console.log("onkeyup", key)
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
