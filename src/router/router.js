import {createRouter, createWebHistory} from 'vue-router'
import WelcomePage from '../../pages/welcomePage.vue'
import SuccessModal from '../../pages/SuccessModal.vue'

const routes = [
	{
		middleware:['auth']
	},
	{
		path: '/welcomePage',
		name: 'welcomePage',
		component: WelcomePage,
	},
	{
		path: '/SuccesModal',
		name: 'SuccesModal',
		component: SuccessModal
	}
]

export default router = createRouter({
	history: createWebHistory(),
	routes
})

