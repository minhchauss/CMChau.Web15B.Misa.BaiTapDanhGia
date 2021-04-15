<template>
  <div>
    <div class="header">
      <div class="enterprise-name">
        <div class="enterprise-drop">Nhà hàng Biển Đông</div>
        <img src="../../assets/icon/btn-next-page.svg" />
      </div>
      <div class="user-name">
        <div class="user-img">
          <img src="../../assets/icon/avatar-default.png" />
        </div>
        <span>Chu Minh Châu</span>
        <img src="../../assets/icon/option.png" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.header {
  width: calc(100% - 226px);
  left: 226px;
  top: 0;
  background-color: #ffffff;
  position: absolute;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #afa7a7;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
}
.enterprise-name {
  display: flex;
  align-items: center;
  justify-content: center;
}
/*Ảnh đại diện*/
.enterprise-name img {
  transform: rotate(90deg);
  margin-left: 10px;
  width: 10%;
  cursor: pointer;
}

.enterprise-drop {
  margin-left: 16px;
  font-size: 15px;
}

.user-name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

.user-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
}

.user-img img {
  width: 25px;
  height: auto;
  cursor: pointer;
}

.user-name span {
  margin-right: 16px;
  font-size: 15px;
}
</style>