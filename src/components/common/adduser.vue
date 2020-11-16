<template>
<!--
    addSuccessCallBack : 添加用户成功回调
 -->
  <div>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="cancel" @close="cancel">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="addForm.username" clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码" clearable
            v-model="addForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            placeholder="请输入手机号" clearable
            v-model="addForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="addForm.email" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatePhone, validateEMail } from '../../assets/utils/utils.js'
export default {
  name: 'adduser',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      available: this.dialogVisible,
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '用户名长度在3-15个字段之间', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
        this.addUserRequest()
      })
    },
    async addUserRequest () {
      const { data: rest } = await this.$http.post('users', this.addForm)
      if (rest.meta.status !== 201) {
        this.$message.error(rest.meta.msg)
      }
      this.$message.success(rest.meta.msg)
      this.available = false
      this.$emit('update:dialogVisible', this.available)
      this.$refs.addFormRef.resetFields()
      this.$emit('addSuccessCallBack')
    },
    cancel () {
      this.$refs.addFormRef.resetFields()
      this.available = false
      console.log(this.available)
      this.$emit('update:dialogVisible', this.available)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
