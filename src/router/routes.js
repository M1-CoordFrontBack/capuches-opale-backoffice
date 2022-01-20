import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Layout from "@/layout/frontend/Layout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Quests = () => import(/* webpackChunkName: "common" */ "@/pages/Quests.vue");
const FrontQuests = () => import(/* webpackChunkName: "common" */ "@/pages/FrontOffice/FrontQuests.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const CreateQuest = () => import(/* webpackChunkName: "common" */ "@/pages/FrontOffice/CreateQuest.vue");

// Security
const Login = () => import(/* webpackChunkName: "security" */"@/pages/FrontOffice/Security/Login.vue");
const Register = () => import(/* webpackChunkName: "security" */"@/pages/FrontOffice/Security/Register.vue");

const routes = [
  {
    path: "/quests",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "",
        name: "quêtes",
        component: Quests
      },
      {
        path: "quests",
        name: "quêtes",
        component: Quests
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  {
    path: "/front",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "create-quest",
        name: "create-quest",
        component: CreateQuest
      },
      {
        path: "quests",
        name: "front-quests",
        component: FrontQuests
      }
    ]
  },
  { path: "*", component: NotFound },
  {path: "/", name: "login", component: Login},
  {path: "/register", name: "register", component: Register},
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
