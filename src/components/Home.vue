<template>
    <div>
        <p @click="exit">退出</p>
    </div>
</template>

<script>
export default {
  methods: {
    exit () {
      window.sessionStorage.clear()
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
