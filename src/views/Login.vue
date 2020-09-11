<template>
  <div class="login">
    <!--
      :model="form": 用于收集表单数据，是一个对象
      label-width="80px": label的宽度
    -->
    <el-form ref="form" class="form" :model="user" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="user.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="user.password"
          type="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      user: {
        username: '',
        password: ''
      },
      // 检验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          // 使用正则 想要字母就是：/^[a-z0-9]{5,11}$/
          { pattern: /^\d{5,11}$/, message: '长度为5-11位数字', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { mix: 3, max: 6, message: '长度为3-6位数字', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 登录校验
    async login() {
      // 登录表单校验
      try {
        await this.$refs.form.validate()
      } catch {
        // 失败
        return console.log('检验失败')
      }
      // console.log('校验通过')
      // 发送请求
      const res = await this.$axios.post('/login', this.user)
      console.log(res.data)
      const { statusCode, data, message } = res
      if (statusCode === 200) {
        // alert(message)
        this.$message.success(message)
        // 有token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 验证成功跳转到首页。否则说明失败
        this.$router.push('/')
      } else {
        // alert(message)
        this.$message.error(message)
      }
    },
    // 登录信息重置
    reset() {
      // this.$refs.resetFields()
      this.$refs.form.resetFields()
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
