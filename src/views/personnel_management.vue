<template>
  <div class="personnelBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>人员管理</span>
        <el-input
          placeholder="成员名称"
          prefix-icon="el-icon-search"
          v-model="key"
          @keyup.enter.native="searchEnter"
        >
        </el-input>
        <el-button type="primary" @click="addClick">
          <i class="el-icon-circle-plus el-icon--left"></i>新增
        </el-button>
      </div>
      <!-- 表格 -->
      <div class="tableBox">
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="成员名称"> </el-table-column>
          <el-table-column prop="class" label="部门"> </el-table-column>
          <el-table-column prop="role" label="成员角色"> </el-table-column>
          <el-table-column prop="phone" label="手机号码"> </el-table-column>
          <el-table-column prop="mail" label="电子邮箱"> </el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
          <el-table-column prop="hours" label="工时(h)"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button
                type="text"
                :class="scope.row.status == true ? 'danger' : ''"
                @click="switchClick(scope.row.status = !scope.row.status)"
              >
                {{ scope.row.status == true ? '禁用' : '启用'}}
              </el-button>
              <el-button
                type="text"
                @click="editClick(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                @click="deleteClick(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新增弹框 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="item-group">
          <el-form-item label="名称" class="star">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色" class="star">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="经理" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="部门" class="star multiple-item">
          <el-select v-model="form.class" placeholder="请选择一级部门">
            <el-option label="测试与验证中心" value="1"></el-option>
            <el-option label="研发中心" value="2"></el-option>
          </el-select>
          <el-select
            v-model="form.secondClass"
            placeholder="请选择二级部门"
            v-if="form.class"
            class="ml-2"
          >
            <el-option label="硬件中心" value="11"></el-option>
            <el-option label="软件中心" value="12"></el-option>
          </el-select>
          <el-select
            v-model="form.groupName"
            placeholder="请选择三级部门"
            v-if="form.secondClass"
            class="ml-2"
          >
            <el-option label="A组" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <div class="item-group">
          <el-form-item label="手机号码" class="star">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" class="star">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
        </div>
        <div class="item-group">
          <el-form-item label="密码" class="star">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </div>
        <div class="item-group">
          <el-form-item label="状态" class="star status">
            <el-switch v-model="form.status" active-text="禁用"> </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClick">提交</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹框 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索key
      key: "",
      // 弹框状态
      dialogVisible: false,
      // 弹框名称
      titleName: "",
      // 表格数据
      tableData: [
        {
          id: 1,
          name: "迪迦",
          class: "测试中心",
          role: "管理员",
          phone: "17751190097",
          mail: "1290371062@qq.com",
          time: "2019-07-27 10:30",
          hours: "100",
          status: true, // 启用/禁用状态
        },
        {
          id: 2,
          name: "赛罗",
          class: "检验中心",
          role: "管理员",
          phone: "17751190097",
          mail: "1290371062@qq.com",
          time: "2019-07-27 10:30",
          hours: "100",
          status: false, // 启用/禁用状态
        },
      ],
      // 弹框数据
      form: {
        name: "", // 名称
        role: "", // 角色
        class: "", // 一级部门
        secondClass: "", // 二级部门
        groupName: "", // 小组名称
        phone: "", // 手机号
        mail: "", // 电子邮箱
        password: "", // 密码
        status: "", // 状态
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 自定义方法函数
  methods: {
    // 搜索
    searchEnter() {
      // console.log(this.key, 111);
    },
    // 新增
    addClick() {
      this.dialogVisible = true;
      this.titleName = "新增";
      this.form = {
        name: "",
        role: "",
        class: "",
        secondClass: "",
        groupName: "",
        phone: "",
        mail: "",
        password: "",
        status: false,
      };
    },
    // 编辑
    editClick(i, v) {
      console.log(v, "编辑");
      this.titleName = "编辑";
      // if (v.type == 1) {
      //   var form = {
      //     name: "",
      //     class: v.class,
      //     secondClass: "",
      //   };
      // } else if (v.type == 2) {
      //   var form = {
      //     name: "",
      //     class: "",
      //     secondClass: v.class,
      //   };
      // } else {
      //   var form = {
      //     name: v.class,
      //     class: "",
      //     secondClass: "",
      //   };
      // }
      // this.form = form;
      this.dialogVisible = true;
    },
    // 保存
    saveClick() {
      this.dialogVisible = false;
      console.log("保存成功");
    },
    // 删除
    deleteClick(i, v) {
      console.log(i, v, "删除");
      this.$confirm("是否删除此项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },


  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>