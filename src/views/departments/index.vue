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
                  <span class="company">前端小袁教育科技股份有限公司</span>
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
                          <el-dropdown-item @click.native="add()">添加子部门</el-dropdown-item>
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
                              <el-dropdown-item v-if="data && !data.children" @click.native="del(data)">删除部门</el-dropdown-item>
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
        ref="departDialog"
        :dialog-visible.sync="dialogVisible"
        :origin-list="originList"
        :click-depart-id="clickDepartId"
        :is-edit="isEdit"
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
  addDepartmentsAPI,
  getDepartDetailAPI,
  updateDepartmentsAPI,
  delDepartmentAPI
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
      // 员工列表(部门负责人)
      employeesSimpleList: [],
      // 点击那行部门的id
      clickDepartId: '',
      // 添加/编辑->部门状态(true编辑,false新增)
      isEdit: false,
      // 用于校验部门列表扁平数组
      originList: []
    }
  },
  created() {
    this.getDepartmentsListFn()
    this.getEmployeeSimpleListFn()
  },
  methods: {
    // 获取->部门列表
    async getDepartmentsListFn() {
      const res = await getDepartmentsListAPI()
      // 把扁平的数组里对象,映射一份只有关键4对key+value值对象,形成一个新数组,用于传入表单组件内做判断
      this.originList = res.data.depts.map(item => (
        {
          id: item.id,
          code: item.code,
          name: item.name,
          pid: item.pid // 下面使用
        }
      ))
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
    // (头部->添加子部门:data是undefined)
    // (列表->添加子部门:data是一行对应的部门对象,treeData里数据)
    add(data) {
      this.isEdit = false
      if (data === undefined) {
        this.clickDepartId = ''
      } else {
        this.clickDepartId = data.id // 把点击这行的部门id存入
      }
      // 理解: 子部门pid = 父(点击部门)id
      this.dialogVisible = true
    },
    // 编辑子部分
    async edit(data) {
      this.dialogVisible = true
      this.isEdit = true
      this.clickDepartId = data.id
      const res = await getDepartDetailAPI(data.id)
      this.$refs.departDialog.form = res.data
    },
    // 删除部分
    async del(data) {
      // 显示删除确认消息对话框
      const delRes = await this.$confirm('你确定要删除该部门吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果返回的结果是 cancel 说明用户取消了删除
      if (delRes === 'cancel') return this.$message('你取消了删除')
      const res = await delDepartmentAPI(data.id)
      this.$message.success(res.message)
      this.getDepartmentsListFn()
    },
    // 添加或编辑子部门->确定添加方法
    async addDepartFn(formObj) {
      if (this.isEdit) { // 编辑状态
        try {
          const res = await updateDepartmentsAPI(formObj)
          this.$message.success(res.message)
        } catch (err) {
          console.error(err)
        }
      } else { // 添加状态
        formObj.pid = this.clickDepartId
        try {
          const res = await addDepartmentsAPI(formObj)
          this.$message.success(res.message)
        } catch (err) {
          console.error(err)
        }
      }
      this.getDepartmentsListFn()
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
