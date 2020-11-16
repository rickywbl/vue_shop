<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="card-box">
      <el-row>
        <el-button
          class="adduser_button"
          type="primary"
          @click="dialogVisible = true"
          >添加角色</el-button
        >
      </el-row>
      <el-table style="width: 100%" :data="roles" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index1 == 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item, index1) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag closable @close="handleClose(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(child, index2) in item.children"
                  :key="child.id"
                  :class="[index2 != 0 ? 'bdtop' : '', , 'vcenter']"
                >
                  <el-col :span="5">
                    <el-tag
                      type="success"
                      closable
                      @close="handleClose(scope.row, child.id)"
                      >{{ child.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <el-tag
                      type="danger"
                      closable
                      v-for="(child2, index3) in child.children"
                      :key="index3"
                      @close="handleClose(scope.row, child2.id)"
                      >{{ child2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="info"
              icon="el-icon-share"
              size="mini"
              @click="changeRole(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dialogHandleClose"
    >
    <span>
        <el-tree ref="treeRef" :data="rightsTree" show-checkbox :props="rightsProps" node-key="id" default-expand-all :default-checked-keys='defkeys'>
        <span class="custom-tree-node" slot-scope="{ node , data }">
           <span>{{ node.label}}</span>
          <span v-show="false">{{ data.authName}}</span>
        </span>
      </el-tree>
    </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRight()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      roles: [],
      // 当前修改的角色id
      roleId: '',
      rightsTree: [],
      defkeys: [],
      rightsProps: {
        children: 'children',
        label: 'authName'
      },
      dialogVisible: false
    }
  },
  methods: {
    async getRoles () {
      const { data: res } = await this.$http.get('roles')
      this.roles = res.data
    },

    async deleRoles (role, rightId) {
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        role.children = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    async getRightsTree () {
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status === 200) {
        this.rightsTree = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleClose (role, rightId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleRoles(role, rightId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changeRole (role) {
      this.defkeys = []
      this.roleId = `${role.id}`
      this.getRightsTree()
      this.getDefkeys(role, this.defkeys)
      this.dialogVisible = true
    },
    dialogHandleClose () {
      this.dialogVisible = false
    },

    allotRight (role) {
      var allRights = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ]
      var rightsStr = allRights.join(',')
      this.allotRightRequest(rightsStr)
    },

    async allotRightRequest (rightstr) {
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: rightstr })
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        this.getRoles()
        this.dialogVisible = false
        return
      }
      this.$message.error(res.meta.msg)
    },

    // 获取三级权限  保存到数组中
    getDefkeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getDefkeys(item, arr))
    }
  }
}
</script>
<style lang="less" scoped>
.card-box {
  margin-top: 20px;
}

.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.vcenter {
  display: flex;
  align-items: center;
}

.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eeeeee;
}
.bdbottom {
  border-bottom: 1px solid #eeeeee;
}
</style>
