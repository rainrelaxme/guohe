<template>
  <div class="surveyBox mainBox">
    <el-row class="main">
      <!-- 左← -->
      <el-col :md="18" :xs="24" class="main-left">
        <el-row class="left-top mb-2">
          <el-col :md="6" :xs="12">
            <div class="item border mr-2">
              <span class="num">10</span>
              <p class="type">即将到期项目</p>
            </div>
          </el-col>
          <el-col :md="6" :xs="12">
            <div class="item border mr-2">
              <span class="num">3</span>
              <p class="type">工期超时项目</p>
            </div>
          </el-col>
          <el-col :md="6" :xs="12">
            <div class="item border mr-2">
              <span class="num">5</span>
              <p class="type">久未更新项目</p>
            </div>
          </el-col>
          <el-col :md="6" :xs="12">
            <div class="item border">
              <span class="num">11</span>
              <p class="type">现存问题项目</p>
            </div>
          </el-col>
        </el-row>
        <div class="left-center mb-2">
          <el-row class="itemTrendBox">
            <el-col :md="12" :xs="24" class="itemTrends">
              <div class="timeBox border mr-2">
                <div class="title">
                  <i class="iconfont icon-gaikuang"></i> 项目动态
                </div>
                <div>
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :timestamp="activity.timestamp"
                    >
                      {{ activity.content }}
                      <span class="des">{{ activity.des }}</span>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </el-col>
            <el-col :md="12" :xs="24" class="recentNeed">
              <div class="barBox border">
                <div class="title">
                  <i class="iconfont icon-gaikuang"></i> 近期待办
                </div>
                <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                <div id="barChart"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="left-bottom">
          <div class="itemList border">
            <div class="title">
              <span> <i class="iconfont icon-gaikuang"></i> 进行中的项目 </span>
              <span class="link-icon">
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <!-- 所有项目信息 -->
            <div class="tableBox">
              <div class="allItem">
                <div class="item">
                  <div class="tit flex-between">
                    <el-row>
                      <el-col :md="12" :xs="24"
                        >XXX安全仪表开发项目周例会</el-col
                      >
                      <el-col :md="12" :xs="24" class="time"
                        >2019-07-08 至 2019-10-11</el-col
                      >
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
                  </div>
                  <div class="itemMain itemMain2">
                    <span><i class="icon"></i>紧急程度：紧急</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><i class="icon"></i>优先级别：高</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><i class="icon"></i>安全级别：高</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><i class="icon"></i>计划工时：16h</span>
                    <el-divider direction="vertical"></el-divider>
                    <div>
                      <span class="progressBox">
                        <i class="icon"></i>
                        <span>自评进度：</span>
                        <el-progress :percentage="50"></el-progress>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 所有项目信息 end -->
          </div>
        </div>
      </el-col>
      <!-- 左← end -->

      <!-- 右→ -->
      <el-col :md="6" :xs="24" class="main-right"> </el-col>
      <!-- 右→ end -->
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 时间戳
      activities: [
        {
          content: "XXX安全仪表开发项目",
          des: "更新了需求",
          timestamp: "07-20 17:40",
        },
        {
          content: "通过审核",
          des: "更新了任务",
          timestamp: "07-20 17:40",
        },
        {
          content: "创建成功",
          des: "更新了测试",
          timestamp: "07-20 17:40",
        },
        {
          content: "创建成功",
          des: "更新了测试",
          timestamp: "07-20 17:40",
        },
        {
          content: "创建成功",
          des: "更新了测试",
          timestamp: "07-20 17:40",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 自定义方法函数
  methods: {
    barChart() {
      var myChart = this.$echarts.init(document.getElementById("barChart"));
      // 指定图表的配置项和数据
      var option = {
        legend: {
          bottom: "0",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        color: ["#59A1FF", "#65CB75", "#F6D42F", "#415188"],
        xAxis: {
          type: "category",
          data: ["需求", "任务", "COM3", "COM4", "COM5"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            barGap: "0%",
            barWidth: "40%",
            data: [10, 20, 30, 20, 30],
            stack: "类型总量", //堆叠柱状图
            name: "异常",
          },
          {
            type: "bar",
            barGap: "0%",
            barWidth: "40%",
            data: [11, 21, 31, 20, 30],
            stack: "类型总量", //堆叠柱状图
            name: "不符合项",
          },
          {
            type: "bar",
            barGap: "0%",
            barWidth: "40%",
            data: [12, 22, 32, 20, 30],
            stack: "类型总量", //堆叠柱状图
            name: "危害",
          },
          {
            type: "bar",
            barGap: "0%",
            barWidth: "40%",
            data: [12, 22, 32, 20, 30],
            stack: "类型总量", //堆叠柱状图
            name: "风险",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.barChart();
  },
};
</script>