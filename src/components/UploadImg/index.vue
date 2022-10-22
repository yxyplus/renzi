<template>
  <div>
    <!-- 封装上传图片的组件，该组件只能上传一直图片 -->
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <el-progress v-show="showProgress" type="circle" class="progress" :percentage="percentage" />
    </el-upload>

  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
// 需要实例化
const cos = new COS({
  SecretId: 'AKIDHSeeXGlDHFBxYyHUeopdFk5HO7ic6Yr1', // 身份识别ID
  SecretKey: '8zhyEJIB0hCfBg4c3KUgx6614675zk4L' // 身份秘钥
}) // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了

export default {
  name: 'UploadImg',
  data() {
    return {
      imageUrl: '', // 上传成功的图片地址(外链)
      showProgress: false, // 环形进度条
      percentage: 0 // 上传进度(0-100的数字)
    }
  },
  methods: {
    // 文件上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg'
      const isPng = file.type === 'image/png'
      const isJpeg = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPng && !isJpeg) {
        this.$message.error('上传头像图片只能是 png,jpg,jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
        return false
      }
      //   已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    // 文件上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 进行上传操作
    upload(params) {
      //   console.log(params.file)
      this.showProgress = true
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'wh82-1257017897', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 -> 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            onProgress: (progressData) => {
              // progressData.percent -> 进度(0-1)数字
              this.percentage = parseInt(progressData.percent * 100)
              // console.log(JSON.stringify(progressData))
            }
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            console.log(err || data)
            this.imageUrl = 'http://' + data.Location
            setTimeout(() => {
              this.showProgress = false
            }, 200)
          }
        )
      }
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.progress {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #e4e4e4;
  border-radius: 50%;
  opacity: 0.9;
}
</style>
