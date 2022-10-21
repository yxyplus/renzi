<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px">
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="userInfo.workNumber" class="inputW" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfo.timeOfEntry"
              style="width: 300px"
              type="date"
              class="inputW"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 姓名 部门 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="userInfo.username" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门">
            <el-input v-model="userInfo.departmentName" class="inputW" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机">
            <el-input v-model="userInfo.mobile" style="width: 300px" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聘用形式">
            <el-select v-model="userInfo.formOfEmployment" class="inputW">
              <el-option
                v-for="item in EmployeeEnum.hireType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <UploadImg ref="uploadImg" :staff-photo="userInfo.staffPhoto" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="saveUser">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUserPhotoAPI } from '@/api/user'
import EmployeeEnum from '@/api/constant'
import { updateEmployeesAPI } from '@/api/employees'

export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: {}, // 个人信息-对象
      EmployeeEnum
    }
  },
  created() {
    // 请求->个人信息
    this.getUserInfoFn()
  },
  methods: {
    async getUserInfoFn() {
      const res = await getUserPhotoAPI(this.$route.query.id)
      this.userInfo = res.data
      this.$refs.uploadImg.imageUrl = res.data.staffPhoto
      // 额外加入一个聘用形式
      // this.userInfo.formOfEmployment = parseInt(this.$route.query.form)
      this.$set(this.userInfo, 'formOfEmployment', parseInt(this.$route.query.form))
    },
    // 保存更新按钮->点击事件
    async saveUser() {
      this.userInfo.staffPhoto = this.$refs.uploadImg.imageUrl
      const res = await updateEmployeesAPI(this.userInfo)
      this.$message.success(res.message)
    }
  }
}
</script>

<style lang="scss" scoped></style>
