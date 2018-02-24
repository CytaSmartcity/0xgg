import 'babel-polyfill'
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import Home from './Home.vue'
import Tender_All from './Tender_All.vue'
import Header_Nav from './components/header_nav.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./assets/css/base.css"


//assign app instance for nacl;
var nacl_factory = require("js-nacl");
var nacl_instance;
var nacl = nacl_factory.instantiate(function(nacl){
nacl_instance = nacl;
});
Vue.prototype.$nacl = nacl_instance

Vue.component('header-nav', Header_Nav)

Vue.use(BootstrapVue)

const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/': Home,
  '/tenders': Tender_All,
  '/tender' : { template: '<p>single tender details view</p>'},
  '/tender/unseal' : { template: '<p>unseal for tender view</p>'},
  '/tender/select' : { template: '<p>select for tender view</p>'},
  '/create/tender' : { template: '<p>create tender view</p>'},
  '/create/offer' : { template: '<p>create offer view</p>'},
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
