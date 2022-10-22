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
        <el-table border :data="allPermissionList">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'

export default {
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
    async getPermissionListFn() {
      const res = await getPermissionListAPI()
      this.allPermissionList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin-top: 12px;
}
</style>
