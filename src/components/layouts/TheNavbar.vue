<template>
  <div>
    <div id="navbar">

      <div class="logo-box">
        <div class="sidebar"></div>
        <div class="logo"></div>
      </div>
      <div class="navbar-box">
        <a class="navbar-item" href="">
          <div class="navbar-icon icon-dashboard"></div>
          <div class="navbar-text">Tổng quan</div>
        </a>
        <a class="navbar-item" href="">
          <div class="navbar-icon icon-report"></div>
          <div class="navbar-text">Báo cáo</div>
        </a>
        <router-link class="navbar-item" to="#">
          <div class="navbar-icon icon-dic-employee"></div>
          <div class="navbar-text">Danh mục khách hàng</div>
        </router-link>
        <router-link class="navbar-item" to="/Nhan-vien">
          <div class="navbar-icon icon-dic-employee"></div>
          <div class="navbar-text">Danh mục nhân viên</div>
        </router-link>
        <!-- <a class="navbar-item" href="#">
          <div class="navbar-icon icon-dic-employee"></div>
          <div class="navbar-text">Danh sách khách hàng</div>
        </a> -->
        <a class="navbar-item" href="">
          <div class="navbar-icon icon-setting"></div>
          <div class="navbar-text">Cài đặt</div>
        </a>
      </div>
    </div>
  </div>
</template>


<style scoped>

#navbar {
  width: 200px;
  height: 100vh;
  border-right: 1px solid #dedede;
  top: 0;
  position: absolute;
}

.logo-box {
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  cursor: pointer;
}

.logo-box .sidebar {
  margin-left: 16px;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/img/toggle.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.logo-box .logo {
  margin-left: 8px;
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  background-image: url("../../assets/img/cukcuk-logo.png");
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
}
.navbar-box .navbar-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0;
}

.navbar-box .navbar-item:hover {
  background-color: #dedede;
  cursor: pointer;
}

.navbar-item .navbar-icon {
  margin-left: 16px;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.navbar-item .navbar-text {
  margin-left: 10px;
}

a.navbar-item:hover {
  cursor: pointer;
}
.navbar-box .navbar-item:focus {
  background-color: #019160;
  color: white;
}
</style>