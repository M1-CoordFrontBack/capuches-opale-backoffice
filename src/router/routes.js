import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Layout from "@/layout/frontend/Layout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Quests = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Quests.vue");
const FrontQuests = () =>
  import(
    /* webpackChunkName: "common" */ "@/pages/FrontOffice/FrontQuests.vue"
  );
const CreateQuest = () =>
  import(
    /* webpackChunkName: "common" */ "@/pages/FrontOffice/CreateQuest.vue"
  );

// Security
const Login = () =>
  import(
    /* webpackChunkName: "security" */ "@/pages/FrontOffice/Security/Login.vue"
  );
const Register = () =>
  import(
    /* webpackChunkName: "security" */ "@/pages/FrontOffice/Security/Register.vue"
  );

const routes = [
  {
    path: "/quests",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "quêtes",
        component: Quests,
        props: true,
      },
    ],
  },
  {
    path: "/front",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "create-quest",
        name: "create-quest",
        component: CreateQuest,
      },
      {
        path: "quests",
        name: "front-quests",
        component: FrontQuests,
        props: true,
      },
    ],
  },
  { path: "*", component: NotFound },
  { path: "/", name: "login", component: Login, props: true },
  { path: "/register", name: "register", component: Register },
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
