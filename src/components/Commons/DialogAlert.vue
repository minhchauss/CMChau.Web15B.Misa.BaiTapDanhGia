<template>
  <div
    id="dialogConfirmDelete"
    class="dialog"
    v-bind:class="{ 'dialog-hide': isHideDialogAlert }"
  >
    <div class="model"></div>
    <div class="dialog-content">
      <div class="dialog-body">
        <p>{{ messageAlert }}</p>
      </div>
      <div class="dialog-footer">
        <button id="btnConfirmDelete" class="btn-default" v-on:click="btnOnCancel()">
          OK
        </button>
      </div>
    </div>
  </div>
</template>



<script>
// import axios from "axios";
export default {
  created() {
    
  },
  props: {
    isHideDialogAlert: {
      type: Boolean,
      default: true,
    },
    messageAlert:{
        type:String,
        default:null,
    }
  },
  methods: {
    btnOnCancel() {
      this.$emit("hideDialogAlert");
    },
  },
  data() {
    return {
      
      
    };
  },
};
</script>
<style scoped>
@import url(../../assets/css/CommonCss/dialog.css);
@import url(../../assets/css/EmployeeCss/employee.css);
</style>