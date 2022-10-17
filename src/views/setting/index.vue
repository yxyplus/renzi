<template>
  <div class="setting-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoleBtnFn"
              >新增角色</el-button>
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table :data="rolesList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="setRoles(scope.row)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRoles(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRoles(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              :current-page="query.page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="query.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" class="tab-pane">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyObj.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyObj.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyObj.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyObj.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 新增角色 - 弹框 -->
      <el-dialog
        title="新增角色"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
      >
        <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>

        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="cancleRoles">取消</el-button>
            <el-button size="small" type="primary" @click="roleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// getCompanyInfoAPI
import { getRoleListAPI

} from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        pagesize: 10 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0, // 角色数据总条数
      // 公司的信息(这里的信息,我是自己写的,也可以用接口数据)
      companyObj: {
        name: '前端小袁教育科技股份有限公司',
        companyAddress: '陕西省西安市某某区',
        mailbox: 'session@163.com',
        remarks: '真的是一个很好的项目，非常感谢！！！'
      },
      showDialog: false, // 控制弹框的隐藏和展示
      // 添加角色
      roleForm: {
        name: '',
        description: ''
      },
      // 添加角色验证
      roleRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleListFn()
    // this.getCompanyDetailFn()
  },
  methods: {
    // 获取->角色所有列表
    async getRoleListFn() {
      const res = await getRoleListAPI(this.query)
      this.rolesList = res.data.rows
      this.total = res.data.total
    },
    // 获取->公司详情(这个接口可写可不写)
    // async getCompanyDetailFn() {
    //   const res = await getCompanyInfoAPI(this.companyId)
    //   this.companyObj = res.data
    // },

    // 每页显示的条数发生改变时触发
    handleSizeChange() {},

    // 当前页面发生改变时触发
    handleCurrentChange() {},

    // 设置角色
    setRoles() {},

    // 编辑角色
    editRoles() {},

    // 删除角色
    delRoles() {},

    // 角色弹框-> 确定按钮
    roleSubmit() {
      this.showDialog = false
    },

    // 角色弹框-> 取消按钮
    cancleRoles() {
      this.showDialog = false
    },
    // 新增角色->按钮点击事件
    addRoleBtnFn() {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
