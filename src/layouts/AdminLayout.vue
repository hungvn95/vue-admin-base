<template>
  <el-container>
    <el-aside class="sideBar">
      <div class="logoWrap">
        <img src="../assets/images/logo_light.png" alt="">
      </div>
      <el-menu
              default-active="1"
              background-color="#001529"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span>Tổng quan</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-time"></i>
          <span>Đơn hàng chờ duyệt</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-sell"></i>
          <span>Đơn hàng đã duyệt</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-goods"></i>
          <span>Tất cả đơn hàng</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-box"></i>
          <span>Danh sách sản phẩm</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-bank-card"></i>
          <span>Lịch sử nạp tiền</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-refresh"></i>
          <span>Lịch sử giao dịch</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="headerLeftWrap">
          Tổng quan
        </div>
        <div class="headerRightWrap">
          <el-badge :value="12" class="notification">
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown>
            <el-avatar
                    size="medium"
                    shape="circle"
                    src="https://saoexpress.vn/wp-content/uploads/2019/07/hot-girl-nguyen-thanh-thuy-Saoexpress-1.jpg"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
              <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                Đăng xuất
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import api from '../api'

export default {
  name: 'AdminLayout',
  methods: {
    ...mapMutations('auth', ['updateAuthUser']),
    ...mapActions('auth', ['logout'])
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.updateAuthUser(response.data)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .sideBar {
    width: 250px !important;
    height: 100vh;
    background: $colorSideBarBg;

    .logoWrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      img {
        width: 150px;
        height: 65px;
      }
    }

    .el-menu {
      border: none;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $colorStroke;
    height: 60px;
    width: 100%;
    background: $colorHeaderBg;
    padding: 0 24px;

    .headerLeftWrap {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
    }

    .headerRightWrap {
      display: flex;
      align-items: center;

      .notification {
        margin-right: 40px;
        font-size: 24px;
      }
    }
  }
</style>
