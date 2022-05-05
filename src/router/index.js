import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login.vue';
import Personal_center from '../views/personal_center.vue';
import Message_center from '../views/message_center.vue';
import Index from '../views/index.vue';
// 工作台
import Workbench from '../views/workbench.vue';
//
import Survey from '../views/survey.vue';
import Item from '../views/item.vue';
import Task from '../views/task.vue';
import Needs from '../views/needs.vue';
import Test from '../views/test.vue';
import Unusual from '../views/unusual.vue';
import No_conformity from '../views/no_conformity.vue';
import Action_item from '../views/action_item.vue';
import Harm from '../views/harm.vue';
import Danger from '../views/danger.vue';
import Meeting from '../views/meeting.vue';
import Report_form from '../views/report_form.vue';

// 参数设置
import Parameter_setting from '../views/parameter_setting.vue';
import Parameter_main from '../views/parameter_about/parameter_main.vue';
// 项目相关
import Project_template from '../views/parameter_about/project_template.vue';
import Project_type from '../views/parameter_about/project_type.vue';
import Project_stage from '../views/parameter_about/project_stage.vue';
import Project_level from '../views/parameter_about/project_level.vue';
import Project_constitute from '../views/parameter_about/project_constitute.vue';
// 测试相关
import Needs_assessment from '../views/parameter_about/needs_assessment.vue';
import Use_cases_type from '../views/parameter_about/use_cases_type.vue';
import Use_cases_level from '../views/parameter_about/Use_cases_level.vue';
import Use_cases_assessment from '../views/parameter_about/use_cases_assessment.vue';
import Unusual_type from '../views/parameter_about/unusual_type.vue';
import Unusual_level from '../views/parameter_about/unusual_level.vue';
import Operating_system from '../views/parameter_about/operating_system.vue';
import Browser from '../views/parameter_about/browser.vue';
// 工具库
import Tool_library from '../views/parameter_about/tool_library.vue';


// 系统管理
import System_management from '../views/system_management.vue';
//
import Organization_management from '../views/organization_management.vue';
import Personnel_management from '../views/personnel_management.vue';
import Jurisdiction_management from '../views/jurisdiction_management.vue';
import Equipment_management from '../views/equipment_management.vue';
import Backups_management from '../views/backups_management.vue';

Vue.use(VueRouter)

