import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/MenuView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import('@/views/PedidosView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth()

  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)

  if (requiresAuth) {
    if (!isAuthenticated.value) {
      try {
        await checkAuth()
      } catch {
        // ignore
      }
    }
    if (!isAuthenticated.value) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated.value) {
    return { path: '/dashboard' }
  }

  return true
})

export default router
