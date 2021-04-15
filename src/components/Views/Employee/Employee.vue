<template>
  <div>
    <!-- <div v-bind:key="componentKey"> -->
    <div class="page-title">
      <div class="page-left">Danh sách nhân viên</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default" v-on:click="btnAddOnClick()">
          <div><img src="../../../assets/icon/add.png" /></div>
          <div>Thêm nhân viên</div>
        </button>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbarSelect">
        <input
          type="text"
          class="input-search"
          style="width: 255px"
          placeholder="Tìm kiếm theo mã, tên nhân viên"
        />
        <select style="width: 200px" >
          <option value="">Tất cả phòng ban</option>
          <option
            v-for="item in departments"
            :key="item.DepartmentId"
          >
            {{ item.DepartmentName }}
          </option>
        </select>
        <select style="width: 200px" >
          <option value="">Tất cả vị trí</option>
          <option v-for="item in positions" :key="item.PositionId">
            {{ item.PositionName }}
          </option>
        </select>
      </div>

      <div class="toolbarButton">
        <button class="btn btn-delete" v-on:click="btnOnDelete()">Xóa</button>
        <button class="btn-refresh" v-on:click="btnRefresh()"></button>
      </div>
    </div>
    <div class="grid">
      <table id="tblListCustomer" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="dblRowOnClick(employee.EmployeeId)"
            @click="selectedRowId(employee.EmployeeId, employee.EmployeeCode)"
            :class="{ hightlight: employee.EmployeeId == selectedId }"
          >
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ formatDate(employee.DateOfBirth) }}</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td>{{ formatPrice(employee.Salary) + " VND" }}</td>
            <td style="text-align: right">{{ employee.WorkStatus }}</td>
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
            <button data-v-a72348a4="" class="btn-pagenumber">1</button>
            <button data-v-a72348a4="" class="btn-pagenumber">2</button>
            <button data-v-a72348a4="" class="btn-pagenumber">3</button>
            <button data-v-a72348a4="" class="btn-pagenumber">4</button>
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-next-page"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-lastpage"></div>
        </div>
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">10</b> nhân viên/trang
        </div>
      </div>
    </div>
    <DialogEmployee
      ref="dialogEmployee"
      :isHide="isHide"
      @hideDialogDetail="hideDialogDetail"
      :employee="employee"
      @formatDate="formatDate"
      @getEmployeesData="getEmployeesData"
      :selectedId="selectedId"
      :formMode="formMode"
      :newEmployeeCode="newEmployeeCode"
      :departments="departments"
      :positions="positions"
    />
    <DialogConfirm
      :isHideDialogConfirm="isHideDialogConfirm"
      @hideDialogDetail="hideDialogDetail"
      :selectedId="selectedId"
      @getEmployeesData="getEmployeesData"
      @deleteDataOnRow="deleteDataOnRow"
      :employee="employee"
      :messageDelete="messageDelete"
    />
  </div>