const routes = [
  // 登录
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true,
    meta: {
      title: '登录',
    }
  },
  // 首页
  {
    path: '/index',
    name: '首页',
    component: Index,
    hidden: false,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/workbench',
        name: '工作台',
        component: Workbench,
        position: 1, // 左侧导航
        children: [
          {
            path: '/survey',
            name: '概况',
            icon: 'iconfont icon-gaikuang',
            component: Survey,
          },
          {
            path: '/item',
            name: '项目',
            icon: 'iconfont icon-xiangmu',
            component: Item,
          },
          {
            path: '/task',
            name: '任务',
            icon: 'iconfont icon-xiangmu',
            component: Task,
          },
          {
            path: '/needs',
            name: '需求',
            icon: 'iconfont icon-xuqiutianbao',
            component: Needs,
          },
          {
            path: '/test',
            name: '测试',
            icon: 'iconfont icon-ceshi',
            component: Test,
          },
          {
            path: '/unusual',
            name: '异常',
            icon: 'iconfont icon-yichang',
            component: Unusual,
          },
          {
            path: '/no_conformity',
            name: '不符合项',
            icon: 'iconfont icon-yichang',
            component: No_conformity,
          },
          {
            path: '/action_item',
            name: '行动项',
            icon: 'iconfont icon-hangdongxiang',
            component: Action_item,
          },
          {
            path: '/harm',
            name: '危害',
            icon: 'iconfont icon-fengxian1-copy',
            component: Harm,
          },
          {
            path: '/danger',
            name: '风险',
            icon: 'iconfont icon-fengxian1-copy',
            component: Danger,
          },
          {
            path: '/meeting',
            name: '会议',
            icon: 'iconfont icon-huiyi',
            component: Meeting,
          },
          {
            path: '/report_form',
            name: '报表',
            icon: 'iconfont icon-baobiao',
            component: Report_form,
          },

        ]
      },
      {
        path: '/parameter_setting',
        name: '参数设置',
        component: Parameter_setting,
        position: 1,
        children: [
          {
            path: '/parameter_main',
            name: '项目相关',
            icon: 'iconfont icon-xiangmushezhi',
            component: Parameter_main,
            children: [
              {
                path: '/project_template',
                name: '项目模板',
                icon: 'el-icon-s-data',
                component: Project_template,
              },
              {
                path: '/project_type',
                name: '项目类型',
                icon: 'el-icon-s-data',
                component: Project_type,
              },
              {
                path: '/project_stage',
                name: '项目阶段',
                icon: 'el-icon-s-data',
                component: Project_stage,
              },
              {
                path: '/project_level',
                name: '项目级别',
                icon: 'el-icon-s-data',
                component: Project_level,
              },
              {
                path: '/project_constitute',
                name: '项目团队构成',
                icon: 'el-icon-s-data',
                component: Project_constitute,
              },
            ]
          },
          {
            path: '/parameter_main',
            name: '测试相关',
            icon: 'iconfont icon-ceshi1',
            component: Parameter_main,
            children: [
              {
                path: '/needs_assessment',
                name: '需求评估判断',
                icon: 'el-icon-s-data',
                component: Needs_assessment,
              },
              {
                path: '/use_cases_type',
                name: '用例类型',
                icon: 'el-icon-s-data',
                component: Use_cases_type,
              },
              {
                path: '/use_cases_level',
                name: '用例级别',
                icon: 'el-icon-s-data',
                component: Use_cases_level,
              },
              {
                path: '/use_cases_assessment',
                name: '用例评估判断',
                icon: 'el-icon-s-data',
                component: Use_cases_assessment,
              },
              {
                path: '/unusual_type',
                name: '异常类型',
                icon: 'el-icon-s-data',
                component: Unusual_type,
              },
              {
                path: '/unusual_level',
                name: '异常级别',
                icon: 'el-icon-s-data',
                component: Unusual_level,
              },
              {
                path: '/operating_system',
                name: '操作系统',
                icon: 'el-icon-s-data',
                component: Operating_system,
              },
              {
                path: '/browser',
                name: '浏览器',
                icon: 'el-icon-s-data',
                component: Browser,
              },
            ]
          },
          {
            path: '/parameter_main',
            name: '工具库',
            icon: 'iconfont icon-ai-tool',
            component: Parameter_main,
            children: [
              {
                path: '/tool_library',
                name: '工具库',
                icon: 'el-icon-s-data',
                component: Tool_library,
              },
            ]
          },
        ]
      },
      {
        path: '/system_management',
        name: '系统管理',
        component: System_management,
        position: 1,
        children: [
          {
            path: '/organization_management',
            name: '组织管理',
            icon: 'iconfont icon-zuzhi',
            component: Organization_management,
          },
          {
            path: '/personnel_management',
            name: '人员管理',
            icon: 'iconfont icon-renyuanguanli',
            component: Personnel_management,
          },
          {
            path: '/jurisdiction_management',
            name: '权限管理',
            icon: 'iconfont icon-quanxianguanli',
            component: Jurisdiction_management,
          },
          {
            path: '/equipment_management',
            name: '设备管理',
            icon: 'iconfont icon-device',
            component: Equipment_management,
          },
          {
            path: '/backups_management',
            name: '备份管理',
            icon: 'iconfont icon-beifen',
            component: Backups_management,
          },
        ]
      },
      {
        path: '/message_center',
        name: '信息中心',
        component: Message_center,
        position: 2, // 右侧导航
      },
      {
        path: '/personal_center',
        name: '个人中心',
        component: Personal_center,
        position: 2,
      },
    ],
    
  },

]

const router = new VueRouter({
  routes
})

export default router
