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
      errorMessage: '',
      token: localStorage.getItem('accessToken'),
      userId: '',
      password: '',
      verified: false,
      users: []
    }
  },
  getters: {
    fullName () {
      return this.user?.firstName + ' ' + this.user?.lastName
    }
  },
  actions: {
    async login(payload) {
      this.errorMessage = ''
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
    async signup(payload) {
      this.errorMessage = ''
      const { mutate: signUpStaff } = useMutation(gql`
        mutation signUpStaff ($user: SignUpInput!) {
          signUpStaff (input: $user){
            id
            success
            message
          }
        }
        `, {
        variables: {
          user: payload,
        },
      })

      let success = ref(null)
      let message = ref(null)
      let id = ref(null)

      signUpStaff().then(function (result) {
        console.log(result.data.signUpStaff);
        id.value = result.data.signUpStaff.id
        success.value = result.data.signUpStaff.success
        message.value = result.data.signUpStaff.message
      });

      watch(success, value => {
        if (value === true) {
          this.password = payload.password
          this.userId = id.value
          router.push('/verify-email/' + id.value);
        } else {

          this.errorMessage = message.value
        }
      })
    },
    async signupStaff(payload) {
      this.errorMessage = ''
      const { mutate: signUpStaff } = useMutation(gql`
        mutation signUpStaff ($user: SignUpInput!) {
          signUpStaff (input: $user){
            id
            success
            message
          }
        }
        `, {
        variables: {
          user: payload,
        },
      })

      let success = ref(null)
      let message = ref(null)
      let id = ref(null)

      signUpStaff().then(function (result) {
        console.log(result.data.signUpStaff);
        id.value = result.data.signUpStaff.id
        success.value = result.data.signUpStaff.success
        message.value = result.data.signUpStaff.message
      });

      watch(success, value => {
        if (value === true) {
          this.password = payload.password
          this.userId = id.value
          router.push('/verify-email/' + id.value);
        } else {

          this.errorMessage = message.value
        }
      })
    },
    async saveStaff(payload) {
      this.errorMessage = ''
      const { mutate: signUpStaff } = useMutation(gql`
        mutation signUpStaff ($user: SignUpInput!) {
          signUpStaff (input: $user){
            id
            success
            message
          }
        }
        `, {
        variables: {
          user: payload,
        },
      })

      let success = ref(null)
      let message = ref(null)
      let id = ref(null)

      signUpStaff().then(function (result) {
        console.log(result.data.signUpStaff);
        id.value = result.data.signUpStaff.id
        success.value = result.data.signUpStaff.success
        message.value = result.data.signUpStaff.message
      });

      watch(success, value => {
        if (value === true) {
          window.location.reload()
        } else {

          this.errorMessage = message.value
        }
      })
    },
    updateStaff(payload) {
      this.errorMessage = ''
      const { mutate: updateUser } = useMutation(gql`
        mutation updateUser ($user: UpdateUserInput!) {
          updateUser (input: $user){
            id
            success
            message
          }
        }
        `, {
        variables: {
          user: payload,
        },
      })

      let success = ref(null)
      let message = ref(null)
      let id = ref(null)

      updateUser().then(function (result) {
        console.log(result.data.updateUser);
        id.value = result.data.updateUser?.id
        success.value = result.data.updateUser?.success
        message.value = result.data.updateUser?.message
      });

      watch(success, value => {
        if (value === true) {
          window.location.reload()
        } else {

          this.errorMessage = message.value
        }
      })
    },
    getUsers() {
      const { result } = useQuery(gql`
        query {
          getAllUsers {
            id
            firstName
            lastName
            email
            phone
            staffNo
            status
          }
        }
      `)
      watch(result, value => {
        this.users = value.getAllUsers;
      })
    },

    deleteUser(id) {
      // const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
      //   mutation deactivateCpuClockSpeed ($id: Long!) {
      //     deactivateCpuClockSpeed (id: $id){
      //       id
      //     }
      //   }
      //   `, {
      //   variables: {
      //     id: id,
      //   },
      // })
      
      // deactivateCpuClockSpeed().then(function (result) {
      //   window.location.reload()
      // }, function (error) {
      //   //
      // });
    },
    async verifyEmail(payload) {
      this.errorMessage = ''
      const { mutate: verifyEmail } = useMutation(gql`
        mutation verifyEmail ($code: String!, $password: String!) {
          verifyEmail (code: $code, password: $password){
            id
            success
            message
          }
        }
        `, {
        variables: {
          code: payload.code,
          password: payload.password
        },
      })

      let success = ref(null)
      let message = ref(null)
      let id = ref(null)

      verifyEmail().then(function (result) {
        console.log(result.data.verifyEmail);
        id.value = result.data.verifyEmail.id
        success.value = result.data.verifyEmail.success
        message.value = result.data.verifyEmail.message
      });

      watch(success, value => {
        if (value === true) {
          this.verified = value
          router.push('/login');
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
