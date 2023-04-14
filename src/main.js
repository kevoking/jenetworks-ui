import { createApp } from 'vue'
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
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Carousel from 'primevue/carousel';

import router from './router'
// import VueSocialChat from 'vue-social-chat'
// Update

import './style.css'
import 'vue-social-chat/dist/style.css'
const pinia = createPinia()

createApp(App)
.use(PrimeVue)
.provide(DefaultApolloClient, appolloClient)
.use(ToastService)
.use(ConfirmationService)
// .use(VueSocialChat)
.component('DataTable', DataTable)
.component('Column', Column)
.component('Dialog', Dialog)
.component('Menu', Menu)
.component('ProgressSpinner', ProgressSpinner)
.component('Message', Message)
.component('Button', Button)
.component('Calendar', Calendar)
.component('Textarea', Textarea)
.component('Checkbox', Checkbox)
.component('InputText', InputText)
.component('AccordionTab', AccordionTab)
.component('Accordion', Accordion)
.component('InputSwitch', InputSwitch)
.component('Dropdown', Dropdown)
.component('Toast', Toast)
.component('Carousel', Carousel)
.component('ConfirmDialog', ConfirmDialog)
.use(pinia)
.use(router)
.mount('#app')
