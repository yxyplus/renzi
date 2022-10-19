<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 通用工具栏组件使用 -->
      <PageTools>
        <!-- 自定义左侧内容 -->
        <template #slot-left>
          <span>共 19 条记录</span>
        </template>

        <!-- 自定义右侧内容 -->
        <template #slot-right>
          <el-button type="danger" size="small">导入excel</el-button>
          <el-button type="success" size="small">导出excel</el-button>
          <el-button type="primary" size="small" @click="addEmpShowDialogFn">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 员工列表+分页 -->
      <el-card style="margin-top: 10px;">
        <el-table border :data="employeesList">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="staffPhoto" label="头像" />
          <el-table-column prop="mobile" label="手机号" />
          <el-table-column prop="workNumber" label="工号" sortable :sort-method="workNumberSortFn" />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="scope">
              <span>{{ formatter(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" :formatter="timeFormatter" />
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页区域 -->
          <el-pagination
            :current-page="query.page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>

      <!-- 新增员工弹框 -->
      <el-dialog
        title="新增员工"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        @close="closeFn"
      >
        <EmpForm
          ref="empForm"
          :show-dialog.sync="showDialog"
          :tree-data="treeData"
          @addEmpEV="addEmpFn"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmployeesListAPI, addEmployeeAPI } from '@/api/employees'
import { getDepartmentsListAPI } from '@/api/departments'
import Employees from '@/api/constant'
import dayjs from 'dayjs'
import EmpForm from './components/empForm'
import { transTree } from '@/utils'

export default {
  name: 'Employees',
  components: {
    EmpForm
  },
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10 // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0, // 数据总条数
      showDialog: false, // 新增员工弹窗
      treeData: [] // 部门列表(树形结构)
    }
  },
  created() {
    this.getEmployeesListFn()
    this.getDepartmentsListFn()
  },
  methods: {
    // 获取->员工列表数据
    async getEmployeesListFn() {
      const res = await getEmployeesListAPI(this.query)
      this.employeesList = res.data.rows
    },
    // 请求->部门列表
    async getDepartmentsListFn() {
      const res = await getDepartmentsListAPI()
      this.treeData = transTree(res.data.depts, '')
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getEmployeesListFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getEmployeesListFn()
    },
    // 聘用形式->数据处理
    formatter(row) {
      const obj = Employees.hireType.find(item => item.id === parseInt(row.formOfEmployment))
      return obj ? obj.value : '未知'
    },
    // 时间格式化
    timeFormatter(row) {
      return dayjs(row.timeOfEntry).format('YYYY-MM-DD')
    },
    // 工号->排序方法
    workNumberSortFn(a, b) {
      // a和b,是表格,对应行数据(可以遍历到数组里所有对象)
      return parseInt(a.workNumber) - parseInt(b.workNumber)
    },
    // 新增员工->按钮点击事件->弹框出现
    addEmpShowDialogFn() {
      this.showDialog = true
    },
    // 新增员工->逻辑请求
    async addEmpFn(empObj) {
      try {
        const res = await addEmployeeAPI(empObj)
        this.$message.success(res.message)
      } catch (err) {
        console.error(err)
      }
      this.getEmployeesListFn()
    },
    // 新增员工弹窗->关闭事件
    closeFn() {
      this.$refs.empForm.$refs.addForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
