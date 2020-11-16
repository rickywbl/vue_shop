<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-input
        class="searchinput"
          prefix-icon=""
          placeholder="请输入内容"
          v-model="parms.query"
          clearable
          @clear="getusers"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getusers"
          ></el-button>
        </el-input>
        <el-button
          class="adduser_button"
          type="primary"
          @click="dialogVisible = true"
          >添加用户</el-button
        >
      </el-row>
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="users" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="mobile" label="手机"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div>
              <!-- 修改 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑用户"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editUser(scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="删除用户"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteUser(scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- 分配角色 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="parms.pagesize"
        @current-change="handleCurrentChange"
        :current-page="parms.pagenum"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <add-user :dialogVisible.sync="dialogVisible" :addSuccessCallBack="this.getusers()"></add-user>
    <edit-user :dialogVisible.sync="editVislible" :userId="editUserId"></edit-user>
  </div>
</template>

<script>
import addUser from '../common/adduser.vue'
import editUser from '../common/edituser.vue'
export default {
  components: {
    addUser,
    editUser
  },
  created () {
    this.getusers()
  },
  data () {
    return {
      users: [],
      editUserId: '',
      total: 0,
      dialogVisible: false,
      editVislible: false,
      parms: {
        pagenum: 1,
        pagesize: 10,
        query: ''
      }
    }
  },
  methods: {
    // 获取全部的用户
    async getusers () {
      const { data: res } = await this.$http.get('users', {
        params: this.parms
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res.data.users)
      this.total = res.data.total
      this.users = res.data.users
    },

    // 修改用户状态
    async changeUserStatus (userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error(res.meta.msg)
      }
      return this.$message.success(`${userinfo.username}状态更新成功`)
    },

    // 删除用户
    deleteUser (userinfo) {
      this.$confirm(`此操作将永久删除${userinfo.username}(${userinfo.role_name}), 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleUserRequest(userinfo.id)
      }).catch(() => {

      })
    },

    editUser (userinfo) {
      this.editUserId = userinfo.id
      this.editVislible = true
    },

    async deleUserRequest (userid) {
      const { data: res } = await this.$http.delete('users/' + userid)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.getusers()
      this.$message.success('删除成功')
    },

    userStatusChange (userinfo) {
      this.changeUserStatus(userinfo)
    },

    // pagination方法
    handleCurrentChange (val) {
      this.parms.pagenum = val
      this.getusers()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
.searchinput {
  width: 300px;
}
.adduser_button {
  margin-left: 15px;
}
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
