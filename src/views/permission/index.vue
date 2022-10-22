<template>
  <div class="permission-container">
    <div class="app-container">
      <PageTools>
        <template #slot-left>
          <span>权限管理</span>
        </template>
        <template #slot-right>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </PageTools>

      <!-- 表格 -->
      <el-card class="card">
        <el-table
          border
          :data="allPermissionList"
          row-key="id"
        >
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type === 1" type="text" @click="addPerBtnFn">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 添加权限点的弹窗 -->
      <perDialog ref="perDialog" />
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
import { transTree } from '@/utils'
import perDialog from './components/perDialog.vue'

export default {
  components: {
    perDialog
  },
  data() {
    return {
      allPermissionList: [] // 所有权限点对象列表数组
    }
  },
  created() {
    // 获取->所有权限点列表
    this.getPermissionListFn()
  },
  methods: {
    // 获取->所有权限点列表
    async getPermissionListFn() {
      const res = await getPermissionListAPI()
      // transTree内部在查找的时候，参数2，要传递父级id(递归找子对象)
      this.allPermissionList = transTree(res.data, '0')
    },
    // 点击添加->权限点弹窗出现
    addPerBtnFn() {
      this.$refs.perDialog.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin-top: 12px;
}
</style>
