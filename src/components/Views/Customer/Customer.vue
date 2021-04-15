<template>
<div>
  <!-- <div v-bind:key="componentKey"> -->
    <div class="page-title">
      <div class="page-left">Danh sách khách hàng</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default" v-on:click="btnAddOnClick()">
          Thêm khách hàng
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 220px"
        placeholder="Tìm kiếm theo mã, tên khách hàng"
      />
      <button class="btn btn-delete" v-on:click="btnOnDelete()">Xóa</button>
      <button class="btn-refresh" v-on:click="btnRefresh()"></button>
    </div>
    <div class="grid">
      <table id="tblListCustomer" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã khách hàng</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Nhóm khách hàng</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th class="text-align-right">Số tiền nợ</th>
            <th class="text-align-center">Đang hoạt động</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in customers"
            :key="customer.CustomerId"
            @dblclick="dblOnClick(customer.CustomerId)"
            @click="selectedRow(customer.CustomerId)"
            :class="{'hightlight':(customer.CustomerId==selectedUser)}"
          >
            <td>{{ customer.CustomerCode }}</td>
            <td>{{ customer.FullName }}</td>
            <td>{{ customer.GenderName }}</td>
            <td>{{ formatDate(customer.DateOfBirth) }}</td>
            <td>{{ customer.CustomerGroupName }}</td>
            <td>{{ customer.PhoneNumber }}</td>
            <td>{{ customer.Email }}</td>
            <td class="text-align-right">{{ customer.DebitAmount }}</td>
            <td class="text-align-center">Đang làm việc</td>
            <!-- <td><button class="btn btn-delete" v-on:click="btnOnDelete(customer.CustomerId)">Xóa</button></td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">1-10/1000</b> nhân viên
        </div>
        <div data-v-a72348a4="" class="paging-option">
          <div data-v-a72348a4="" class="btn-select-page m-btn-firstpage"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-prev-page"></div>
          <div data-v-a72348a4="" class="m-btn-list-page">
            <button ref="btn-page" data-v-a72348a4="" class="btn-pagenumber">
              1
            </button>
            <button ref="btn-page" data-v-a72348a4="" class="btn-pagenumber">
              2
            </button>
            <button ref="btn-page" data-v-a72348a4="" class="btn-pagenumber">
              3
            </button>
            <button ref="btn-page" data-v-a72348a4="" class="btn-pagenumber">
              4
            </button>
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-next-page"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-lastpage"></div>
        </div>
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">10</b> nhân viên/trang
        </div>
      </div>
    </div>
    <DialogDetail
      :isHide="hideDialog"
      @clicked="btnAddOnClick"
      :idCustomer="idCustomer"
      :formMode="formModeDetail"
      @hideDialogDetail="hideDialogDetail"
      @reLoadData="getData"
    />
    <DialogConfirm
    :isShow="isShowDialog"
    @reLoadData="getData"
    :idCustomer="idCustomer"
     @hideDialogDetail="hideDialogDetail"
     :formMode="formModeDetail"
     :selectedUser="selectedUser"
    />
  </div>
<!-- </div> -->
  
</template>
<script>
import axios from "axios";
import DialogDetail from "./DialogCusomersInput.vue";
import moment from 'moment';
import DialogConfirm from '../../Commons/DialogConfirm.vue';
/***
 *
 * CreatedBy: CMChau (29/03/2021)
 */
export default {
  props:{
    table:{
      type:Boolean,
      default:true,
    },
  },
  components: {
    DialogDetail,
    DialogConfirm,
  },
  //Lúc khởi tạo
  created() {
    this.getData();
  },

  methods: {
       //Lấy dữ liệu thông qua gọi API
    getData(){
      axios.get("http://api.manhnv.net/api/customers").then((respone) => {
      this.customers = respone.data;
      console.log(respone.data);
    });
    },
    //Hàm hiển thị dialog khi bấm nút thêm
    btnAddOnClick() {
        this.hideDialog = false;
        this.formModeDetail='Add';
    },
    //ẩn dialog ở component cha khi bấm nút X hoặc Hủy ở component con
    hideDialogDetail(){
      this.hideDialog=true;
      this.isShowDialog=true;
    },
    //Hàm hiển thị dialog khi double click vào row
    dblOnClick(idCustomer) {
      this.idCustomer = idCustomer;
      // alert(idCustomer);
      this.hideDialog = false;
      this.formModeDetail='Edit';
      console.log(this.idCustomer);
    },
    //Hàm refresh lại dữ liệu
    btnRefresh(){
      this.getData();
    },
    btnOnDelete(selectedUser){
      // alert(idCustomer);
      this.idCustomer=selectedUser;

      console.log(this.selectedUser);
      this.isShowDialog=false;
    },
    selectedRow(userId){
      this.selectedUser=userId;
      console.log(userId);
    },

    //Định dạng ngày tháng
    formatDate(date){
      if(!date)return "";
      else
      return moment(date,"YYYY/MM/DD").format('DD/MM/YYYY');
    },

  },
  data() {
    return {
      customers: [],
      hideDialog: true,
      idCustomer: null,
      formModeDetail:null,
      isShowDialog:true,
      selectedUser:null,
    };
  },
};
</script>
<style scoped>
table {
    border-collapse: collapse;
}

table tr {
    border-bottom: 1px solid #bbb;
    height: 48px;
}

table thead th {
    text-align: left;
    position: sticky;
    top: 0;
    background-color: #fff;
    border-bottom: 1px solid #bbb;
    box-shadow: 0 1px 1px -1px #bbb;
}

table thead {
    border-bottom: 1px solid #bbb;
}

th,
td {
    padding-left: 10px;
    padding-right: 10px;
}

th:first-child,
th:last-child,
td:first-child,
td:last-child {
    padding-left: 16px;
}

table tr {
    cursor: pointer;
}


.hightlight {
    background: #019160;
    outline: none;
    color: #ffffff;
}
.btn-delete{
  width: 80px;
  position:absolute;
  right: 95px;

}
</style>