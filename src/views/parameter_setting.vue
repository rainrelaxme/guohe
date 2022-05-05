<template>
  <div class="systemBox parameterBox">
    <!-- 左侧 -->
    <el-container>
      <!-- 大屏 -->
      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        class="el-menu-vertical-left containLeft"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(23, 43, 77)"
        text-color="rgb(162, 197, 206)"
        active-text-color="#fff"
        router
      >
        <el-submenu v-for="(v, i) in menuList" :key="i" :index="i + ''">
          <template slot="title">
            <i :class="v.icon"></i>
            <span>{{ v.name }}</span>
          </template>
          <el-menu-item
            v-for="(v2, i2) in v.children"
            :key="i2"
            :index="v2.path"
            >{{ v2.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <!-- 大屏 end -->
      
      <!-- 右侧 -->
      <el-container>
        <i class="collapse-icon" :class="isCollapse == true ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [], // 左侧导航
      isCollapse: false, // 是否折叠菜单
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 自定义方法函数
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 遍历路由-插入到导航栏
    var arr = this.$router.options.routes;
    var arr1 = [];
    arr.forEach((v) => {
      if (!v.hidden) {
        arr1.push(v);
      }
    });
    var navLeft = arr1[0].children[1].children;
    this.menuList = navLeft;
    // console.log(arr1[0].children[1].children,'0000000000');
  },
};
</script>