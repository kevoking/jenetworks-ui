import { defineStore } from 'pinia'
import router from '../router'
import { watch, ref } from 'vue'
import apolloClient from '../helpers/ApolloClient'
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
provideApolloClient(apolloClient)

export const useAuthStore = defineStore('authstore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      returnUrl: '/my-account',
      errorMessage: null,
      token: localStorage.getItem('accessToken')
    }
  },
  getters: {
    fullName () {
      return this.user?.firstName + ' ' + this.user?.lastName
    }
  },
  actions: {
    async login(payload) {
      const { mutate: signIn } = useMutation(gql`
        mutation signIn ($user: SignInInput) {
          signIn (input: $user){
            message
            success
            accessToken
            user {
              firstName
              lastName
              email
              phone
              staffNo
              emailAgreed
              status
            }
          }
        }
        `, {
        variables: {
          user: payload,
        },
      })
      let success = ref(null)
      let message = ref(null)
      let user = ref(null)
      let accessToken = ref(null)

      signIn().then(function (result) {
        console.log(result.data.signIn);
        user.value = result.data.signIn.user
        accessToken.value = result.data.signIn.accessToken
        success.value = result.data.signIn.success
        message.value = result.data.signIn.message
      });

      watch(success, value => {
        this.isLoggedIn = value
        if (value === true) {

          this.accessToken = accessToken.value
          this.user = user.value
          localStorage.setItem('user', JSON.stringify(user.value));
          localStorage.setItem('accessToken', accessToken.value);
          localStorage.setItem('isLoggedIn', value);
          // redirect to previous url or default to home page
          router.push(this.returnUrl || '/my-account');
        } else {

          this.errorMessage = message.value
        }
      })
    },
    logout() {
      this.isLoggedIn = false;
      this.user = {};
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      router.push('/');
    }
  }
})
