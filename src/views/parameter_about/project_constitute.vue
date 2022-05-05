<template>
  <div class="projectConstituteBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>项目团队构成</span>
        <el-input
          placeholder="类别名称"
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
          <el-table-column prop="number" label="编号"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
          <el-table-column prop="time" label="更新时间"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button type="text" @click="lookClick(scope.row)">
                查看
              </el-button>
              <el-button type="text" @click="editClick(scope.row)">
                编辑
              </el-button>
              <el-button type="text" @click="deleteClick(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新增弹框 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      @closed="closeDialog"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <div class="item-group">
          <el-form-item label="名称" class="star">
            <el-input v-model="form.name" :disabled="isEditor"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              v-model="form.desc"
              :disabled="isEditor"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!isEditor">
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
      // 是否允许编辑
      isEditor: false,
      // 表格数据
      tableData: [
        {
          id: 1,
          number: "E0001",
          name: "轨迹球",
          time: "2019-07-27 10:30",
          desc: "轨迹球，是另外一种类型的鼠标，其工作原理与机械式鼠标相同。",
        },
        {
          id: 2,
          number: "E0002",
          name: "轨迹球求求",
          time: "2019-07-27 10:30",
          desc: "",
        },
      ],
      // 弹框数据
      form: {
        name: "", // 名称
        desc: "", // 描述
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
    // 查看
    lookClick(v) {
      this.titleName = "查看";
      this.form = {
        name: v.name,
        desc: v.desc,
      };
      this.isEditor = true;

      this.dialogVisible = true;
    },
    // 新增
    addClick() {
      this.titleName = "新增";
      this.form = {
        name: "", // 名称
        desc: "", // 描述
      };

      this.dialogVisible = true;
    },
    // 编辑
    editClick(v) {
      this.titleName = "编辑";
      this.form = {
        name: v.name,
        desc: v.desc,
      };

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
    // 关闭弹框
    closeDialog() {
      this.isEditor = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>