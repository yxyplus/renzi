<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="box-card">
        <!--  vue之前的具名插槽使用的写法
              template v-slot:header
              template #header -->
        <div slot="header" class="clearfix">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="组织架构" name="first" class="tab-pane">
              <el-row type="flex" justify="space-between" align="middle" class="department-header">
                <!-- 第一列20份 -->
                <el-col :span="20">
                  <i class="el-icon-s-home" />
                  <span class="company">xxxxxx教育科技股份有限公司</span>
                </el-col>
                <!-- 第二列4份 -->
                <el-col :span="4">
                  <!-- 在容器范围里, 一行再分2列 -->
                  <el-row type="flex" justify="end">
                    <el-col>负责人</el-col>
                    <el-col>
                      <el-dropdown>
                        <!-- 下拉菜单文字 -->
                        <span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <!-- 下拉项 -->
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>添加子部门</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 树形控件 -->
              <el-tree
                class="departments-tree"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
              >
                <template #default="{ data }">
                  <el-row
                    type="flex"
                    justify="space-between"
                    align="middle"
                    style="height: 40px; width: 100%;"
                  >
                    <!-- 部门名字 -->
                    <el-col :span="20">
                      <span>{{ data.name }}</span>
                    </el-col>
                    <!-- 功能操作区域 -->
                    <el-col :span="4">
                      <el-row type="flex" justify="end">
                        <!-- 两个内容 -->
                        <el-col>{{ data.manager }}</el-col>
                        <el-col>
                          <!-- 下拉菜单 element -->
                          <el-dropdown>
                            <span> 操作<i class="el-icon-arrow-down" /> </span>
                            <!-- 下拉菜单 -->
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item @click.native="add(data)">添加子部门</el-dropdown-item>
                              <el-dropdown-item @click.native="edit(data)">编辑部门</el-dropdown-item>
                              <el-dropdown-item @click.native="del(data)">删除部门</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <!-- 添加子部门->弹窗dialog -->
      <departDialog
        :dialog-visible.sync="dialogVisible"
        :employees-simple-list="employeesSimpleList"
        @addDepartEV="addDepartFn"
      />
    </div>
  </div>
</template>

<script>
import {
  getDepartmentsListAPI,
  getEmployeeSimpleAPI,
  addDepartmentsAPI
} from '@/api/departments'
import { transTree } from '@/utils'
import departDialog from './components/departDialog.vue'

export default {
  name: 'Departments',
  components: {
    departDialog
  },
  data() {
    return {
      activeName: 'first',
      // 树形控件数据
      treeData: [],
      defaultProps: {
        label: 'name'
      },
      // 控制dialog显示/隐藏
      dialogVisible: false,
      employeesSimpleList: [], // 员工列表(部门负责人)
      // 点击那行部门的id
      clickDepartId: ''
    }
  },
  created() {
    this.getDepartmentsListFn()
    this.getEmployeeSimpleListFn()
  },
  methods: {
    // 获取->组织架构的树形结构数据
    async getDepartmentsListFn() {
      const res = await getDepartmentsListAPI()
      // res.data.depts 第一个参数代表: 数组, 第二个参数'': 代表一级id
      this.treeData = transTree(res.data.depts, '')
    },
    // 获取->员工简单列表
    async getEmployeeSimpleListFn() {
      const res = await getEmployeeSimpleAPI()
      this.employeesSimpleList = res.data
    },
    // 选项卡->点击事件
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleNodeClick(data) {
      // console.log(data)
    },
    // 正文部分-右侧的添加子部门
    add(data) {
      this.clickDepartId = data.id // 把点击这行的部门id存入
      this.dialogVisible = true
    },
    // 编辑子部分
    edit(data) {

    },
    // 删除部分
    del(data) {

    },
    // 添加子部门->确定添加方法
    async addDepartFn(formObj) {
      formObj.pid = this.clickDepartId
      try {
        const res = await addDepartmentsAPI(formObj)
        this.$message.success(res.message)
        this.getDepartmentsListFn()
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-tree {
  margin: 12px 0px;
}
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px 80px;

  .company {
    margin-left: 12px;
    font-weight: bold;
    font-size: 14px;
  }

  .department-header {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
}
</style>
