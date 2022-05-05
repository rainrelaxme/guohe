<template>
  <div class="templateBox mainBox">
    <div class="main bg-white boxShadow">
      <!-- 标题 -->
      <div class="title flex-center">
        <span>项目模板</span>
        <el-input
          placeholder="模板名称"
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
          <el-table-column prop="type" label="项目类型"> </el-table-column>
          <el-table-column prop="time" label="创建时间"> </el-table-column>
          <el-table-column prop="time" label="更新时间"> </el-table-column>
          <el-table-column label="操作" class-name="col-btn">
            <template slot-scope="scope">
              <el-button type="text" @click="useClick(scope.row)">
                使用
              </el-button>
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
      width="60%"
      @opened="creatEditor"
      @closed="hideEditor"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称" class="star">
          <el-input v-model="form.name" :disabled="isEditor"></el-input>
        </el-form-item>
        <div class="item-group">
          <el-form-item label="项目类型" class="star">
            <el-select v-model="form.role" placeholder="" :disabled="isEditor">
              <el-option label="硬件开发" value="1"></el-option>
              <el-option label="软件开发" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目级别" class="star">
            <el-select v-model="form.role" placeholder="" :disabled="isEditor">
              <el-option label="1级" value="1"></el-option>
              <el-option label="2级" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item-group">
          <el-form-item label="项目阶段" class="star">
            <el-select v-model="form.role" placeholder="" :disabled="isEditor">
              <el-option label="硬件开发" value="1"></el-option>
              <el-option label="软件开发" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目管理人" class="star">
            <el-select v-model="form.role" placeholder="" :disabled="isEditor">
              <el-option label="1级" value="1"></el-option>
              <el-option label="2级" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- <div class="item-group">
          <el-form-item label="项目团队">
            <el-input
              type="textarea"
              v-model="form.desc"
              @focus="innerVisible = true"
            ></el-input>
          </el-form-item>
        </div> -->

        <!-- 富文本编辑器 -->
        <el-form-item label="项目说明">
          <div id="editorBox" ref="editorBox"></div>
        </el-form-item>
        <!-- 富文本编辑器 end -->
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!isEditor">
        <el-button type="primary" @click="saveClick">提交</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹框 end -->

    <!-- 团队成员 -->
    <el-dialog width="55%" title="选择人员" :visible.sync="innerVisible">
      <el-input
        placeholder="输入搜索关键字"
        prefix-icon="el-icon-search"
        v-model="key"
        class="search mb-2"
        @keyup.enter.native="searchStaffEnter"
      >
      </el-input>
      <el-row class="staffBox">
        <el-col :span="10">
          <el-tree
            :data="staffData"
            show-checkbox
            node-key="id"
            ref="staffData"
            :default-checked-keys="staffList"
            :props="defaultProps"
          >
          </el-tree>
        </el-col>
        <el-col :span="6">
          <div class="btnGroup">
            <el-button
              type="info"
              plain
              class="mb-2"
              size="small"
              icon="el-icon-thumb"
              @click="addStaffAll"
              >添加全部</el-button
            >
            <el-button
              type="info"
              plain
              class="mb-2"
              size="small"
              icon="el-icon-thumb"
              @click="removeStaffAll"
              >移除全部</el-button
            >
            <el-button
              type="info"
              plain
              class="mb-2"
              size="small"
              icon="el-icon-thumb"
              @click="addStaff"
              >添加</el-button
            >
            <el-button
              type="info"
              plain
              class="mb-2"
              size="small"
              icon="el-icon-thumb"
              @click="removeStaff"
              >移除</el-button
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="staffList">
            <p v-for="(v, i) in staffList" :key="i">
              <el-checkbox v-model="v.checked">{{ v.label }}</el-checkbox>
            </p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
    <!-- 团队成员 end -->
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      // 富文本编辑器
      // editor: null,
      // 是否可编辑
      isEditor: false,
      // 搜索key
      key: "",
      // 弹框状态
      dialogVisible: false,
      // 弹框名称
      titleName: "",
      // 内层弹框
      innerVisible: false,
      // 富文本内用
      editorHtml: "",
      // 表格数据
      tableData: [
        {
          id: 1,
          number: "E0001",
          name: "轨迹球",
          type: "开发",
          time: "2019-07-27 10:30",
        },
        {
          id: 2,
          number: "E0002",
          name: "轨迹球求求",
          type: "开发",
          time: "2019-07-27 10:30",
        },
      ],
      // 弹框数据
      form: {},
      // 项目人员
      staffData: [
        {
          id: 1,
          label: "部门1",
          isBranch: true,
          children: [
            {
              id: 11,
              label: "部门1-1",
              isBranch: true,
              children: [
                {
                  id: 111,
                  label: "王二麻",
                  isBranch: false,
                },
              ],
            },
            {
              id: 12,
              label: "李四",
              isBranch: false,
            },
          ],
        },
        {
          id: 2,
          label: "部门2",
          isBranch: true,
        },
        {
          id: 3,
          label: "部门3",
          isBranch: true,
          children: [
            {
              id: 31,
              label: "小米",
              isBranch: false,
            },
            {
              id: 32,
              label: "oppo",
              isBranch: false,
            },
          ],
        },
        {
          id: 4,
          label: "部门4",
          isBranch: true,
          children: [
            {
              id: 41,
              label: "华为",
              isBranch: false,
            },
            {
              id: 42,
              label: "vivo",
              isBranch: false,
            },
          ],
        },
        {
          id: 5,
          label: "部门5",
          isBranch: true,
          children: [
            {
              id: 51,
              label: "魅族",
              isBranch: false,
            },
            {
              id: 52,
              label: "锤子",
              isBranch: false,
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 已选中人员数据
      staffList: [],
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
    // 人员搜索
    searchStaffEnter() {},
    // 查看
    lookClick(v) {
      this.titleName = "查看";
      this.form = {};
      this.isEditor = true;
      this.dialogVisible = true;
    },
    // 新增
    addClick() {
      this.titleName = "新增";
      this.form = {};

      this.dialogVisible = true;
    },
    // 编辑
    editClick(v) {
      // console.log(v, "编辑");
      this.titleName = "编辑";
      this.form = {};

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
    // 添加全部
    addStaffAll() {
      this.$refs.staffData.setCheckedNodes(this.staffData);
      this.addStaff();
    },
    // 移除全部
    removeStaffAll() {
      this.$refs.staffData.setCheckedNodes([]);
      var arr = [];
      this.staffList = arr;
    },
    // 添加
    addStaff() {
      var data = this.$refs.staffData.getCheckedNodes();
      var arr = [];
      data.forEach((v) => {
        if (v.isBranch == false) {
          arr.push({
            id: v.id,
            label: v.label,
            isBranch: v.isBranch,
            checked: false,
          });
        }
      });
      this.staffList = arr;
    },
    // 移除
    removeStaff() {
      var data = this.staffList;
      var arr = [];
      data.forEach((v) => {
        if (v.checked == false) {
          arr.push(v.id);
        }
      });
      // 移除逻辑：取得不移除的人员（checked == false）id列表，
      // 通过下方setCheckedKeys（id数组）方法设置树形控件选中，
      // 接下来相当于再次添加渲染一遍
      this.$refs.staffData.setCheckedKeys(arr);
      this.addStaff();
    },
    // 创建editor实例
    creatEditor() {
      this.editor = new E("#editorBox");
      this.editor.create();
      if (this.isEditor == true) {
        this.editor.disable();
      }
    },
    // 销毁editor实例
    hideEditor() {
      console.log("关闭");
      this.editor.destroy();
      // this.editor = null;
      this.isEditor = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>