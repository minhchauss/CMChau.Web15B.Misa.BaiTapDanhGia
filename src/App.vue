<template>
   <div id="app">
    <TheHeader/>
    <TheNavbar/>
    <TheContent/>
  </div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
import TheContent from './components/layouts/TheContent.vue'
import TheNavbar from './components/layouts/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheContent,
    TheNavbar,
   
  }
}
</script>

<style>
@import url(./assets/css/CommonCss/button.css);
@import url(./assets/css/CommonCss/combobox.css);
@import url(./assets/css/CommonCss/common.css);
@import url(./assets/css/CommonCss/dialog.css);
@import url(./assets/css/CommonCss/icon.css);
@import url(./assets/css/CommonCss/input.css);
@import url(./assets/css/CommonCss/slideshow.css);
@import url(./assets/css/CommonCss/table.css);
@import url(./assets/css/EmployeeCss/employee.css);
@import url(./assets/css/CommonCss/common.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
