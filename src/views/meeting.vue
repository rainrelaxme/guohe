<template>
  <div class="meetingBox mainBox">
    <el-row class="main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有会议信息" name="1">
          <div class="search border">
            <p class="tit">
              <span>搜索查询</span>
              <i
                :class="
                  isShow == false ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                "
                @click="show"
              >
              </i>
            </p>
            <el-collapse-transition>
              <div class="condition" v-show="isShow">
                <el-form ref="form" :model="form" label-width="100px">
                  <el-row>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="项目编号">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="项目模块">
                        <el-select
                          v-model="form.region"
                          placeholder="请选择项目模块"
                        >
                          <el-option
                            label="模块一"
                            value="shanghai"
                          ></el-option>
                          <el-option label="模块二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="会议名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="指派人">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="会议时间">
                        <div class="block">
                          <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <p class="btnGroup">
                  <el-button size="small" type="primary">查询</el-button>
                  <el-button size="small" type="info">重置</el-button>
                </p>
              </div>
            </el-collapse-transition>
          </div>
          <div class="tableBox border">
            <div class="tableTitle">
              <el-button size="small" type="primary" @click="addClick"
                >新增</el-button
              >
              <el-button size="small" type="primary" @click="abolishClick"
                >废止</el-button
              >
              <el-button size="small" type="primary">导入</el-button>
              <el-button size="small" type="primary">导出</el-button>
              <el-button size="small" type="primary">模板下载</el-button>
            </div>
            <template>
              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="编号" width="100">
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
                <el-table-column prop="name" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="item"
                  label="所属项目"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="itemNum" label="项目编号">
                </el-table-column>
                <el-table-column prop="date" label="会议时间">
                </el-table-column>
                <el-table-column label="操作" class-name="col-btn">
                  <template slot-scope="scope">
                    <el-button type="text" @click="drawer = true">
                      查看
                    </el-button>
                    <el-button type="text" @click="editClick(scope.row)">
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 表格 end -->
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我管理的会议" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="我参与的会议" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="草稿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="废止会议" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 新增弹窗 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="40%">
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="名称" class="star">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
        <div class="item-group">
          <el-form-item label="所属项目" class="star">
            <el-select v-model="addform.name" placeholder="请选择项目">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属模块" class="star">
            <el-select v-model="addform.name" placeholder="请选择模块">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item-group">
          <el-form-item label="主持人" class="star">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="会议日期" class="star">
            <div class="block">
              <el-date-picker
                v-model="addform.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="与会人员" class="star">
          <el-input
            type="textarea"
            v-model="addform.per"
            @focus="innerVisible = true"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传附件" class="m-0">
          <el-upload class="upload-demo" action="">
            <el-button size="small" type="success">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="saveClick">存为草稿</el-button>
        <el-button size="small" type="primary" @click="publishClick">立即发布</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹窗 end -->

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
        <el-button type="primary" @click="sureClick">确定</el-button>
      </span>
    </el-dialog>
    <!-- 团队成员 end -->

    <!-- 查看抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      custom-class="lookMeeting"
      :show-close="false"
      size="60%"
      style="overflow:auto"
    >
      <template slot="title"
        ><i class="el-icon-switch-button mr-2" @click="drawer = false"></i>
        查看会议</template
      >
      <el-row>
        <el-col :md="24" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">当前状态:</span
            ><span class="blue">已发布</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">会议名称:</span
            ><span>XXX安全仪表开发项目周例会</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">编号:</span><span>M-1</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">所属项目:</span
            ><span>XXX安全仪表项目开发</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">所属模块:</span><span>需求</span></p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p><span class="tit mr-3">描述:</span><span>这是一个描述</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">主持人:</span><span>小王</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">会议时间:</span><span>2020-11-11</span></p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p><span class="tit mr-3">与会人员:</span><span>小名，小红</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">创建人:</span><span>张三</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">创建时间:</span
            ><span>2020-11-11 11:11:11</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">更新人:</span><span>小王</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">更新时间:</span
            ><span>2020-11-11 11:11:11</span>
          </p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">附件:</span>
            <span>
              <a href="javascript:;">
                <el-button size="small" type="success">下载</el-button>
              </a>
            </span>
          </p>
        </el-col>
      </el-row>

      <!-- 折叠面板 -->
      <el-collapse v-model="pannelName" accordion>
        <el-collapse-item v-for="(v,i) in pannelList" :key="i" :title="v.date" :name="v.id">
          <div>{{v.desc}}</div>
          <div>{{v.con}}</div>
        </el-collapse-item>
      </el-collapse>
      <!-- 折叠面板 end -->
    </el-drawer>
    <!-- 查看抽屉 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始tab卡
      activeName: "1",
      // 初始折叠面板
      pannelName: "1",
      // 弹窗状态
      dialogVisible: false,
      // 弹窗名称
      titleName: "",
      // 项目人员弹窗
      innerVisible: false,
      // 搜索条件是否显示
      isShow: false,
      // 查看抽屉状态
      drawer: false,
      // 搜索条件
      form: {
        name: "",
        region: "",
        date: "",
      },
      // 新增
      addform: {
        name: "",
        date: "",
        per: "",
        desc: "",
      },
      // 日期范围
      dateRange: [],
      // 表格
      tableData: [
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      // 项目搜索条件
      key: "",
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
      // 折叠面板
      pannelList: [
        {
          id: 1,
          date: "2019-07-23 10:35",
          desc: "张三发布了新的会议",
          con: "会议名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 2,
          date: "2019-07-23 10:35",
          desc: "翻斗大街胡图图",
          con: "会议名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 3,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "会议名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 4,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "会议名称：XXX安全仪表开发项目周例会",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 自定义方法函数
  methods: {
    // 显示搜索条件
    show() {
      this.isShow = !this.isShow;
    },
    // 人员搜索
    searchStaffEnter() {},
    // 废止
    abolishClick() {
      this.$confirm("确认废止?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "废止成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消废止",
          });
        });
    },
    // 选择复选框
    handleSelectionChange() {
      console.log("选中了我");
    },
    // 查看
    lookClick(v) {},
    // 新增
    addClick() {
      this.titleName = "新增";
      this.form = {
        number: "", // 编号
        name: "", // 名称
        desc: "", // 描述
      };

      this.dialogVisible = true;
    },
    // 编辑
    editClick(v) {
      // console.log(v, "编辑");
      this.titleName = "编辑";
      this.form = {
        number: v.number,
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
    // 立即发布
    publishClick() {},
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
    // 选择人员确定
    sureClick() {
      var arr = [];
      this.staffList.forEach((v) => {
        arr.push(v.label);
      });
      this.addform.per = arr.toString();
      this.innerVisible = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>