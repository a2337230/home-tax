<template>
  <div class="detail">
    <h1 class="detail-title">{{msg.type}}</h1>
    <h2 class="detail-info-title">{{msg.title}}</h2>
    <div class="comuser">
      <p>投诉人 : {{msg.plain}}</p>
      <p>被投诉员工 : {{msg.accused}}</p>
      <p>提交人 : {{msg.submitter}}</p>
    </div>
    <div class="com-content" v-html="msg.editorContent">

    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'detail',
  data () {
    return {
      id: this.$route.params.id,
      msg: {
        editorContent: ''
      }
    }
  },
  created () {
    this.getComplain();
  },
  methods: {
    async getComplain () {
      let data = {
        id: this.id
      }
      await this.$axios.get(`http://www.tansuowu.com:3000/api/oneComplain?id=${this.id}`)
      .then(res => {
        this.msg = res.data.message[0]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .detail-title {
    text-align: center;
    font-weight: normal;
  }
  .detail-info-title {
    text-align: center;
    margin-top: 20px;
    line-height: 40px;
  }
  .comuser {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .com-content {
    margin-top: 20px;
    table {
      background-color: red;
    }
  }

}
</style>
