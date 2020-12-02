<template>
  <div>
    <el-input  @click="mousetrap"></el-input>
    <el-tabs>
      <el-tab-pane label="全部">
        <div style="overflow:auto;height: 300px;">
          <div v-for="record in records" :key="record.id">{{ record.content }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')
const Mousetrap = require('mousetrap');
export default {
  name: "SimpleRecord",
  data() {
    ipcRenderer.on('on-record-change', (event, doc) => {
      this.records.push(doc)
      if (doc.star === true) {
        this.starRecords.push(doc)
      }
    })
    return {
      params: {
        text: "",
        pageNum: 1,
        pageSize: 1000
      },
      key: ['content'],
      records: [],
      starRecords: []
    }
  }, mounted() {
    this.query();
  }, methods: {
    query() {
      this.$watcher.query4Page(this.params, (result) => {
        console.log(result)
        if (result) {
          this.records.push(...result)
        }
        console.log("records:" + this.records)
      })
    },
    load() {
      this.params.pageNum = this.params.pageNum + 1
      this.query();
    },
    reset() {

    },
    mousetrap(){
      Mousetrap.bind("",()=>{})
      Mousetrap.record(function(sequence) {
        // sequence is an array like ['ctrl+k', 'c']
        console.log('You pressed: ' + sequence.join(' '));
      });
    }
  },created() {
    // window.addEventListener('keydown',(e,k)=>{
    //   console.log("down",e)
    // },true)
    //
    // window.addEventListener('keyup',(e,k)=>{
    //   console.log("up",e)
    // },true)
  }
}
</script>

<style scoped>

</style>