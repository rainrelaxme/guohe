<template>
  <div class="meetingBox mainBox">
    <el-row class="needsBox main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有需求信息" name="1">
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
                      <el-form-item label="需求名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="指派人">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8" :xs="24">
                      <el-form-item label="需求时间">
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
                            >中断</span
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
              <el-button size="small" type="primary" @click="receiveClick"
                >中断</el-button
              >
              <el-button size="small" type="primary" @click="receiveClick"
                >领取</el-button
              >
              <el-button size="small" type="primary" @click="abolishClick"
                >废止</el-button
              >
              <el-button size="small" type="primary">导入</el-button>
              <el-button size="small" type="primary">导出</el-button>
              <el-button size="small" type="primary">模板下载</el-button>
              <el-button
                size="small"
                type="primary"
                @click="actionItemVisible = true"
                >历史导入</el-button
              >
            </div>
            <template>
              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%; margin-bottom: 20px"
                row-key="id"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren',
                }"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column
                  label="编号"
                  min-width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">{{ scope.row.num }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="item"
                  label="所属项目"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="项目编号"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="n" label="指派"> </el-table-column>
                <el-table-column
                  prop="date"
                  label="更新时间"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="n" label="更新人" width="100">
                </el-table-column>
                <el-table-column prop="n" label="用例"> </el-table-column>
                <el-table-column label="状态">
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
                      :class="scope.row.status == true ? 'danger' : ''"
                      @click="
                        switchClick((scope.row.status = !scope.row.status))
                      "
                    >
                      {{ scope.row.status == true ? "结束" : "开始" }}
                    </el-button>
                    <el-button type="text" @click="assessmentClick">
                      评估
                    </el-button>
                    <el-button type="text" @click="createClick">
                      生成子需求
                    </el-button>
                    <el-button type="text" @click="useCasesClick">
                      生成用例
                    </el-button>
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
        <el-tab-pane label="我管理的需求" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="我参与的需求" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="草稿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="废止需求" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 新增弹窗 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      custom-class="createActionDialog"
      @closed="closedDialog"
      width="55%"
    >
      <el-form ref="addform" :model="addform" label-width="90px">
        <el-form-item label="名称" class="star">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
        <el-form-item
          label="所属需求"
          v-show="isCreate"
          class="createActionBox"
        >
          <el-select v-model="addform.class" placeholder="请选择一级需求">
            <el-option label="测试与验证中心" value="1"></el-option>
            <el-option label="研发中心" value="2"></el-option>
          </el-select>
          <el-select
            v-model="addform.secondClass"
            placeholder="请选择二级需求"
            v-if="addform.class"
            class="ml-2"
          >
            <el-option label="硬件中心" value="11"></el-option>
            <el-option label="软件中心" value="12"></el-option>
          </el-select>
          <el-select
            v-model="addform.threeClass"
            placeholder="请选择三级需求"
            v-if="addform.secondClass"
            class="ml-2"
          >
            <el-option label="硬件中心" value="11"></el-option>
            <el-option label="软件中心" value="12"></el-option>
          </el-select>
          <el-select
            v-model="addform.itemName"
            placeholder="请选择子需求"
            v-if="addform.threeClass"
            class="ml-2"
          >
            <el-option label="A组" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <div class="item-group">
          <el-form-item label="所属项目" class="star">
            <el-select
              v-model="addform.name"
              placeholder="请选择项目"
              class="w-100"
            >
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联需求" class="star" v-show="isUseCases">
            <el-select v-model="addform.name" placeholder="请选择项目">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划日期" class="star" v-show="!isUseCases">
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
        <div class="item-group" v-show="isUseCases">
          <el-form-item label="用例类型" class="star">
            <el-select
              v-model="addform.name"
              placeholder="请选择项目"
              class="w-100"
            >
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用例级别" class="star">
            <el-select v-model="addform.name" placeholder="请选择项目">
              <el-option label="子项目1" value="1"></el-option>
              <el-option label="子项目2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="描述" v-show="!isUseCases">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="前置条件" v-show="isUseCases">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="操作步骤" class="star" v-show="isUseCases">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="预期结果" class="star" v-show="isUseCases">
          <el-input type="textarea" v-model="addform.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传附件" class="m-0">
          <el-upload class="upload-demo beforeBaseline" action="">
            <el-button size="small" type="success">点击上传</el-button>
          </el-upload>
          <el-checkbox class="ml-3" v-model="isBaseline" v-show="!isCreate"
            >设为基准线</el-checkbox
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="saveClick"
          >存为草稿</el-button
        >
        <el-button size="small" type="primary" @click="publishClick"
          >立即发布</el-button
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
    <!-- <el-dialog title="指派人员" :visible.sync="assignVisible" width="30%">
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
    </el-dialog> -->
    <!-- 指派弹窗 end -->

    <!-- 需求列表 -->
    <el-dialog
      width="50%"
      title="选择需求"
      :visible.sync="actionItemVisible"
      custom-class="actionlistDialog"
    >
      <el-input
        placeholder="输入搜索关键字"
        prefix-icon="el-icon-search"
        v-model="key"
        class="search mb-2"
        @keyup.enter.native="searchActionEnter"
      >
      </el-input>
      <el-row class="actionItemBox">
        <el-col :md="9" :xs="24">
          <div class="actionItemList">
            <p v-for="(v, i) in curActionItemList" :key="i">
              <el-checkbox v-model="v.checked">{{ v.name }}</el-checkbox>
            </p>
          </div>
        </el-col>
        <el-col :md="6" :xs="24">
          <el-row>
            <div class="btnGroup">
              <el-col :md="24" :xs="24">
                <el-button
                  type="info"
                  plain
                  class="mb-2"
                  size="small"
                  icon="el-icon-thumb"
                  @click="addActionAll"
                  >添加全部</el-button
                >
              </el-col>
              <el-col :md="24" :xs="24">
                <el-button
                  type="info"
                  plain
                  class="mb-2"
                  size="small"
                  icon="el-icon-thumb"
                  @click="removeActionAll"
                  >移除全部</el-button
                >
              </el-col>
              <el-col :md="24" :xs="24">
                <el-button
                  type="info"
                  plain
                  class="mb-2"
                  size="small"
                  icon="el-icon-thumb"
                  @click="addAction"
                  >添加</el-button
                >
              </el-col>
              <el-col :md="24" :xs="24">
                <el-button
                  type="info"
                  plain
                  class="mb-2"
                  size="small"
                  icon="el-icon-thumb"
                  @click="removeAction"
                  >移除</el-button
                >
              </el-col>
            </div>
          </el-row>
        </el-col>
        <el-col :md="9" :xs="24">
          <div class="actionItemList">
            <p v-for="(v, i) in actionItemList" :key="i">
              <el-checkbox v-model="v.checked">{{ v.name }}</el-checkbox>
            </p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureClick">确定</el-button>
      </span>
    </el-dialog>
    <!-- 需求列表 end -->

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
        >查看需求
      </template>
      <el-row>
        <el-col :md="24" :xs="24" class="item b-b">
          <span class="tit mr-3">当前状态:</span
          ><span class="blue mr-5">已发布</span>
          <span class="tit mr-3">需求变更:</span><span class="blue">2次</span>
        </el-col>
        <el-col :md="12" :xs="24" class="item b-b">
          <p>
            <span class="tit mr-3">需求名称:</span
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
          <p><span class="tit mr-3">项目编号:</span><span>KFXM2019001</span></p>
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
          <p><span class="tit mr-3">描述:</span><span>这是一个描述</span></p>
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
      // assignVisible: false,
      // 弹窗名称
      titleName: "",
      // 评估弹窗状态
      assessmentVisible: false,
      // 需求弹窗
      actionItemVisible: false,
      // 需求搜索条件
      key: "",
      // 搜索条件是否显示
      isShow: false,
      // 搜索状态
      index: 0,
      // 是否是生成子需求
      isCreate: false,
      // 是否是生成用例
      isUseCases: false,
      // 是否设为基准线
      isBaseline: "",
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
        class: "",
        secondClass: "",
        threeClass: "",
        itemName: "",
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
          id: 3,
          num: "AI-20201111-1",
          name: "初始需求",
          item: "XXX安全仪表开发项目",
          n: "小王",
          status: true,
          date: "2016-05-01",
          type: 1,
          children: [
            {
              id: 31,
              num: "AI-20201111-1",
              name: "子需求1",
              item: "XXX安全仪表开发项目",
              n: "小王",
              status: false,
              date: "2016-05-01",
              type: 2,
            },
            {
              id: 32,
              num: "AI-20201111-1",
              name: "子需求2",
              item: "XXX安全仪表开发项目",
              n: "小王",
              status: false,
              date: "2016-05-01",
              type: 2,
              children: [
                {
                  id: 321,
                  num: "AI-20201111-1",
                  name: "二级子需求1",
                  item: "XXX安全仪表开发项目",
                  n: "小王",
                  status: true,
                  date: "2016-05-01",
                  type: 3,
                },
                {
                  id: 322,
                  num: "AI-20201111-1",
                  name: "二级子需求2",
                  item: "XXX安全仪表开发项目",
                  n: "小王",
                  status: true,
                  date: "2016-05-01",
                  type: 3,
                },
              ],
            },
          ],
        },
      ],
      // 折叠面板
      pannelList: [
        {
          id: 1,
          date: "2019-07-23 10:35",
          desc: "张三发布了新的需求",
          con: "需求名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 2,
          date: "2019-07-23 10:35",
          desc: "翻斗大街胡图图",
          con: "需求名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 3,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "需求名称：XXX安全仪表开发项目周例会",
        },
        {
          id: 4,
          date: "2019-07-23 10:35",
          desc: "XXXXXXXXXXXXXX",
          con: "需求名称：XXX安全仪表开发项目周例会",
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
      // 需求列表初始数据
      curActionItemList: [
        {
          id: 1,
          checked: false,
          name:
            "胡图图的项目胡图图的项目胡图图的项目胡图图的项目胡图图的项目胡图图的项目",
        },
        {
          id: 2,
          checked: false,
          name: "XXX项目xxx需求",
        },
        {
          id: 3,
          checked: false,
          name: "XXX项目",
        },
        {
          id: 4,
          checked: false,
          name: "XXX项目",
        },
        {
          id: 5,
          checked: false,
          name: "XXX项目",
        },
      ],
      // 选中需求列表
      actionItemList: [],
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
    // 需求搜索
    searchActionEnter() {},
    // 添加全部
    addActionAll() {
      var arr = [];
      this.curActionItemList.forEach((v) => {
        v.checked = true;
        arr.push({
          id: v.id,
          checked: false,
          name: v.name,
        });
      });
      this.actionItemList = arr;
    },
    // 移除全部
    removeActionAll() {
      this.curActionItemList.forEach((v) => {
        v.checked = false;
      });
      this.actionItemList = [];
    },
    // 添加
    addAction() {
      var arr = [];
      this.curActionItemList.forEach((v) => {
        if (v.checked == true) {
          arr.push({
            id: v.id,
            checked: false,
            name: v.name,
          });
        }
      });
      this.actionItemList = arr;
    },
    // 移除
    removeAction() {
      var arr = [];
      this.actionItemList.forEach((v) => {
        if (v.checked == true) {
          this.curActionItemList.forEach((v2) => {
            if (v.id == v2.id) {
              v2.checked = false;
            }
            if (v2.checked == true) {
              arr.push({
                id: v2.id,
                checked: false,
                name: v2.name,
              });
            }
          });
        }
      });
      this.actionItemList = arr;
    },
    // 选择移动项保存
    sureClick() {
      this.actionItemVisible = false;
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
    // 评估
    assessmentClick() {
      this.assessmentVisible = true;
    },
    // 评估保存
    assessmentSaveClick() {
      this.assessmentVisible = false;
    },
    // 指派提交
    submitClick() {},
    // 领取
    receiveClick() {},
    // 禁用
    switchClick() {},
    // 编辑
    editClick(v) {
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
    // 生成子需求
    createClick() {
      this.isCreate = true;
      this.titleName = "新增子需求";

      this.dialogVisible = true;
    },
    // 生成用例
    useCasesClick() {
      this.isUseCases = true;
      this.titleName = "新增用例";

      this.dialogVisible = true;
    },
    // 立即发布
    publishClick() {},
    // 弹窗关闭
    closedDialog() {
      this.isCreate = false;
      this.isUseCases = false;
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>