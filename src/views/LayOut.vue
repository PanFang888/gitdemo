<template>
  <div>
      <el-container>
        <el-aside width="200px" class="aside">
          <nav-left></nav-left>
        </el-aside>
        <el-container>
          <el-header class="head">
            <top-header></top-header>
          </el-header>
          <el-main class="main">
            <keep-alive>
              <!-- 二级路由信息 -->
              <!-- 默认首页，点击会切换 -->
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
          <el-footer class="foot">
            京ICP备88888888号 京公安网备123456号
          </el-footer>
        </el-container>
      </el-container>

    
  </div>
</template>
<script>
import NavLeft from '../components/NavLeft.vue'

import TopHeader from '../components/TopHeader.vue'


    export default{
  components: { NavLeft, TopHeader },
      compontents:{
        NavLeft,TopHeader
      }
    }
</script>

<style lang="less">
.head{background-color: #fff;
line-height: 60px;
box-shadow: 0 2px 2px rgba(0,21,41,0.3);}
.aside{
  background-color: #001529;
  height:100vh;
}
.main{
  height: 70vh;
  background-color: #e9eef3;
}
.foot{
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 60px;
  background-color: #e9eef3;
}
</style>
