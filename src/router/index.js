import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Contact from '../views/Contact.vue'
import Blog from '../views/Blog.vue'
import OpenAccount from '../views/OpenAccount.vue'
import CustomerInfo from '../views/CustomerInfo.vue'
import Transaction from '../views/Transaction.vue'
import DataAnalysis from '../views/DataAnalysis.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Admin from '../views/Admin.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import EditCustomer from '../views/EditCustomer.vue'
import Analysis from '@/views/Analysis.vue'
import AccountDetail from '@/views/AccountDetail.vue'
import AccountInfo from '@/views/AccountInfo.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/services',
    component: Services
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/open-account',
    component: OpenAccount
  },
  {
    path: '/customer-info',
    name: 'CustomerInfo',
    component: () => import('../views/CustomerInfo.vue'),
  },
  {
    path: '/transaction',
    component: Transaction
  },
  {
    path: '/data-analysis',
    component: DataAnalysis
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/customer-detail/:id',
    name: 'CustomerDetail',
    component: () => import('../views/CustomerDetail.vue'),
  },
  {
    path: '/edit-customer/:id',
    name: 'EditCustomer',
    component: EditCustomer
  },
  {
    path: '/account/:id',
    name: 'AccountDetail',
    component: AccountDetail,
  },
  {
    path: '/account-info',
    name: 'AccountInfo',
    component: AccountInfo,
  },
  {
    path: '/account/:id/edit',
    name: 'EditAccount',
    component: () => import('../views/EditAccount.vue'),
  },
  {
    path: '/account/:id/transactions',
    name: 'TransactionHistory',
    component: () => import('../views/TransactionHistory.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
