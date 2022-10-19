<template>
  <!-- 表单 -->
  <el-form label-width="120px">
    <el-form-item label="姓名">
      <el-input style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机">
      <el-input style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式">
      <el-select style="width:50%" placeholder="请选择" value="" />
    </el-form-item>
    <el-form-item label="工号">
      <el-input style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门">
      <el-input style="width:50%" placeholder="请选择部门" />
    </el-form-item>
    <el-form-item label="转正时间">
      <el-date-picker style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancelFn">取消</el-button>
      <el-button type="primary" @click="confirmFn">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EmpForm',
  methods: {
    cancelFn() {
      this.$emit('update:showDialog', false)
    },
    confirmFn() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
