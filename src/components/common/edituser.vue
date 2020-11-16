<template>
  <div>
    <!-- 添加用户 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="cancel"
      @close="cancel"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userId"
            :disabled="addForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            placeholder="请输入手机号"
            clearable
            v-model="addForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="addForm.email"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatePhone, validateEMail } from '../../assets/utils/utils.js'

export default {
  name: 'edituser',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    userId: String
  },
  data () {
    return {
      addForm: {
        username: '',
        email: '',
        mobile: ''
      },
      available: this.dialogVisible,
      addFormRules: {
        mobile: [{ validator: validatePhone, trigger: 'blur' }, { required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ validator: validateEMail, trigger: 'blur' }, { required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    sure () {
      this.$refs.addFormRef.validate(vaild => {
        if (!vaild) return
        console.log(vaild)
        this.editUser()
      })
    },
    async editUser () {
    },

    async getUserinfo () {

    },
    cancel () {
      this.$refs.addFormRef.resetFields()
      this.available = false
      this.$emit('update:dialogVisible', this.available)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
