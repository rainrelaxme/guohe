<template>
  <div class="paddingBox personalBox">
    <el-form ref="form" :model="form" label-width="80px" :label-position="'top'">
      <el-form-item label="头像" class="header">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="upLoad"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.face" :src="form.face" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="form.branch" placeholder="请选择所属部门">
          <el-option label="技术部" value="1"></el-option>
          <el-option label="运维部" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type='password'></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPassword" type='password'></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mailbox"></el-input>
      </el-form-item>
      <el-form-item label="电子签名">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :http-request="signUpload"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
       form: {
        face: '',
        name: '',
        phone: '',
        branch: '',
        mailbox: '',
        password: '',
        confirmPassword: '',
      },
      dialogImageUrl: '', // 电子签名展示
      dialogVisible: false, // 电子签名展示

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
  },
  //生命周期 - 自定义方法函数
  methods: {
    // 上传头像
    upLoad(file){
      const formData = new FormData();
      // console.log(file,'file');
      formData.append('file',file.file);
      // this.$http.uploadFile(formData,(res)=>{
      //   this.$message.success(res.message);
      //   this.form.face = res.data.image;
      // },(errRes)=>{
      //   this.$message.error(errRes.message);
      // });

    },
    // 验证图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 上传电子签名
    signUpload(file){

    },
    // 电子签名移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 电子签名大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 创建用户
    onSubmit(){
      // console.log(this.form.name,'name');
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    
  },
};
</script>