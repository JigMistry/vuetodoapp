import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
        {
            path: "/",
            redirect: "/todos"
        },
        {
			path: '/todos',
			name: 'ToDoPage',
            component: () => import('./pages/ToDoPage.vue')
        },
        {
            path: "**",
            redirect: "/todos"
        }
    ]
});

export default router;

