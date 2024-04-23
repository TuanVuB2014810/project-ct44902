import { createWebHistory, createRouter } from "vue-router";
import store from '@/store/index.js';
import Admin from "@/views/admin/Admin.vue";

const routes = [
    {
        path: "/quanly/login",
        name: "login.admin",
        component: () => import("@/views/admin/login.vue"),
    },
    {
        path: "/quanly",
        name: "index",
        component: Admin,
        meta: { requiresAuthAdmin: true }
    },
    
    // nxb
    {
        path: "/quanly/nxb",
        name: "nxb",
        component: () => import("@/views/admin/nxb/nxb.vue"),
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/edit-NXB/:id",
        name: "editNxb",
        component: () => import("@/views/admin/nxb/editnxb.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/add-NXB",
        name: "nxb.add",
        component: () => import("@/views/admin/nxb/add_nxb.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    },
    // sach
    {
        path: "/quanly/sach",
        name: "sach.admin",
        component: () => import("@/views/admin/book/sach.vue"),
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/edit-sach/:id",
        name: "book.edit",
        component: () => import("@/views/admin/book/edit_book.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/add-sach",
        name: "book.add",
        component: () => import("@/views/admin/book/add_book.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    },
    // docgia
    {
        path: "/quanly/docgia",
        name: "docgia.admin",
        component: () => import("@/views/admin/docgia/docgia.vue"),
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/edit-docgia/:id",
        name: "editDocgia",
        component: () => import("@/views/admin/docgia/editdocgia.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/quanly/add-docgia",
        name: "docgia.add",
        component: () => import("@/views/admin/docgia/add_docgia.vue"),
        props: true,
        meta: { requiresAuthAdmin: true }
    }
    ,
    {
        path: "/quanly/muonsach",
        name: "muonsach.admin",
        component: () => import("@/views/admin/muonsach.vue"),
        meta: { requiresAuthAdmin: true }
    },
    {
        path: "/login",
        name: "login.user",
        component: () => import("@/views/user/login.vue"),
    },
    {
        path: "/",
        name: "index.user",
        component: () => import("@/views/user/trangchu.vue"),
    },
    {
        path: "/sach",
        name: "sach.user",
        component: () => import("@/views/user/book/book.vue"),
     
    },
    {
        path: "/muon-sach",
        name: "muonsach.user",
        component: () => import("@/views/user/muonsach.vue"),
        meta: { requiresAuthUser: true }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log("middleware");
    console.log(store.getters.loggedInUser);


    if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    
        if (!store.getters.loggedInUser || store.getters.loggedInUser.role !== 'admin') {
          
            next({ name: 'login.admin' });
        } else {
      
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuthUser)) {
     
        if (!store.getters.loggedInUser || store.getters.loggedInUser.role !== 'user') {
          
            next({ name: 'login.user' });
        } else {
         
            next();
        }
    } else {
        next(); 
    }
});

export default router;
