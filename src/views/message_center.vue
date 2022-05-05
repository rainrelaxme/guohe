<template>
  <div class="paddingBox messageBox">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已读" name="first"> </el-tab-pane>
      <el-tab-pane label="未读" name="second">
        <!-- 表格内容 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="describe" label="">
          </el-table-column>
          <el-table-column prop="date" label=""> </el-table-column>
          <el-table-column label="" width="120">
            <el-row>
              <el-button type="primary"> 查看 </el-button>
            </el-row>
          </el-table-column>
        </el-table>
        <!-- 表格内容 end -->

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            :layout= layoutStyle
            :total="400"
          >
          </el-pagination>
        </div>
        <!-- 分页 end -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 已读-未读
      activeName: "second",
      tableData: [
        {
          describe: "您已收到一个任务。",
          date: "2020-11-18 16:40:30",
        },
        {
          describe: "您已收到一个任务。您已收到一个任务。您已收到一个任务。",
          date: "2020-11-18 16:40:30",
        },
        {
          describe: "您已收到一个任务。",
          date: "2020-11-18 16:40:30",
        },
      ],
      // 分页样式
      layoutStyle: 'total, prev, pager, next, jumper',
      // 屏幕尺寸
      screenWidth: document.body.clientWidth,
      // 当前页数
      currentPage: 1,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
  },
  //生命周期 - 自定义方法函数
  methods: {
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 判断设备尺寸-调整分页样式
    if(this.screenWidth <= 640){
      this.layoutStyle = 'total, prev, next, jumper';
    }else{
      this.layoutStyle = 'total, prev, pager, next, jumper';
    }
  },
};
</script>