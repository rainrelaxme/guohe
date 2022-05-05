<template>
  <div class="jurisdictionBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>权限管理</span>
        <el-input
          placeholder="角色名称"
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
          <el-table-column prop="role" label="角色名"> </el-table-column>
          <el-table-column label="权限">
            <el-button type="text" @click="lookClick()"> 查看 </el-button>
          </el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button
                type="text"
                :class="scope.row.status == true ? 'danger' : ''"
                @click="switchClick((scope.row.status = !scope.row.status))"
              >
                {{ scope.row.status == true ? "禁用" : "启用" }}
              </el-button>
              <el-button
                type="text"
                @click="distributeClick(scope.$index, scope.row)"
              >
                分配权限
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
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="item-group">
          <el-form-item label="名称" class="star">
            <el-input v-model="form.name"></el-input>
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

    <!-- 权限弹框 -->
    <el-dialog
      :title="jurisdictionTitle"
      :visible.sync="jurisdictionVisible"
      width="30%"
    >
      <el-tree
        :data="jurisdictionData"
        show-checkbox
        node-key="id"
        @check-change="handleCheckChange"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureClick">确定</el-button>
      </span>
    </el-dialog>
    <!-- 权限弹框 end -->
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
      // 权限弹框
      jurisdictionVisible: false,
      // 弹框名称
      titleName: "",
      // 权限名称
      jurisdictionTitle: "",
      // 表格数据
      tableData: [
        {
          id: 1,
          role: "管理员",
          time: "2019-07-27 10:30",
          status: true, // 启用/禁用状态
        },
        {
          id: 2,
          role: "管理员",
          time: "2019-07-27 10:30",
          status: false, // 启用/禁用状态
        },
      ],
      // 弹框数据
      form: {
        name: "", // 名称
        status: "", // 状态
      },
      // 权限弹框数据
      jurisdictionData: [
        {
          id: 1,
          label: "工作台",
          disabled: true,
          children: [
            {
              id: 4,
              label: "项目",
              disabled: true,
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  disabled: true,
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  disabled: true,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "参数设置",
          disabled: true,
          children: [
            {
              id: 5,
              label: "二级 2-1",
              disabled: true,
            },
            {
              id: 6,
              label: "二级 2-2",
              disabled: true,
            },
          ],
        },
        {
          id: 3,
          label: "系统管理",
          disabled: true,
          children: [
            {
              id: 7,
              label: "二级 3-1",
              disabled: true,
            },
            {
              id: 8,
              label: "二级 3-2",
              disabled: true,
            },
          ],
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
    // 新增
    addClick() {
      this.dialogVisible = true;
      this.titleName = "新增";
      this.form = {
        name: "",
        status: false,
      };
    },
    // 编辑
    editClick(i, v) {
      // console.log(v, "编辑");
      this.titleName = "编辑";
      this.form = {
        name: v.role,
        status: v.status,
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
    // 查看权限
    lookClick() {
      this.jurisdictionVisible = true;
      this.jurisdictionTitle = "查看权限";
      var data = this.jurisdictionData;
      data.forEach((v) => {
        v.disabled = true;
        if (v.children) {
          v.children.forEach((v2) => {
            v2.disabled = true;
            if (v2.children) {
              v2.children.forEach((v3) => {
                v3.disabled = true;
              });
            }
          });
        }
      });
    },
    // 分配权限
    distributeClick() {
      this.jurisdictionVisible = true;
      this.jurisdictionTitle = "分配权限";
      var data = this.jurisdictionData;
      data.forEach((v) => {
        v.disabled = false;
        if (v.children) {
          v.children.forEach((v2) => {
            v2.disabled = false;
            if (v2.children) {
              v2.children.forEach((v3) => {
                v3.disabled = false;
              });
            }
          });
        }
      });
    },
    // 权限变化
    handleCheckChange() {},
    // 权限确定
    sureClick(){
      this.jurisdictionVisible = false;

    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>