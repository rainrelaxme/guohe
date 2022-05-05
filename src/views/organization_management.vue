<template>
  <div class="organizationBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>组织管理</span>
        <el-input
          placeholder="部门名称"
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
          <el-table-column prop="class" label="部门"> </el-table-column>
          <el-table-column prop="date" label="创建时间"> </el-table-column>
          <el-table-column prop="date" label="更新时间"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="editClick(scope.$index, scope.row, scope.store)"
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
        <el-form-item label="名称" class="star">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" class="multiple-item">
          <el-select v-model="form.class" placeholder="请选择一级部门">
            <el-option label="测试与验证中心" value="1"></el-option>
            <el-option label="研发中心" value="2"></el-option>
          </el-select>
          <el-select v-model="form.secondClass" placeholder="请选择二级部门">
            <el-option label="硬件中心" value="11"></el-option>
            <el-option label="软件中心" value="12"></el-option>
          </el-select>
        </el-form-item>
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
      key: "", // 搜索key
      dialogVisible: false, // 弹框状态
      titleName: "", // 弹框名称
      // 表格数据
      tableData: [
        {
          id: 3,
          date: "2016-05-01",
          class: "测试与验证中心",
          type: 1,
          children: [
            {
              id: 31,
              date: "2016-05-01",
              class: "硬件中心",
              type: 2,
            },
            {
              id: 32,
              date: "2016-05-01",
              class: "软件中心",
              type: 2,
              children: [
                {
                  id: 321,
                  date: "2016-05-01",
                  class: "A组",
                  type: 3,
                },
                {
                  id: 322,
                  date: "2016-05-01",
                  class: "B组",
                  type: 3,
                },
              ],
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          class: "研发中心",
          type: 1,
        },
      ],
      // 弹框数据
      form: {
        name: "", // 小组名称
        class: "", // 一级部门
        secondClass: "", // 二级部门
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
        class: "",
        secondClass: "",
      };
    },
    // 编辑
    editClick(i, v) {
      this.titleName = "编辑";
      if (v.type == 1) {
        var form = {
          name: "",
          class: v.class,
          secondClass: "",
        };
      } else if (v.type == 2) {
        var form = {
          name: "",
          class: "",
          secondClass: v.class,
        };
      } else {
        var form = {
          name: v.class,
          class: "",
          secondClass: "",
        };
      }
      this.form = form;
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
    // 保存
    saveClick() {
      this.dialogVisible = false;
      console.log("保存成功");
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>