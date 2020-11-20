<template>
  <div id="loginWrapper">
    <h2 class="systemName">智慧消防运行管理平台</h2>
    <div class="loginContainer">
      <!-- <div class="loginBox"> -->
      <div class="logoImg">
        <img src="../assets/images/u664.png" alt="">
      </div>
      <p class="slogan">智慧消防+社会化服务一体化解决方案提供商</p>
      <transition name="el-zoom-in-top">
        <div class="loginFormBox transition-box" v-show="showLogin">

          <p>账号密码登录</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="account" placeholder="账户名/邮箱/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="password" type="password" placeholder="密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="loginHandle">
            <div class="autoLogin">
              <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            </div>
            <p class="c1890ff cp">忘记密码</p>
          </div>
          <div class="loginBtnBox">
            <el-button type="primary" @click="login">登 录</el-button>
          </div>
          <div class="toRegister">
            <div class="download">
              <img src="../assets/images/u658.svg" alt="">
              <span class="cp"> 下载</span>
            </div>
            <p class="cp" @click="goRegister">注册账号</p>
          </div>
        </div>
      </transition>
      <transition name="el-zoom-in-bottom">
        <div v-show="showRegister" class="transition-box registerFormBox">
          <p>注册</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="account" placeholder="账户名/邮箱/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="password" placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="password" placeholder="6-16位密码，区分大小写"></el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-input v-model="password" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-input placeholder="请输入内容" v-model="input1">
                <template slot="prepend">+86</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="name" label-width='0'>
              <el-row>
                <el-col :span="10">
                  <el-button type='primary' class="w100">注 册</el-button>
                </el-col>
                <el-col :span="14" class="taR">
                  <span class="cp" @click="goLogin">使用已有账号登录</span>
                </el-col>
              </el-row>

            </el-form-item>
          </el-form>
        </div>
      </transition>
      <div class="statement">
        <div class="externalLinks">
          <span class="cp">帮助</span>
          <span class="cp">隐私</span>
          <span class="cp">条款</span>
        </div>
        <p>copyright &nbsp; 华龙万相智慧安全科技（成都）有限公司</p>
      </div>
      <!-- </div> -->

    </div>
  </div>
</template>

<script>
import menu from "@/json/menu.json";
import { setItem, getItem } from "@/utils/local.js";
import { login } from "@/apis/login.js";
export default {
  data() {
    return {
      account: "",
      password: "",
      rules: {},
      autoLogin: false,
      showLogin: true,
      showRegister: false,
      ruleForm: {},
      input1: ""
    };
  },
  created() {
    // console.log(menu)
  },
  methods: {
    goRegister() {
      this.showLogin = false;
      let _this = this;
      setTimeout(function() {
        _this.showRegister = true;
      }, 300);
    },
    goLogin() {
      this.showRegister = false;
      let _this = this;
      setTimeout(function() {
        _this.showLogin = true;
      }, 300);
    },
    login() {
      // console.log(this.account, this.password);
      login({
        account: this.account,
        password: this.password,
        system: 1
      })
        .then(res => {
          // console.log(res)
          if (res.httpStatus === 200) {
            setItem("menu", menu);
            setItem("sid", res.result);
            this.$router.history.push('/index/config/user/organization')
          }
        })
        // .catch(err => {
        //   this.$message({
        //     type: "waring",
        //     message: "网络请求失败"
        //   });
        // });
    }
  }
};
</script>

<style lang="less" scoped>
#loginWrapper {
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/u4.svg);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .systemName {
    text-align: center;
    font-size: 36px;
    color: #80d9ff;
    line-height: 100px;
  }
  .loginContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 96px;
    // justify-content: center;
    .logoImg {
      width: 96px;
      height: 96px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .slogan {
      color: #fff;
      font-size: 16px;
      line-height: 50px;
    }
    .loginFormBox {
      margin-top: 20px;
      font-size: 16px;
      color: #1890ff;
      p:first-child {
        width: 156px;
        border-bottom: 2px solid #1890ff;
        text-align: center;
        line-height: 50px;
        margin-left: 106px;
      }
      .el-form {
        margin-top: 20px;
        width: 368px;
      }
      .loginHandle {
        display: flex;
        justify-content: space-between;
        .el-checkbox {
          color: #fff;
        }
        .el-checkbox__label {
          font-size: 16px;
        }
      }
      .loginBtnBox {
        margin-top: 10px;
        .el-button {
          width: 100%;
          font-size: 16px;
        }
      }
      .toRegister {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
      }
      .c1890ff {
        color: #1890ff;
      }
    }
    .registerFormBox {
      margin-top: 20px;
      font-size: 16px;
      color: #1890ff;
      .el-form {
        margin-top: 20px;
        width: 368px;
      }
    }
    .statement {
      font-size: 14px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   margin-top: 180px;
      position: absolute;
      left: auto;
      bottom: 20px;
      .externalLinks {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        width: 170px;
      }
    }
  }
  .cp {
    cursor: pointer;
  }
  .cp:hover {
    color: #1890ff;
  }
  .w100 {
    width: 100%;
  }
  .taR {
    text-align: end;
  }
}
</style>