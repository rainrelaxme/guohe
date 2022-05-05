<template>
  <el-container>
    <!-- 导航 -->
    <!-- 大屏 -->
    <el-header class="maxScreen">
      <el-menu
        class="el-menu-nav"
        mode="horizontal"
        background-color="#172B4D"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item class="nav_img clear flex-center">
          <img src="../assets/logo.png" alt="" />
        </el-menu-item>
        <el-menu-item
          v-for="(v, i) in menuList"
          :key="i"
          :index="
            v.children[0].children
              ? v.children[0].children[0].path
              : v.children[0].path
          "
        >
          <span>{{ v.name }}</span>
        </el-menu-item>
        <el-menu-item class="nav_title clear flex-center">
          <span class="white">测试与验证综合管理系统</span>
        </el-menu-item>
        <!-- 暂停 -->
        <el-menu-item class="clear">
          <i class="yellow" :class="suspendIcon" @click="clickSuspend"></i>
        </el-menu-item>
        <!-- 暂停 end -->
        <el-menu-item :index="this.messageInfo.path">
          <i class="white el-icon-chat-line-square"></i>
          <span class="bg-red messageNum">3</span>
        </el-menu-item>
        <el-menu-item :index="this.personalInfo.path">
          <i class="white el-icon-user"></i>
        </el-menu-item>
        <el-menu-item class="clear">
          <i class="white el-icon-switch-button" @click="loginOut"></i>
        </el-menu-item>
      </el-menu>
    </el-header>
    <!-- 大屏 end -->

    <!-- 移动端 -->
    <el-drawer
      size="50%"
      direction="ltr"
      :visible.sync="drawer"
      :with-header="false"
    >
      <el-menu
        class="el-menu-nav drawer-nav"
        active-text-color="#409EFF"
        :unique-opened="true"
        router
      >
        <el-submenu v-for="(v, i) in menuList" :key="i" :index="v.path">
          <template slot="title">{{ v.name }}</template>
          <template v-for="(v2, i2) in v.children">
            <!-- 只有二级菜单 -->
            <el-menu-item
              v-if="!v2.children"
              :key="i2"
              :index="v2.path"
              @click="drawer = false"
            >
              {{ v2.name }}
            </el-menu-item>
            <!-- 只有二级菜单 end -->

            <!-- 有三级菜单 -->
            <el-submenu v-else :key="i2" :index="i2 + ''">
              <template slot="title">{{ v2.name }}</template>
              <el-menu-item
                v-for="(v3, i3) in v2.children"
                :key="i3"
                :index="v3.path"
                @click="drawer = false"
              >
                {{ v3.name }}
              </el-menu-item>
            </el-submenu>
            <!-- 有三级菜单 end -->
          </template>
        </el-submenu>
      </el-menu>
    </el-drawer>
    <!-- 移动端 end -->
    <div class="padding minScreen">
      <div class="top">
        <img src="../assets/logo.png" alt="" />
        <h4>测试与验证综合管理系统</h4>
        <i class="el-icon-s-operation" @click="drawer = true"></i>
      </div>
      <div class="bottom">
        <!-- 暂停 -->
        <p>
          <i class="yellow" :class="suspendIcon" @click="clickSuspend"></i>
        </p>
        <!-- 暂停 end -->
        <p @click="goMessage">
          <i class="el-icon-chat-line-square"></i>
          <span class="bg-red messageNum">3</span>
        </p>
        <p @click="goPersonal">
          <i class="el-icon-user"></i>
        </p>
        <p>
          <i class="el-icon-switch-button" @click="loginOut"></i>
        </p>
      </div>
    </div>
    <!-- 导航 end -->

    <!-- 主要内容 -->
    <el-main>
      <router-view />
    </el-main>
    <!-- 主要内容 end -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // 抽屉-左侧导航
      menuList: [], // 顶部导航-左侧-从路由index.js获取
      messageInfo: [], // 信息中心
      personalInfo: [], // 个人中心
      suspend: true, // 是否暂停
      suspendIcon: "el-icon-video-play", // 暂停图标
    };
  },
  created() {},
  methods: {
    // 点击暂停
    clickSuspend() {
      this.suspend = !this.suspend;
      if (this.suspend == true) {
        this.suspendIcon = "el-icon-video-play";
      } else {
        this.suspendIcon = "el-icon-video-pause";
      }
    },
    // 退出
    loginOut() {
      this.$confirm("确认退出登录?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    // 信息中心
    goMessage() {
      this.$router.push("/message_center");
    },
    // 个人中心
    goPersonal() {
      this.$router.push("/personal_center");
    },
  },
  mounted() {
    // 遍历路由-插入到导航栏
    var arr = this.$router.options.routes;
    var arr1 = [];
    arr.forEach((v) => {
      if (!v.hidden) {
        arr1.push(v);
      }
    });
    var navList = arr1[0].children;
    var arr2 = [];
    var arr3 = [];
    navList.forEach((v) => {
      if (v.position == 1) {
        arr2.push(v);
      } else {
        arr3.push(v);
      }
    });
    this.menuList = arr2;
    this.messageInfo = arr3[0];
    this.personalInfo = arr3[1];
    // console.log(this.menuList, "menuList");
  },
};
</script>
