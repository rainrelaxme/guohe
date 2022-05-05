<template>
  <div class="backupsBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>备份管理</span>
        <el-input
          placeholder="备份名称"
          prefix-icon="el-icon-search"
          v-model="key"
          @keyup.enter.native="searchEnter"
        >
        </el-input>
        <el-button type="primary" @click="backupsClick">
          <i class="el-icon-circle-plus el-icon--left"></i>备份
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
          <el-table-column prop="dataSize" label="数据大小"> </el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button type="text">
                <a href="javascript:;">下载</a>
              </el-button>
              <el-button type="text" @click="recoveryClick(scope.row)">
                恢复
              </el-button>
              <el-button type="text" @click="deleteClick(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 备份弹框 -->
    <el-dialog
      title="备份"
      :visible.sync="dialogVisible"
      width="20%"
      custom-class="backDialog"
    >
      <el-progress
        v-show="percentage != 100"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
      ></el-progress>
      <h5 class="center" v-show="percentage == 100">{{ backupTips }}</h5>
      <span slot="footer" class="dialog-footer" v-show="percentage == 100">
        <el-button type="primary" size="small" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 备份弹框 end -->
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
      // 进度条
      percentage: 60,
      // 备份说明
      backupTips: "",
      // 表格数据
      tableData: [
        {
          id: 1,
          number: "E0001",
          dataSize: "1.4MB",
          time: "2019-07-27 10:30",
        },
        {
          id: 2,
          number: "E0002",
          dataSize: "1.4MB",
          time: "2019-07-27 10:30",
        },
      ],
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
    // 备份
    backupsClick() {
      this.backupTips = "备份成功！";
      this.dialogVisible = true;
    },
    // 恢复
    recoveryClick() {
      this.backupTips = "备份恢复成功！";
      this.dialogVisible = true;
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