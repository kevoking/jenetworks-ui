import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Cart from '../views/ShoppingCart.vue'
import CartCheckout from '../views/ShoppingCartCheckout.vue'
import UserAccount from '../views/UserAccount.vue'

import Dashboard from '../views/admin/Dashboard.vue'
import Measurements from '../views/admin/Measurements.vue'
import ProductCategories from '../views/admin/ProductCategories.vue'
import DedicatedServers from '../views/admin/DedicatedServers.vue'
import VpsList from '../views/admin/VpsList.vue'
import PaymentMatrices from '../views/admin/PaymentMatrices.vue'

import { useAuthStore } from '../store'
import { createRouterLayout } from 'vue-router-layout'

const RouterLayout = createRouterLayout(layout => {
	// Resolves a layout component with layout type string.
	return import('../layouts/AppLayout.vue')
})
const AdminRouterLayout = createRouterLayout(layout => {
	// Resolves a layout component with layout type string.
	return import('../layouts/AdminLayout.vue')
})
const routes = [
	{
		path: '/',
		component: RouterLayout,
		meta: {
			requiresAuth: false,
		},
		children: [
			{
				path: '/',
				name: 'Home',
				component: Home,
			},
			{
				path: '/login',
				name: 'Login',
				component: Login,
			},
			{
				path: '/cart',
				name: 'Cart',
				component: Cart,
			}
		]
	},
	{
		path: '/',
		component: RouterLayout,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/my-account',
				name: 'UserAccount',
				component: UserAccount,
			},
			{
				path: '/cart-checkout/:id',
				name: 'CartCheckout',
				component: CartCheckout,
			}
		]
	},
	{
		path: '/',
		component: AdminRouterLayout,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/console',
				name: 'Dashboard',
				component: Dashboard,
			},
			{
				path: '/measurements',
				name: 'Measurements',
				component: Measurements,
			},
			{
				path: '/product-categories',
				name: 'ProductCategories',
				component: ProductCategories,
			},
			{
				path: '/dedicated-servers',
				name: 'DedicatedServers',
				component: DedicatedServers,
			},
			{
				path: '/vps-list',
				name: 'VpsList',
				component: VpsList,
			},
			{
				path: '/payment-matrices',
				name: 'PaymentMatrices',
				component: PaymentMatrices,
			}
		]
	}
]

const router = createRouter({
	linkActiveClass: 'active',
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(async (to) => {
	// ✅ Make sure user is authorized to access protexted routes
	const auth = useAuthStore()

	if (to.meta.requiresAuth && !auth.isLoggedIn) {
		auth.returnUrl = to.fullPath;
		return '/login'
	}
})

export default router