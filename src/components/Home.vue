<template>
  <el-container>
    <el-header>
      <div class="left_header">
        <img src="../assets/yy.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="istragger ? '64px': '200px'">
              <div class="tragger_button" @click="tragger">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened = true
          :collapse= "istragger"
          :collapse-transition= false
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i :class="iconsObjc[item.id]"></i>
              <span>{{ " " +item.authName }}</span>
            </template>
            <el-menu-item v-for="children in item.children" :key="children.id" :index=" '/'+children.path">
              <i class="el-icon-menu"></i>
              <span>{{ children.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getLeftMenus()
  },
  data () {
    return {
      menuList: [],
      iconsObjc: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-lock_fill',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-tijikongjian'
      },
      istragger: false
    }
  },
  methods: {
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('./login')
    },
    // 获取所有的菜场
    async getLeftMenus () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.erroe(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    tragger () {
      this.istragger = !this.istragger
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  width: 100%;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  .left_header {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.tragger_button{
  background-color: #4a4a4a;
  font-size: 10;
  color: white;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
}
.el-main {
  background-color: #eaedf1;
}
</style>
