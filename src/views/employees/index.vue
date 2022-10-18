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
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped></style>
