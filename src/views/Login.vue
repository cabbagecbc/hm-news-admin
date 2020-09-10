<template>
  <div class="login">
    <!--
      :model="form": 用于收集表单数据，是一个对象
      label-width="80px": label的宽度
    -->
    <el-form class="form" :model="user" label-width="80px">
      <el-form-item label="账号">
        <el-input
          v-model="user.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="user.password"
          type="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss">
// lang="scss"  或者  lang="sass"
// sass支持两种写法
//   scss
// stylus --  sass:  老的写法，简洁 不能写{}，靠换行来实现嵌套,分号也可以不写
// sass缺点：不兼容css写法
// scss完全兼容css代码  接近了less
// .login
//   height: 500px
//   width: 500px
//   .form
//     background-color: pink
/*
  scss/sass定义变量 $  less使用@
*/
// $color: red;
// .login {
//   height: 500px;
//   width: 500px;
//   .form {
//     background-color: $color;
//   }
// }
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    width: 400px;
    height: 240px;
    border: 1px solid #000;
    padding: 20px;
  }
}
</style>
