<template>
  <div class="meetingBox mainBox">
    <el-row class="testBox main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有测试信息" name="1">
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
                      <el-form-item label="基线名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="指派人">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="测试时间">
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
                      <el-form-item label="结果" size="small">
                        <div class="select">
                          <span
                            @click="resultIndex = 0"
                            :class="resultIndex == 0 ? 'active' : ''"
                            >全部</span
                          >
                          <span
                            @click="resultIndex = 1"
                            :class="resultIndex == 1 ? 'active' : ''"
                            >正常</span
                          >
                          <span
                            @click="resultIndex = 2"
                            :class="resultIndex == 2 ? 'active' : ''"
                            >异常</span
                          >
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
                            >已提交</span
                          >
                          <span
                            @click="index = 2"
                            :class="index == 2 ? 'active' : ''"
                            >已发布</span
                          >
                          <span
                            @click="index = 3"
                            :class="index == 3 ? 'active' : ''"
                            >未通过</span
                          >
                          <span
                            @click="index = 4"
                            :class="index == 4 ? 'active' : ''"
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
              <el-button size="small" type="primary">领取</el-button>
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
                <el-table-column label="编号" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
                <el-table-column
                  prop="level"
                  label="级别"
                  width="55"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="title"
                  label="用例标题"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="creater" label="用例类型">
                </el-table-column>
                <el-table-column prop="creater" label="创建"> </el-table-column>
                <el-table-column prop="creater" label="执行人">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="更新时间"
                  min-width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="status" label="结果">
                  <template slot-scope="scope">
                    {{ scope.row.status == true ? "已解决" : "已关闭" }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                  <template slot-scope="scope">
                    {{ scope.row.status == true ? "已发布" : "未发布" }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  min-width="200"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      :class="scope.row.status == false ? 'danger' : ''"
                      @click="
                        switchClick((scope.row.status = !scope.row.status))
                      "
                    >
                      {{ scope.row.status == false ? "结束" : "开始" }}
                    </el-button>
                    <el-button type="text" @click="assessmentClick">
                      评估
                    </el-button>
                    <el-button type="text" @click="carryClick">
                      执行
                    </el-button>
                    <el-button type="text" @click="generateClick">
                      生成异常
                    </el-button>
                    <el-button type="text">关闭</el-button>
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
        <el-tab-pane label="我管理的测试" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="我参与的测试" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="草稿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="废止测试" name="5">定时任务补偿</el-tab-pane>
        <el-tab-pane label="指派我的测试" name="6">指派我的测试</el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 新增弹窗 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      @closed="closedDialog"
      width="50%"
    >
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="执行结果" v-show="isSolve">
          <el-select
            class="w-100"
            v-model="addform.name"
            placeholder="请选择结果"
          >
            <el-option label="已解决" value="1"></el-option>
            <el-option label="未解决" value="2"></el-option>
            <el-option label="不予解决" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" v-show="isSolve">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="名称" class="star" v-show="!isSolve">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
        <div class="item-group" v-show="!isSolve">
          <el-form-item label="所属项目" class="star">
            <el-select v-model="addform.name" placeholder="请选择项目">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联需求" v-show="!isCreateUnusual">
            <el-select v-model="addform.name" placeholder="请选择关联需求">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联用例" v-show="isCreateUnusual">
            <el-select v-model="addform.name" placeholder="请选择关联用例">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item-group" v-show="!isSolve && !isCreateUnusual">
          <el-form-item label="用例类型" class="star">
            <el-select v-model="addform.name" placeholder="请选择测试级别">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用例级别" class="star">
            <el-select v-model="addform.name" placeholder="请选择测试类型">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item-group" v-show="isCreateUnusual">
          <el-form-item label="操作系统" class="star">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="浏览器" class="star">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
        </div>
        <div class="item-group" v-show="isCreateUnusual">
          <el-form-item label="指派" class="star">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="测试日期" class="star">
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
        <el-form-item label="复现步骤" v-show="isCreateUnusual">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="前置条件" v-show="!isSolve && !isCreateUnusual">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item
          label="操作步骤"
          class="star"
          v-show="!isSolve && !isCreateUnusual"
        >
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item
          label="预期结果"
          class="star"
          v-show="!isSolve && !isCreateUnusual"
        >
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传附件" class="m-0">
          <el-upload class="upload-demo beforeBaseline" action="">
            <el-button size="small" type="success">点击上传</el-button>
          </el-upload>
          <el-checkbox
            class="ml-3"
            v-model="addform.desc"
            v-show="isEdit || isSolve || isCreateUnusual"
            >设为基准线</el-checkbox
          >
        </el-form-item>
        <el-form-item label="修改备注" v-show="isEdit">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          type="success"
          @click="saveClick"
          v-show="!isSolve"
          >存为草稿</el-button
        >
        <el-button size="small" type="primary" @click="publishClick"
          >立即提交</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增弹窗 end -->

    <!-- 评估弹窗 -->
    <el-dialog title="评估" :visible.sync="assessmentVisible" width="40%">
      <el-table :data="assessmentTableData" border>
        <el-table-column prop="num" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="desc" label="判据" align="center">
        </el-table-column>
        <el-table-column label="评估" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.status">
              <el-option label="Y" value="1"></el-option>
              <el-option label="N" value="2"></el-option>
              <el-option label="不使用" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="assessmentSaveClick"
          >提交</el-button
        >
      </span>
    </el-dialog>
    <!-- 评估弹窗 end -->

    <!-- 指派弹窗 -->
    <el-dialog title="指派人员" :visible.sync="assignVisible" width="30%">
      <el-form ref="addform" :model="addform">
        <el-form-item>
          <el-select
            v-model="addform.name"
            placeholder="请选择指派人员"
            class="w-100"
          >
            <el-option label="子项目1" value="1"></el-option>
            <el-option label="子项目2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitClick" size="small"
          >提交</el-button
        >
        <el-button type="" @click="assignVisible = false" size="small"
          >取消</el-button
        >
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
        >查看测试用例
      </template>
      <el-row>
        <el-col :md="24" :xs="24" class="item b-b">
          <span class="tit mr-3">当前状态:</span
          ><span class="blue mr-5">已发布</span>
          <span class="tit mr-3">测试变更:</span><span class="blue">2次</span>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">用例名称:</span
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
          <p><span class="tit mr-3">关联需求:</span><span>需求</span></p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">用例类型:</span
            ><span>XXX安全仪表项目开发</span>
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p><span class="tit mr-3">用例级别:</span><span>需求</span></p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">前置条件:</span><span>这是一个描述</span>
          </p>
        </el-col>
        <el-col :md="24" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">操作步骤:</span><span>这是操作步骤</span>
          </p>
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
      // 弹窗状态
      dialogVisible: false,
      // 指派弹窗状态
      assignVisible: false,
      // 弹窗名称
      titleName: "",
      // 评估弹窗状态
      assessmentVisible: false,
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
      // 是否是生成异常
      isCreateUnusual: false,
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
          desc: "张三发布了新的测试",
          con: "测试名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 2,
          date: "2019-07-23 10:35",
          desc: "翻斗大街胡图图",
          con: "测试名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 3,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "测试名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 4,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "测试名称：XXX安全仪表开发项目周例会",
        },
      ],
      // 评估表格
      assessmentTableData: [
        {
          num: 1,
          desc: "是否足够严谨？",
          status: "1",
        },
        {
          num: 2,
          desc: "是否足够安全？",
          status: "3",
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

      this.dialogVisible = true;
    },
    // 评估
    assessmentClick() {
      this.assessmentVisible = true;
    },
    // 评估保存
    assessmentSaveClick() {
      this.assessmentVisible = false;
    },
    // 执行
    carryClick() {
      this.titleName = "执行";
      this.isSolve = true;
      this.dialogVisible = true;
    },
    // 生成异常
    generateClick() {
      this.titleName = "生成异常";
      this.isCreateUnusual = true;
      this.dialogVisible = true;
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

      this.dialogVisible = true;
    },
    // 保存
    saveClick() {
      this.dialogVisible = false;
      console.log("保存成功");
    },
    // 立即提交
    publishClick() {},
    // 关闭新增弹窗
    closedDialog() {
      this.isEdit = false;
      this.isSolve = false;
      this.isCreateUnusual = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>