<template>
  <!-- 放置一个弹层 用来编辑新增节点 -->
  <el-dialog
    :title="isEdit ? '编辑权限' : '添加权限'"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="btnCancel"
  >
    <!-- 表单 -->
    <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="enterFn">确定</el-button>
        <el-button size="small" @click="cancelFn">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 添加/编辑的状态
    isEdit: {
      type: Boolean,
      default: false
    },
    // 所有权限点列表(扁平)
    permissionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const validName = (rule, value, callback) => {
      // formData.pid (新增的对象pid), 通过它找到同级权限点对象
      const nameList = this.permissionList.filter(item => item.pid === this.formData.pid)
        .map(item => item.name)

      nameList.includes(value) ? callback(new Error(`权限点 ${value} 名字已经存在`)) : callback()
    }
    const validCode = (rule, value, callback) => {
      const codeList = this.permissionList.map(item => item.code)
      codeList.includes(value) ? callback(new Error(`权限标识 ${value} 名字已经存在`)) : callback()
    }
    return {
      showDialog: false, // 控制dialog显示/隐藏
      // permissionList: [], // 权限管理列表数据
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型吖
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // dialog关闭事件
    btnCancel() {
      this.$refs.perForm.resetFields()
      // this.formData = this.$options.data().formData
      this.formData = {}
    },
    // 确定按钮->点击事件
    enterFn() {
      this.$refs.perForm.validate(valid => {
        if (valid) {
          // 防止一会儿做清空, 把formData对象引用的值清除了, axios发送的时候为空就不好了
          this.$emit('addPerEV', { ...this.formData })
          this.showDialog = false
        }
      })
    },
    // 取消按钮->点击事件
    cancelFn() {
      this.showDialog = false
    }
  }
}
</script>
