<template>
  <div class="home">
    <div class="container">
      <h1 class="title">房产管理系统</h1>
      <p class="lead">新税务●新起点●新形象</p>
      <div class="liuling">
        <p><span>服务受理零推诿</span><span>服务方式零距离</span></p>
        <p><span>服务质量零差错</span><span>服务结果零投诉</span></p>
        <p><span>服务项目零收费</span><span>政策服务零折扣</span></p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  background: url('./../common/showcase.png') no-repeat;
  background-size: 100% 100%;
  .container {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.7);
    color: #fff;
    padding-top: 100px;
    letter-spacing: 5px;
    .title {
      font-size: 30px;
      line-height: 80px;
    }
    .lead {
      font-size: 24px;
      line-height: 60px;
    }
    .liuling {
      padding-top: 10px;
      font-size: 22px;
      p {
        line-height: 40px;
        span{
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
