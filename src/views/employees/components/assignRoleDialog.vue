<template>
  <div>
    <!-- 渲染角色列表 -->
    <el-checkbox-group v-model="roleIdsList">
      <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.id">
        <span>{{ item.name }}</span>
      </el-checkbox>
    </el-checkbox-group>

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
    // 所有角色列表
    allRoleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      roleIdsList: [] // 收集选中的角色ID
    }
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
