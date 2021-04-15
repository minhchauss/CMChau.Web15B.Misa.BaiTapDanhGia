import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Customer from './components/Views/Customer/Customer.vue'
import Employee from './components/Views/Employee/Employee.vue'
import './assets/css/CommonCss/main.css'
Vue.config.productionTip = false


//Xác định các router
const routes = [
        { path: '/Khach-hang', component: Customer },
        { path: '/Nhan-vien', component: Employee }
    ]
    //Tạo 1 đối tượng router và chuyển tùy chọn `routes`
const router = new VueRouter({
    routes // short for `routes: routes`
})

//Cài đặt router
Vue.use(VueRouter)
    //Tạo 1 đối tượng gốc
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')