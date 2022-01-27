import VueRouter from "vue-router";
import routes from "./routes";
import localStorageService from "@/services/localStorageService";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorageService.getAccessToken();
    if (!token) {
      next({
        name: 'login',
        query: {
          nextUrl: 'login'
        }
      })
    }

    const user = localStorageService.getUser();
    if (to.name === 'quêtes' && user && user.role_id !== 3) {
      next({ name: 'front-quests' })
    }
    
    if (to.name === 'front-quests' && user && user.role_id !== 2) {
      next({ name: 'quêtes' })
    }
    const parsedJwt = localStorageService.parseToken(token);
    if (parsedJwt !== undefined) {
      if (Math.floor(Date.now() / 1000) > parsedJwt.exp) {
        localStorageService.clearToken();
        next({
          name: 'Login',
          query: {
            nextUrl: 'Login'
          }
        })
      }
    }
  }
  next();
});

export default router;
