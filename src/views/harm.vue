<template>
  <div class="meetingBox mainBox">
    <el-row class="dangerBox main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有危害信息" name="1">
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
                      <el-form-item label="危害名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="指派人">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="危害时间">
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
                    <el-col :md="24" :xs="24">
                      <el-form-item label="状态" size="small">
                        <div class="select">
                          <span
                            @click="index = 0"
                            :class="index == 0 ? 'active' : ''"
                            >全部</span
                          >
                          <span
                            @click="index = 1"
                            :class="index == 1 ? 'active' : ''"
                            >已发布</span
                          >
                          <span
                            @click="index = 2"
                            :class="index == 2 ? 'active' : ''"
                            >已中断</span
                          >
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
              <el-button
                size="small"
                type="primary"
                @click="assignVisible = true"
                >指派</el-button
              >
              <el-button size="small" type="primary" @click="breakClick"
                >中断</el-button
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
                <el-table-column label="编号" width="50">
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
                <el-table-column prop="itemNum" label="指派"> </el-table-column>
                <el-table-column
                  prop="date"
                  label="危害时间"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="num" label="更新人" width="100">
                </el-table-column>
                <el-table-column prop="num" label="状态"> </el-table-column>
                <el-table-column label="操作" class-name="col-btn">
                  <template slot-scope="scope">
                    <el-button type="text" @click="drawer = true">
                      查看
                    </el-button>
                    <el-button type="text" @click="editClick(scope.row)">
                      编辑
                    </el-button>
                    <el-button
                      type="text"
                      :class="scope.row.status == true ? 'danger' : ''"
                      @click="
                        switchClick((scope.row.status = !scope.row.status))
                      "
                    >
                      {{ scope.row.status == true ? "禁用" : "启用" }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 表格 end -->
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我管理的危害" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="我参与的危害" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="草稿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="废止危害" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 新增弹窗 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="50%">
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
          <el-form-item label="指派" class="star">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="危害日期" class="star">
            <div class="block">
              <el-date-picker
                v-model="addform.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
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

    <!-- 指派弹窗 -->
    <el-dialog title="指派人员" :visible.sync="assignVisible" width="30%">
      <el-form ref="addform" :model="addform">
        <el-form-item>
          <el-select v-model="addform.name" placeholder="请选择指派人员" class="w-100">
            <el-option label="子项目1" value="1"></el-option>
            <el-option label="子项目2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitClick" size="small">提交</el-button>
        <el-button type="" @click="assignVisible = false" size="small">取消</el-button>
      </span>
    </el-dialog>
    <!-- 指派弹窗 end -->

    <!-- 查看抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      custom-class="lookMeeting"
      :show-close="false"
      size="60%"
      style="overflow: auto"
    >
      <template slot="title">
        <i class="el-icon-switch-button mr-2" @click="drawer = false"></i
        >查看危害
      </template>
      <el-row>
        <el-col :md="24" :xs="24" class="item b-b">
          <span class="tit mr-3">当前状态:</span
          ><span class="blue mr-5">已发布</span>
          <span class="tit mr-3">危害变更:</span><span class="blue">2次</span>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">危害名称:</span
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
          <p><span class="tit mr-3">指派给:</span><span>小王</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">指派时间:</span><span>2020-11-11</span></p>
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
        <el-collapse-item
          v-for="(v, i) in pannelList"
          :key="i"
          :title="v.date"
          :name="v.id"
        >
          <div>{{ v.desc }}</div>
          <div>{{ v.con }}</div>
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
      // 指派弹窗状态
      assignVisible: false,
      // 弹窗名称
      titleName: "",
      // 搜索条件是否显示
      isShow: false,
      // 搜索状态
      index: 0,
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
          status: false, // 启用/禁用状态
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          status: true, // 启用/禁用状态
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          status: true, // 启用/禁用状态
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2020-11-11 11:11:11",
          name: "XXX安全仪表开发项目周例会",
          num: "M-1",
          item: "XXX安全仪表开发项目",
          itemNum: "KFXM2019001",
          status: true, // 启用/禁用状态
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      // 折叠面板
      pannelList: [
        {
          id: 1,
          date: "2019-07-23 10:35",
          desc: "张三发布了新的危害",
          con: "危害名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 2,
          date: "2019-07-23 10:35",
          desc: "翻斗大街胡图图",
          con: "危害名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 3,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "危害名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 4,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "危害名称：XXX安全仪表开发项目周例会",
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
    // 指派
    submitClick(){

    },
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
    // 指派提交
    submitClick() {},
    // 中断
    breakClick() {},
    // 禁用
    switchClick() {},
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
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>