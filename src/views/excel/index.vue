<template>
  <div class="app-container">
    <!-- upload-excel-component是封装的真正的表格上传组件(带虚线) -->
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <!-- 展示读取的表格数据的 -->
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
// 导入上传的组件
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  // 绑定上传组件
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [], // 表格数据
      tableHeader: [] // 表格头部数据
    }
  },
  methods: {
    // 上传excel文件后，做一个判断(小于1MB的文件)
    beforeUpload(file) {
      // file->上传的文件对象(excel文件对象) -> size的单位是Byte
      // 1Byte(字节)计算机里保存一个字母/数字需要的二进制位个数  (1Byte = 8bit)
      // 1KB = 1024B(字节) 1MB = 1024KB
      // 如判断文件的大小是否大于 1 兆
      const isLt1M = file.size / 1024 / 1024 < 1

      // 若大于 1 兆则停止解析并提示错误信息。
      if (isLt1M) { // 通过
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      }) // 不通过返回false,并提示
      return false
    },
    // 接受UploadExcel组件内，读取表哥成功的头部数据和表格体的数据
    handleSuccess({ results, header }) {
      // results里，就是表格的所有数据
      // results是 数组套对象
      // 每个对象对应一行数据

      // header里，第一行(作为列标题字符串数组)
      this.tableData = results
      this.tableHeader = header

      // 原因: 后台要求传递的数据数组里对象(是英文的key名)
      // 解决: 做一个后置处理
      // xlsx读中文的对象数据,拿到以后我们遍历做一个转换(映射)
      // 思路: 遍历出每个对象,把值取出来,添加到一个英文的新的对象里
      // 1. 准备中文换英文的映射关系(枚举对象)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      // 2. 遍历数组每个对象
      const newArr = results.map(obj => {
        const newObj = {}
        // 3. 拿到对象里所有key名 (Object.keys(对象) -> 返回对象里所有key字符串数组)
        const keyArr = Object.keys(obj)
        // 4. 遍历每个中文的key,换成对应英文字符串
        keyArr.forEach(zhKey => {
          const enKey = userRelations[zhKey] // 英文字符串key
          // 5. 为新的对象，添加英文key,和对应的值
          newObj[enKey] = obj[zhKey]
        })
        return newObj
      })
      console.log(newArr)
    }
  }
}
</script>