</template>
<script>
import axios from "axios";
import DialogEmployee from "./DialogEmployeeInput.vue";
import DialogConfirm from "../../Commons/DialogConfirm.vue";
import moment from "moment";
export default {
  components: {
    DialogEmployee,
    DialogConfirm,
  },
  props: {},
  //
  created() {
    this.getDepartmentData();
    this.getPositionData();
    this.getEmployeesData();    
    },
  methods: {
    /**
     * Focus vào input Mã nhân viên
     * Created by CMChau (7/4/2021)
     */
    focusInput() {
      // alert(1);
      this.$nextTick(() =>
        this.$refs.dialogEmployee.$refs.employeeCode.focus()
      );
    },
    /***
     * Hiển thị dialog thêm nhân viên khi bấm nút thêm
     * Created by CMChau(4/4/2021)
     */
    btnAddOnClick() {
      this.isHide = false;
      this.employee = {};
      this.formMode = "Add"; //Xác định form là thêm mới
      this.getAutoEmployeeCode();
      this.focusInput();
    },
    /**
     * Double click vào 1 hàng hiện form chi tiết
     * Created by CMChau(4/42021)
     */
    dblRowOnClick(selectedId) {
      this.isHide = false;
      //Lấy data của 1 nhân viên thông qua API
      this.getInforEmployee(selectedId);
      this.formMode = "Edit"; //Xác định form là sửa
      this.focusInput();
    },
    /**
     * Bấm nút xóa hiện dialog xác nhận xóa
     * Created by CMChau (5/4/2021)
     * Nếu không chọn dòng nào thì không hoạt động
     */
    btnOnDelete() {
      if (this.selectedId == null) return "";
      else {
        this.isHideDialogConfirm = false;
        console.log(this.selectedId);
        this.messageDelete =
          "Bạn có muốn xóa nhân viên có mã [" + this.employeeCode + "] không?";
      }
    },
    //truyền tham số vào component con để ẩn dialog khi bấm nút X hoặc hủy
    hideDialogDetail() {
      this.isHide = true;
      this.isHideDialogConfirm = true;
    },
    /**
     * Lấy id của 1 nhân viên khi focus vào 1 hàng
     * Created by CMChau(5/4/2021)
     * Lấy mã nhân viên
     * Created by CMChau (6/4/2021)
     */
    selectedRowId(employeeId, employeeCode) {
      this.selectedId = employeeId;
      this.employeeCode = employeeCode;
      console.log(employeeId);
    },
    /**
     * Bấm nút refresh sẽ tải lại dữ liệu của trang
     * Created by CMChau (5/4/2021)
     */
    btnRefresh() {
      this.getEmployeesData();
    },
    /**
     * gọi API để lấy danh sách nhân viên
     * Create by CMChau(4/4/2021)
     */
    getEmployeesData() {
      axios.get("http://api.manhnv.net/v1/Employees").then((res) => {
        this.employees = res.data;
        // this.employee.DateOfbirth = this.formatFormDate(
        //   this.employee.DateOfbirth
        // );
        // console.log(res.data);
      });
    },
    /**
     * Định dạng lương cơ bản
     * Created by CMChau(4/4/2021)
     * Ví dụ: 2000000 -> 2.000.000 VND
     */
    formatPrice(value) {
      let val = value / 1;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    /**
     * Lấy thông tin chi tiết của 1 nhân viên qua API
     * Created by CMChau(5/4/2021)
     */
    getInforEmployee(selectedId) {
      axios
        .get("http://api.manhnv.net/v1/Employees/" + selectedId)
        .then((res) => {
          this.employee = res.data;
          this.newEmployeeCode = this.employeeCode;
          this.employee.DateOfBirth = this.formatFormDate(
            this.employee.DateOfBirth
          );
          this.employee.IdentityDate = this.formatFormDate(
            this.employee.IdentityDate
          );
          this.employee.JoinDate = this.formatFormDate(this.employee.JoinDate);
          // this.employee.Salary =
          //   this.formatPrice(this.employee.Salary) + " (VNĐ)";
          console.log(this.employee.DateOfBirth);
        })
        .catch((res) => {
          console.log(res.status);
        });
    },
    /**
     * Xóa 1 bản ghi tại dòng được chọn
     * Created by CMChau(5/4/2021)
     */
    deleteDataOnRow(selectedId) {
      axios
        .delete("http://api.manhnv.net/v1/Employees/" + selectedId)
        .then((res) => {
          console.log(res.status);
          this.getEmployeesData();
        });
    },
    /***
     * Định dạng ngày sinh trong bảng
     * Created by CMChau(4/42021)
     * Hiển thị thành DD-MM-YYYY
     */
    formatDate(date) {
      if (!date) return "";
      else {
        return moment(date).format("DD/MM/YYYY");
      }
    },
    /**
     * Format lại ngày tháng trong form
     * Created by CMChau(6/4/2021)
     */
    formatFormDate(date) {
      if (!date) return "";
      else {
        return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
      }
    },
    /**
     * Lấy mã nhân viên tự động tăng
     * Created by CMChau(6/4/2021)
     */
    getAutoEmployeeCode() {
      axios
        .get("http://api.manhnv.net/v1/Employees/NewEmployeeCode")
        .then((res) => {
          this.newEmployeeCode = res.data;
          // console.log(this.newEmployeeCode);
        });
    },
    /**
     * Lấy danh sách phòng ban qua API
     * Created by CMChau(7/4/2021)
     */
    getDepartmentData() {
      axios.get("http://api.manhnv.net/api/Department").then((res) => {
        this.departments = res.data;
      });
    },
    /**
     * Lấy danh sách vị trí công việc
     * Created by CMChau(7/4/2021)
     */
    getPositionData() {
      axios.get("http://api.manhnv.net/v1/Positions").then((res) => {
        this.positions = res.data;
      });
    },
  },
  computed: {},
  data() {
    return {
      isHide: true,
      employees: [],
      employee: {},
      gender: null,
      selectedId: null,
      employeeId: null,
      isHideDialogConfirm: true,
      formMode: "Add",
      messageDelete: null,
      employeeCode: null,
      newEmployeeCode: null,
      departments: [],
      positions: [],
    };
  },
};
</script>





<style scoped>
@import url(../../../assets/css/EmployeeCss/employee.css);
option:hover {
  background: #313336 !important;
}
table {
  border-collapse: collapse;
}

table tr {
  border-bottom: 1px solid #bbb;
  height: 48px;
}

table thead th {
  text-align: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 1px 1px -1px #bbb;
}

table thead {
  border-bottom: 1px solid #bbb;
}
tbody tr td {
  text-align: left;
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
#btnAdd {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#btnAdd img {
  vertical-align: middle;
  margin-right: 10px;
}
</style>