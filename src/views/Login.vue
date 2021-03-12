<template>
    <div class="loginForm">
        <div class="logo">
            <img src="../assets/images/logo_dark.png" alt="">
        </div>
        <div class="inputWrap">
            <el-input placeholder="Email" type="email" v-model="email"></el-input>
            <div v-if="this.errorEmail !== '' " class="error">
                <span> {{ errorEmail }} </span>
            </div>
        </div>
        <div class="inputWrap">
            <el-input  placeholder="Mật khẩu" type="password"  v-model="password"></el-input>
            <div v-if="this.errorPassword !== '' " class="error">
                <span> {{ errorPassword }} </span>
            </div>
        </div>
        <el-button type="primary" class="loginButton" @click="handleLogin()">ĐĂNG NHẬP</el-button>
    </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  import api from '../api'
  import {isValidEmail} from '../utils/helper'
  import _ from 'lodash'
  
  export default {
    name: "Login",
    data () {
      return {
        errorEmail: '',
        errorPassword: '',
        email: '',
        password: '',
      }
    },
    computed: {
      ...mapState('auth', ['isAuthenticated'])
    },
    watch: {
      email () {
        this.errorEmail = ''
      },
      password () {
        this.errorPassword = ''
      }
    },
    methods: {
      ...mapMutations('auth', [
        'updateLoginStatus',
        'updateAccessToken'
      ]),
      handleLogin () {
        if (this.isValidData()) {
          let data = {
            email: this.email,
            password: this.password,
          }
          api.login(data).then((response) => {
            this.updateAccessToken(_.get(response, 'data.access_token'))
            this.updateLoginStatus(true)
            this.$router.push({ name: 'Home' })
          }).catch(() => {
            this.$message({message: 'Thông tin tài khoản hoặc mật khẩu không chính xác', type: 'error'});
          })
        }
      },
      isValidData () {
        let error = false;
        this.errorEmail = '';
        this.errorPassword = '';

        if (!isValidEmail(this.email)) {
          error = true;
          this.errorEmail = 'Email sai định dạng, vui lòng nhập lại';
        }
        if (this.email.length === 0) {
          error = true;
          this.errorEmail = 'Email không được để trống';
        }
        if (this.password.length < 6) {
          error = true;
          this.errorPassword = 'Mật khẩu phải lớn hơn 6 ký tự';
        }
        if (this.password.length === 0) {
          error = true;
          this.errorPassword = 'Mật khẩu không được để trống';
        }

        return !error
      }
    },
  }
</script>
<style lang="scss">
    @import "../assets/styles/variables";

    .loginForm {
        max-width: 400px;
        width: 100%;
        display: block;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        background: $colorWhite;
        padding: 24px;
        border-radius: 10px;
        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            img {
                width: 200px;
                vertical-align: middle;
                border-style: none;
                box-sizing: border-box;
            }
        }
        .inputWrap {
            margin-bottom: 24px;
            .error {
                color: $colorRed;
                margin-top: 8px;
                font-size: 12px;
            }
        }
        .loginButton {
            width: 100%;
        }
    }
</style>