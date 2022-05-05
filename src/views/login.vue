<template>
  <div class="loginBox">
    <el-container>
      <el-main>
        <div class="main">
          <div class="loginLogo">
            <img src="../assets/loginLogo.png" alt="" />
          </div>
          <div class="FRACAS"><span>FRACAS系统</span></div>
          <el-form label-width="80px">
            <el-form-item label="">
              <el-input
                v-model="usernName"
                placeholder="请输入用户名"
                @keyup.enter.native="login()"
              ></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="password"
                type="password"
                placeholder="请输入密码"
                @keyup.enter.native="login()"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernName: "",
      password: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 自定义方法函数
  methods: {
    // 点击登录
    login(){
      if(!this.usernName || !this.password){
        this.$message.error('填写信息不能为空！');
        return
      };
      this.$router.push('/survey');
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>