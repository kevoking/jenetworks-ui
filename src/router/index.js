import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Product from '../views/Product.vue'
import Cart from '../views/ShoppingCart.vue'
import CartCheckout from '../views/ShoppingCartCheckout.vue'
import UserAccount from '../views/UserAccount.vue'
import ProductPlans from '../views/ProductPlans.vue'

import Dashboard from '../views/admin/Dashboard.vue'
import Measurements from '../views/admin/Measurements.vue'
import ProductCategories from '../views/admin/ProductCategories.vue'
import DedicatedServers from '../views/admin/DedicatedServers.vue'
import VpsList from '../views/admin/VpsList.vue'
import PaymentMatrices from '../views/admin/PaymentMatrices.vue'
import Orders from '../views/admin/Orders.vue'
import EmailHosting from '../views/admin/EmailHosting.vue'
import SharedHosting from '../views/admin/SharedHosting.vue'
import OrderDetails from '../views/admin/OrderDetails.vue'
import Users from '../views/admin/Users.vue'

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
				name: 'home',
				component: Home,
			},
			{
				path: '/about',
				name: 'About',
				component: About,
			},
			{
				path: '/product/:type',
				name: 'Product',
				component: Product,
			},
			{
				path: '/product-plans/:id/:type',
				name: 'product-plans',
				component: ProductPlans,
			},
			{
				path: '/login',
				name: 'login',
				component: Login,
			},
			{
				path: '/register',
				name: 'register',
				component: Register,
			},
			{
				path: '/verify-email/:id',
				name: 'verifyEmail',
				component: VerifyEmail,
			},
			{
				path: '/cart',
				name: 'cart',
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
				name: 'user-account',
				component: UserAccount,
			},
			{
				path: '/cart-checkout/:id',
				name: 'cart-checkout',
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
				name: 'dashboard',
				component: Dashboard,
			},
			{
				path: '/measurements',
				name: 'measurements',
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
				path: '/orders',
				name: 'Orders',
				component: Orders,
			},
			{
				path: '/users',
				name: 'Users',
				component: Users,
			},
			{
				path: '/order-details/:id',
				name: 'order-details',
				component: OrderDetails,
			},
			{
				path: '/email-hosting',
				name: 'EmailHosting',
				component: EmailHosting,
			},
			{
				path: '/shared-hosting',
				name: 'SharedHosting',
				component: SharedHosting,
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