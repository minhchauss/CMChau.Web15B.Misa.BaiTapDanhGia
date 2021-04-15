<template>
  <div>
    <div
      id="dlgCustomerDetail"
      class="dialog"
      v-bind:class="{ 'dialog-hide': isHide }"
    >
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN KHÁCH HÀNG</div>
          <div class="dialog-close-button" @click="btnCloseOnClick()" v-on:keyup.esc="btnCloseOnClick()">
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="m-row">
            <div class="m-col">
              <label>Mã khách hàng</label>
              <input
                id="txtCustomerCode"
                type="text"
                v-model="customer.CustomerCode"
              />
            </div>
            <div class="m-col">
              <label>Họ và tên</label>
              <input
                id="txtFullName"
                type="text"
                required
                v-model="customer.FullName"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Nhóm khách hàng</label>
              <select id="cbCustomerGroup" v-model="customer.CustomerGroupId">
                <option value="0cb5da7c-59cd-4953-b17e-c9adc9161663">
                  Nhóm khách hàng MISA
                </option>
                <option value="19165ed7-212e-21c4-0428-030d4265475f">
                  Khách VIP
                </option>
                <option value="3631011e-4559-4ad8-b0ad-cb989f2177da">
                  Khách vãng lai
                </option>
                <option value="7a0b757e-41eb-4df6-c6f8-494a84b910f4">
                  Khách thường
                </option>
              </select>
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Giới tính</label>
              <select id="cbGender" v-model="customer.Gender">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Không xác định</option>
              </select>
            </div>
            <div class="m-col">
              <label>Ngày sinh</label>
              <input
                id="dtDateOfBirth"
                type="date"
                value="date"
                v-model="customer.DateOfBirth"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Số điện thoại</label>
              <input
                id="txtPhoneNumber"
                type="text"
                v-model="customer.PhoneNumber"
              />
            </div>
            <div class="m-col">
              <label>Email</label>
              <input id="txtEmail" type="text" v-model="customer.Email" />
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button id="btnSave" class="btn-default" v-on:click="btnSave()">
            Lưu
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
import moment from 'moment';
export default {
  components: {

  },
  props: {
    isHide: {
      type: Boolean,
      default: true,
    },
    idCustomer: {
      type: String,
      default: null,
    },
    formMode: {
      type: String,
      default: null,
    },
  },
  // computed:{
  //   formatDate:{
  //     get:function(){
  //       return this.selected.indexOf('#dlgCustomerDetail') >-1;
  //     },
  //     set:function (date) {
  //     if(!date)return "";
  //     else
  //     return moment(date, 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY');
  //     }
  //     }
  //   },
  methods: {
    /**--------------------------------------------------------
     * Hàm đóng dialog dùng emit tương tác với component cha
     */
    btnCloseOnClick() {
      this.$emit("hideDialogDetail", false);
      
    },
    reLoadDataCustomer() {
      // alert(1);
      this.$emit("reLoadData");
      // this.isHide=true;
    },
    /****--------------------------------------------------------------
     * Bấm nút lưu
     * 
     */
    btnSave() {
      //formMode=Add thì thêm mới 
      if (this.formMode == "Add") {
        axios
          .post("http://api.manhnv.net/api/customers/", this.customer)
          .then((res) => {
            this.btnCloseOnClick();
            this.reLoadDataCustomer();
            console.log(res);
          })
          .catch((res) => {
            console.log(res.msg('Có lỗi xảy ra'));
          });
      } else {
        //Trường hợp còn lại là sửa
        axios
          .put(
            "http://api.manhnv.net/api/customers/" + this.idCustomer,
            this.customer
          )
          .then((res) => {
            this.reLoadDataCustomer();
            this.btnCloseOnClick();
            console.log(res);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },
    clearFormInput(){
      this.customer={};
    },
       formatDate(date){
      if(!date)return "";
      else
      return moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
    }
  },
  // created() {
  //   this.clearFormInput();
  // },
  //Lấy data của 1 customer binding vào form
  create: {
    idCustomer() {
        //dùng axios lấy data thông qua API
      axios
        .get("http://api.manhnv.net/api/customers/" + this.idCustomer)
        .then((response) => {
          this.customer = response.data;
          this.customer.DateOfBirth=this.formatDate(this.customer.DateOfBirth);
        })
        .catch((res) => {
          alert(res.status);
        });
      //  alert(this.idCustomer);
     },
  },
  
  data() {
    return {
      customer: {},
    };
  },
};
</script>



<style scoped>
@import url(../../../assets/css/CommonCss/dialog.css);
@import url(../../../assets/css/EmployeeCss/employee.css);
</style>