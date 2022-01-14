import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LeaveList from '@/views/Leave/LeaveList.vue'
import LeaveNew from '@/views/Leave/LeaveNew.vue'
import LeaveEdit from '@/views/Leave/LeaveEdit.vue'

import CompensationList from '@/views/Compensation/CompensationList.vue'
import CompensationNew from '@/views/Compensation/CompensationNew.vue'
import CompensationEdit from '@/views/Compensation/CompensationEdit.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/leaves',
        name: 'LeaveList',
        component: LeaveList
    }, {
        path: '/leaves/new',
        name: 'LeaveNew',
        component: LeaveNew
    }, {
        path: '/leaves/edit/:id',
        name: 'LeaveEdit',
        component: LeaveEdit
    },

    {
        path: '/compensations',
        name: 'CompensationList',
        component: CompensationList
    }, {
        path: '/compensations/new',
        name: 'CompensationNew',
        component: CompensationNew
    }, {
        path: '/compensations/edit/:id',
        name: 'CompensationEdit',
        component: CompensationEdit
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
