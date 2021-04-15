<template>
  <div>
    <form action="">
      <div
        id="dlgCustomerDetail"
        class="dialog"
        v-bind:class="{ 'dialog-hide': isHide }"
      >
        <div class="model"></div>
        <div class="dialog-content" id="dialog-content">
          <div class="dialog-header">
            <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
            <div
              class="dialog-close-button"
              @click="btnCloseOnClick()"
              v-on:keyup.esc="btnCloseOnClick()"
              :tabindex="tabindex + 1"
            >
              &#x2715;
            </div>
          </div>
          <div class="dialog-body">
            <div class="insertAvatar">
              <div class="avatar"></div>
              <div>(Vui lòng chọn ảnh có định dạng .jpg,.jepg,.png,.gif)</div>
            </div>
            <div class="insertInfor">
              <div class="m-col">
                <div class="tittleDialog">A. THÔNG TIN CHUNG:</div>
                <hr class="hrStyle" />
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label class="form-label"
                    >Mã nhân viên (<span>*</span>)</label
                  >

                  <input
                    id="ipEmployeeCode"
                    aria-describedby="inputGroupPrepend2"
                    type="text"
                    v-model="newEmployeeCode"
                    name="employeeCode"
                    ref="employeeCode"
                    oninvalid="this.setCustomValidity('Mã nhân viên không được để trống!')"
                    required
                    :tabindex="tabindex + 1"
                  />
                </div>
                <div class="m-col">
                  <label class="form-label">Họ và tên (<span>*</span>)</label>
                  <input
                    id="ipEmployeeName"
                    ref="ipEmployeeName"
                    aria-describedby="inputGroupPrepend2"
                    type="text"
                    v-model="employee.FullName"
                    oninvalid="this.setCustomValidity('Họ và tên không được để trống!')"
                    oninput="this.setCustomValidity('')"
                    required
                    :tabindex="tabindex + 1"
                  />
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label class="form-label">Ngày sinh</label>
                  <input
                    id="ipEmployeeDoB"
                    type="date"
                    v-model="employee.DateOfBirth"
                    value="01/01/2020"
                    :placeholder="placeholder"
                    :tabindex="tabindex + 1"
                  />
                </div>
                <div class="m-col">
                  <label class="form-label">Giới tính</label>
                  <select
                    :tabindex="tabindex + 1"
                    v-model="employee.Gender"
                    id="ipEmployeeGender"
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                    <option value="2">Không xác định</option>
                  </select>
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label class="form-label"
                    >Số CMTND/Căn cước (<span>*</span>)</label
                  >
                  <input
                    id="ipEmployeeIdentityNo"
                    type="text"
                    value=""
                    :tabindex="tabindex + 1"
                    v-model="employee.IdentityNumber"
                    oninvalid="this.setCustomValidity('Số CMTND/Căn cước không để trống! ')"
                    oninput="this.setCustomValidity('')"
                    required
                  />
                </div>
                <div class="m-col">
                  <label class="form-label">Ngày cấp</label>
                  <input
                    type="date"
                    v-model="employee.IdentityDate"
                    value="date"
                    :tabindex="tabindex + 1"
                  />
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label class="form-label">Nơi cấp</label>
                  <input
                    type="text"
                    v-model="employee.IdentityPlace"
                    :tabindex="tabindex + 1"
                  />
                </div>
                <div class="m-col"></div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label class="form-label">Email (<span>*</span>)</label>
                  <input
                    type="email"
                    v-model="employee.Email"
                    :tabindex="tabindex + 1"
                    oninvalid="this.setCustomValidity('Vui lòng nhập đúng Email! ')"
                    oninput="this.setCustomValidity('')"
                    required
                  />
                </div>
                <div class="m-col">
                  <label class="form-label"
                    >Số điện thoại (<span>*</span>)</label
                  >
                  <input
                    type="text"
                    v-model="employee.PhoneNumber"
                    :tabindex="tabindex + 1"
                    oninvalid="this.setCustomValidity('Số điện thoại không được để trống!')"
                    oninput="this.setCustomValidity('')"
                    required
                  />
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <div class="tittleDialog">B. THÔNG TIN CÔNG VIỆC:</div>
                  <hr class="hrStyle" />
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label>Vị trí</label>
                  <select
                    :tabindex="tabindex + 1"
                    v-model="employee.PositionId"
                  >
                    <option
                      v-for="item in positions"
                      :value="item.PositionId"
                      :key="item.PositionId"
                    >
                      {{ item.PositionName }}
                    </option>
                  </select>
                </div>
                <div class="m-col">
                  <label>Phòng ban</label>
                  <select
                    :tabindex="tabindex + 1"
                    v-model="employee.DepartmentId"
                  >
                    <option
                      v-for="item in departments"
                      :value="item.DepartmentId"
                      :key="item.DepartmentId"
                    >
                      {{ item.DepartmentName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label>Mã số thuế cá nhân</label>
                  <input
                    type="text"
                    :tabindex="tabindex + 1"
                    v-model="employee.PersonalTaxCode"
                  />
                </div>
                <div class="m-col">
                  <label>Mức lương cơ bản</label>
                  <!-- <div>
                    <input
                      type="text"
                      :tabindex="tabindex + 1"
                      v-model="employee.Salary"
                    />
                    <span>VNĐ</span> -->
                  <div class="input-group">
                    <div class="input-group-salary">
                      <div style="width: 100%">
                        <input
                          type="text"
                          :tabindex="tabindex + 1"
                          v-model="employee.Salary"
                          class="form-control"
                          aria-describedby="inputGroupPrepend2"
                          required
                        />
                      </div>
                      <div class="input-span"><span> (VNĐ) </span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="m-row">
                <div class="m-col">
                  <label>Ngày gia nhập công ty</label>
                  <input
                    type="date"
                    :tabindex="tabindex + 1"
                    value="date"
                    v-model="employee.JoinDate"
                  />
                </div>
                <div class="m-col">
                  <label>Tình trạng công việc</label>
                  <select
                    :tabindex="tabindex + 1"
                    v-model="employee.WorkStatus"
                  >
                    <option value="0">Đang làm việc</option>
                    <option value="1">Đã nghỉ hưu</option>
                    <option value="2">Đang thử việc</option>
                    <!-- <option disabled value="">Chọn</option>
                    <option v-for="employee in employees" v-bind:key="employee.WorkStatus">{{employee.WorkStatus}}</option> -->
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog-footer">
            <button
              :tabindex="tabindex + 1"
              class="btn-default btn-cancel"
              v-on:click.esc="btnOnCancel()"
            >
              Hủy
            </button>
            <button
              id="btnSave"
              class="btn-default"
              type="submit"
              v-on:click.enter="btnSave()"
              :tabindex="tabindex + 1"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </form>
    <DialogAlert
      :isHideDialogAlert="isHideDialogAlert"
      @hideDialogAlert="hideDialogAlert"
      :newEmployeeCode="newEmployeeCode"
    />
  </div>
</template>
<script>
import axios from "axios";
// import moment from "moment";
import DialogAlert from "../../Commons/DialogAlert.vue";
export default {
  components: {
    DialogAlert,
  },
  props: {
    isHide: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      require: false,
      default: 1,
    },
    employee: {
      type: Object,
      default: null,
    },
    selectedId: {
      type: String,
      default: null,
    },
    formMode: {
      type: String,
      default: null,
    },
    newEmployeeCode: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "ngày-tháng-năm",
    },
    departments: {
      type: Array,
      default: null,
    },
    positions: {
      type: Array,
      default: null,
    },
  },
  methods: {
    /**
     * Bấm nút X thì đóng form chi tiết
     */
    btnCloseOnClick() {
      this.$emit("hideDialogDetail");
    },
    btnOnCancel() {
      this.$emit("hideDialogDetail");
    },
    /**
     * Validate Email
     * Created by CmChau(7/4/2021)
     */
    // validateEmail(){
    //    if (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.employee.Email)) {
    //     this.msg = 'Vui lòng nhập email đúng định dạng';
    //     console.log(this.employee.Email);
    //     return;
    // } else {
    //     this.msg = '';
    // }
    // },
    /**
     * Xử lý sự kiện thi bấm nút lưu
     * -formMode= Add thì là thêm mới dữ liệu
     * -còn lại là sửa dữ liệu
     * Created by CMChau (5/4/2021)
     */
    btnSave() {
      // this.validateEmail();
      // console.log(this.employee.Email);
      // console.log(this.msg);
      //kiểm tra có  nhập hay không
      if (
        this.employee.IdentityNumber == "" ||
        this.employee.IdentityNumber == null ||
        this.employee.FullName == "" ||
        this.employee.FullName == null ||
        this.employee.Email == "" ||
        this.employee.Email == null ||
        this.employee.PhoneNumber == "" ||
        this.employee.PhoneNumber == null
      ) {
        return;
      } else {
        if (this.formMode === "Add") {
          //Thêm mới
          this.employee.EmployeeCode = this.newEmployeeCode;
          console.log(this.employee.EmployeeCode);
          axios
            .post("http://api.manhnv.net/v1/Employees", this.employee)
            .then((res) => {
              this.$emit("getEmployeesData");
              console.log(res);
              this.btnCloseOnClick();
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          //Sửa dữ liệu
          axios
            .put(
              "http://api.manhnv.net/v1/Employees/" + this.selectedId,
              this.employee
            )
            .then((res) => {
              this.$emit("getEmployeesData");
              console.log(res);
              this.btnCloseOnClick();
            })
            .catch((res) => {
              console.log(res.status);
            });
        }
      }
    },
    /**
     * Ẩn form alert
     */
    hideDialogAlert() {
      this.isHideDialogAlert = true;
    },
  },
  data() {
    return {
      isHideDialogAlert: true,
      // messageAlert: "",
      msg: "",
      email: "",
      // employees:[],
    };
  },
  mounted() {
    //  this.$nextTick(() => this.$refs.employeeCode.focus())
    // var self = this;
    //   this.$nextTick(() => {
    //   self.$$.employeeCode.focus();
    // })
  },
  created() {
    console.log(this.departments);
    // console.log(this.employee.DepartmentId);
    // console.log(this.employee.PositionId);
    //this.$refs.employeeCode.focus();
    //this.$refs.ipEmployeeName.$el.focus();
    // console.log(this.employee.WorkStatus);
  },
  watch: {},
};
</script>



<style scoped>
@import url(../../../assets/css/CommonCss/dialog.css);
@import url(../../../assets/css/EmployeeCss/employee.css);
.m-col select:hover {
  background-color: #e9ebee;
}
</style>