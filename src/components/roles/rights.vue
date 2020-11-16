<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table style="width: 100%" :data="rights" border stripe v-show="type =='list'">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="权限路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
              <el-tag v-if="scope.row.level == '0'">一级</el-tag>
              <el-tag v-if="scope.row.level == '1'" type="success">二级</el-tag>
              <el-tag v-if="scope.row.level == '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        </el-table>
      <el-tree :data="rights" v-show="type =='tree'">
        <span class="custom-tree-node" slot-scope="{ node , data }">
           <span>{{ node.label}}</span>
          <span>{{ data.authName }}</span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getRights()
  },
  data () {
    return {
      rights: [],
      type: 'list',
      rightTree: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async getRights () {
      const { data: res } = await this.$http.get('rights/' + this.type)
      this.rights = res.data
    }
  }

}
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}

.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
