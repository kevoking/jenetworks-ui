import { createApp } from 'vue'
import './style.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import appolloClient from './helpers/ApolloClient'
import { DefaultApolloClient } from '@vue/apollo-composable'

import PrimeVue from 'primevue/config'

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

import ToastService from 'primevue/toastservice';

import router from './router'

const pinia = createPinia()

createApp(App)
.use(PrimeVue)
.provide(DefaultApolloClient, appolloClient)
.use(ToastService)
.component('DataTable', DataTable)
.component('Column', Column)
.component('Dialog', Dialog)
.component('Button', Button)
.component('Calendar', Calendar)
.component('Textarea', Textarea)
.component('InputText', InputText)
.component('Dropdown', Dropdown)
.component('Toast', Toast)
.use(pinia)
.use(router)
.mount('#app')
