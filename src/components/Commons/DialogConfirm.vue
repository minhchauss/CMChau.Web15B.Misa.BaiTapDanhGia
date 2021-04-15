<template>
  <div
    id="dialogConfirmDelete"
    class="dialog"
    v-bind:class="{ 'dialog-hide': isHideDialogConfirm }"
  >
    <div class="model"></div>
   
    <div class="dialog-content" style="width: 500px">
       <div class="dialog-header">
      <div
        class="dialog-close-button"
   
        v-on:click="btnOnCancel()"
      >
        &#x2715;
      </div>
    </div>
      <div class="dialog-body">
        <p>{{ messageDelete }}</p>
      </div>
      <div class="dialog-footer">
        <button class="btn-default btn-cancel" v-on:click="btnOnCancel()">
          Hủy
        </button>
        <button
          id="btnConfirmDelete"
          class="btn-default"
          v-on:click="btnOnConfirmOk()"
          style="background-color: #f65454"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>



<script>
// import axios from "axios";
export default {
  created() {},
  props: {
    isHideDialogConfirm: {
      type: Boolean,
      default: true,
    },
    selectedId: {
      type: String,
      default: null,
    },
    employee: {
      type: Object,
      default: null,
    },
    messageDelete: {
      type: String,
      default: null,
    },
  },
  methods: {
    btnOnCancel() {
      this.$emit("hideDialogDetail", false);
    },
    btnOnConfirmOk() {
      this.$emit("deleteDataOnRow", this.selectedId);
      console.log(this.selectedId);
      this.$emit("hideDialogDetail", false);
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
@import url(../../assets/css/CommonCss/dialog.css);
@import url(../../assets/css/EmployeeCss/employee.css);
</style>