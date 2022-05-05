<template>
  <div class="meetingBox mainBox">
    <el-row class="itemBox main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有项目信息" name="1">
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
                      <el-form-item label="项目类型">
                        <el-select
                          v-model="form.region"
                          placeholder="请选择项目类型"
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
                      <el-form-item label="项目管理人">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="计划开始">
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
                    <el-col :md="8" :xs="24">
                      <el-form-item label="计划结束">
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
                      <el-form-item label="项目状态" size="small">
                        <div class="select">
                          <span
                            @click="resultIndex = 0"
                            :class="resultIndex == 0 ? 'active' : ''"
                            >全部</span
                          >
                          <span
                            @click="resultIndex = 1"
                            :class="resultIndex == 1 ? 'active' : ''"
                            >未开始</span
                          >
                          <span
                            @click="resultIndex = 2"
                            :class="resultIndex == 2 ? 'active' : ''"
                            >进行中</span
                          >
                          <span
                            @click="resultIndex = 3"
                            :class="resultIndex == 3 ? 'active' : ''"
                            >已结束</span
                          >
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :xs="24">
                      <el-form-item label="是否超期" size="small">
                        <div class="select">
                          <span
                            @click="index = 0"
                            :class="index == 0 ? 'active' : ''"
                            >全部</span
                          >
                          <span
                            @click="index = 1"
                            :class="index == 1 ? 'active' : ''"
                            >未超期</span
                          >
                          <span
                            @click="index = 2"
                            :class="index == 2 ? 'active' : ''"
                            >已超期</span
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
            <div class="tableTitle flex-between">
              <div>所有项目信息</div>
              <el-button size="small" type="primary" @click="addClick"
                >新增</el-button
              >
            </div>

            <!-- 所有项目信息 -->
            <div class="allItem">
              <div class="item">
                <div class="tit flex-between">
                  <el-row>
                    <el-col :md="12" :xs="24">XXX安全仪表开发项目周例会</el-col>
                    <el-col :md="12" :xs="24" class="time">2019-07-08 至 2019-10-11</el-col>
                  </el-row>
                </div>
                <div class="itemMain">
                  <span><i class="icon"></i>项目状态：进行中</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="icon"></i>项目类型：硬件开发项目</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="icon"></i>项目阶段：需求调研</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="icon"></i>项目经理：张三</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="progressBox">
                    <i class="icon"></i>
                    <span>时间进度：</span>
                    <el-progress :percentage="50"></el-progress>
                  </span>
                  <span>
                    <el-button size="small" type="primary">开始</el-button>
                  </span>
                </div>
              </div>

              
            </div>
            <!-- 所有项目信息 end -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="我管理的项目" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="我参与的项目" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="草稿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="废止项目" name="5">定时任务补偿</el-tab-pane>
        <el-tab-pane label="存档" name="6">存档</el-tab-pane>
      </el-tabs>
    </el-row>



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
        >查看项目
      </template>
      <el-row>
        <el-col :md="24" :xs="24" class="item b-b">
          <span class="tit mr-3">当前状态:</span
          ><span class="blue mr-5">已发布</span>
          <span class="tit mr-3">项目变更:</span><span class="blue">2次</span>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">项目名称:</span
            ><span>XXX安全仪表开发项目周例会</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">编号:</span><span>AB-20201111-2</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">所属项目:</span
            ><span>XXX安全仪表项目开发</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">关联用例:</span><span>需求</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">项目级别:</span
            ><span>XXX安全仪表项目开发</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">项目类型:</span><span>需求</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">操作系统:</span
            ><span>XXX安全仪表项目开发</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">浏览器:</span><span>需求</span></p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">操作步骤:</span><span>这是操作步骤</span>
          </p>
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
          <p><span class="tit mr-3">执行人:</span><span>小王</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">执行时间:</span
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
      // 弹窗名称
      titleName: "",
      // 搜索条件是否显示
      isShow: false,
      // 搜索-结果
      resultIndex: 0,
      // 搜索-状态
      index: 0,
      // 是否显示基准线
      isEdit: false,
      // 是否是解决
      isSolve: false,
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
          level: 1,
          num: "AB-20201111-2",
          title: "用户添加",
          itemNum: "KFXM2019001",
          status: false, // 开始/结束状态
          creater: "小王",
        },
        {
          date: "2020-11-11 11:11:11",
          level: 1,
          num: "AB-20201111-2",
          title: "用户添加",
          itemNum: "KFXM2019001",
          status: true, // 开始/结束状态
          creater: "小王",
        },
        {
          date: "2020-11-11 11:11:11",
          level: 1,
          num: "AB-20201111-2",
          title: "用户添加",
          itemNum: "KFXM2019001",
          status: true, // 开始/结束状态
          creater: "小王",
        },
        {
          date: "2020-11-11 11:11:11",
          level: 1,
          num: "AB-20201111-2",
          title: "用户添加",
          itemNum: "KFXM2019001",
          status: true, // 开始/结束状态
          creater: "小王",
        },
      ],
      // 折叠面板
      pannelList: [
        {
          id: 1,
          date: "2019-07-23 10:35",
          desc: "张三发布了新的项目",
          con: "项目名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 2,
          date: "2019-07-23 10:35",
          desc: "翻斗大街胡图图",
          con: "项目名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 3,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "项目名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 4,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "项目名称：XXX安全仪表开发项目周例会",
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
    submitClick() {},
    // 指派提交
    submitClick() {},
    // 新增
    addClick() {
      this.titleName = "新增";
      this.form = {
        number: "", // 编号
        name: "", // 名称
        desc: "", // 描述
      };
      this.drawer = true
    },
    // 解决
    solveClick() {
      this.titleName = "解决";
      this.isSolve = true;
    },
    // 中断
    breakClick() {},
    // 禁用
    switchClick() {},
    // 编辑
    editClick(v) {
      this.isEdit = true;
      this.titleName = "编辑";
      this.form = {
        number: v.number,
        name: v.name,
        desc: v.desc,
      };

    },
    // 保存
    saveClick() {
      
      console.log("保存成功");
    },
    // 立即提交
    publishClick() {},
    //表格加中划线
    lineClassName(row) {
      if (row.row.status == false) {
        return "disabled-line";
      }
      return "";
    },
    // 关闭新增弹窗
    closedDialog() {
      this.isEdit = false;
      this.isSolve = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>