<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar><!-- 侧边导航栏 -->
    <div class="main-container">
      <navbar></navbar><!-- 上方导航 -->
      <app-main></app-main><!-- 二级嵌套路由 -->
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
//import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
	//移动端适配
  //mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // @import "src/styles/mixin.scss";
  // .app-wrapper {
  //   @include clearfix;
  //   position: relative;
  //   height: 100%;
  //   width: 100%;
  // }
</style>
