<template>
  <div>
    <!-- 添加子部门->弹窗dialog -->
    <el-dialog
      title="新增部门"
      :visible="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :before-close="handleClose"
      @update:visible="val => $emit('update:dialogVisible', false)"
    >
      <el-form ref="deptForm" label-width="120px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
            <el-option v-for="item in employeesSimpleList" :key="item.id" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    employeesSimpleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    }
  },
  methods: {
    // 添加子部门dialog->关闭前的回调函数
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 取消->点击事件
    cancelFn() {
      this.$emit('update:dialogVisible', false)
    },
    // 确定->点击事件
    confirmFn() {
      this.$emit('addDepartEV', this.form)
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>

</style>