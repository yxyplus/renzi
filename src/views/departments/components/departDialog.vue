<template>
  <div>
    <!-- 添加子部门->弹窗dialog -->
    <el-dialog
      :title="isEdit ? '编辑部门' : '添加部门'"
      :visible="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :before-close="handleClose"
      @update:visible="val => $emit('update:dialogVisible', false)"
      @close="dialogCloseFn"
    >
      <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
            <el-option v-for="item in employeesSimpleList" :key="item.id" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
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
    // 页面->控制dialog是否显示
    dialogVisible: {
      type: Boolean
    },
    // 员工列表
    employeesSimpleList: {
      type: Array,
      default: () => []
    },
    // 关键部门信息对象形成的数组
    originList: {
      type: Array,
      default: () => []
    },
    // 当前编辑部们id
    clickDepartId: {
      type: String,
      default: ''
    },
    // 编辑/新增状态
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 校验部门编码是否重复
    const validCode = (rule, value, callback) => {
    // 判断是否能否找到对应的部门，如果找到了则返回该对象
      let codeList = this.originList.map(item => item.code)
      if (this.isEdit) {
        const newArr = this.originList.filter(item => item.id !== this.clickDepartId)
        codeList = newArr.map(item => item.code)
      }
      // 如果存在该对象，则说明编码已经存在，抛出错误
      codeList.includes(value) ? callback(new Error(`部门编码 ${value} 已经存在了`)) : callback()
    }
    // 同级部门禁止出现重复部门
    const validName = (rule, value, callback) => {
      // 查找同级的分类
      // 先筛选属于这个pid下属的(parentId就是id)部门对象, 然后映射name名字数组
      let nameList = this.originList.filter(item => item.pid === this.clickDepartId).map(item => item.name)

      if (this.isEdit) {
        // 先找到正在编辑ed这个部门对象
        const obj = this.originList.find(item => item.id === this.clickDepartId)
        // 找到编辑对象,才能拿到pid
        const pid = obj.pid
        // 拿到pid,才能继续从所有部门列表中,找到pid值相同的对象们
        nameList = this.originList.filter(item => item.pid === pid && item.id !== this.clickDepartId).map(item => item.name)
      }

      nameList.includes(value) ? callback(new Error(`部门名字 ${value} 已经存在了`)) : callback()
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称要求2~10个字符', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '部门编码要求1~20个字符', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1~300个字符', trigger: 'blur' }
        ]
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
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          // 拷贝一个新的对象给父级axios使用
          // 子组件内我们会把form的值置空可能会影响axios的发送使用
          this.$emit('addDepartEV', { ...this.form })
          this.$emit('update:dialogVisible', false)
        }
      })
    },
    // 关闭后触发的回调函数
    dialogCloseFn() {
      // 表单里的值清空
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      // 清空校验提示
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style>

</style>
