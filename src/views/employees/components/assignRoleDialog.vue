<template>
  <div>
    <!-- 渲染角色列表 -->

    <el-row class="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="enterFn">确定</el-button>
        <el-button size="small" @click="cancelFn">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AssignRole',
  props: {
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    // 确定弹框
    enterFn() {
      this.$emit('update:show', false)
    },
    // 取消弹框
    cancelFn() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 30px;
}
</style>
