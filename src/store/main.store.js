import { defineStore } from 'pinia'
import router from '../router'
import { watch, ref } from 'vue'
import apolloClient from '../helpers/ApolloClient'
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import axios from 'axios'
provideApolloClient(apolloClient)

const mpesaUrl = 'http://217.21.122.56:9292/prime/je/api/';

export const useMainStore = defineStore('mainstore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      shoppingCart: JSON.parse(localStorage.getItem('shopping_cart')) || [],
      order: null,
      orders: [],
      mpesaCheckOutResponse: null,
      paymentMatrices: [],
      loading: false,
      mpesaStkResponse: null
    }
  },
  getters: {
    cartTotal () {
      let amount = 0;
      if (this.shoppingCart != null) {
        this.shoppingCart.forEach((item) => {
          amount += item.amount
        })
      }
      return amount
    },
    orderTotal () {
      let amount = 0;
      if (this.order != null) {
        this.order.items.forEach((item) => {
          amount += item.amount
        })
      }
      return amount
    },
    cartItemIds () {
      let ids = [];
      if (this.shoppingCart != null) {
        this.shoppingCart.forEach((item) => {
          ids.push(item.id)
        })
      }
      return ids;
    }
  },
  actions: {
    async mpesaCheckOut(payload) {
      this.loading = true;
      this.mpesaCheckOutResponse = null
      axios
      .post(mpesaUrl + 'mpesa/checkout', payload)
      .then(response => {
        this.mpesaCheckOutResponse = response;
        this.loading = false;
      }, error => {
        this.mpesaCheckOutResponse = error;
        this.loading = false;
      });

      // try {
      //   this.loading = true;
      //   const data = await axios.post(mpesaUrl + 'mpesa/checkout', payload)
      //     this.mpesaCheckOutResponse = data.data
      //     this.loading = false;
      //   }
      //   catch (error) {
      //     alert(error)
      //     console.log(error)
      //     this.loading = false;
      // }
    },
    async mpesaCheckOut2(phoneNumber, orderId) {
      this.loading = true;
      const { result } = useQuery(gql`
        query checkout ($phoneNumber: String!, $orderId: Long!) {
          checkout (phoneNumber: $phoneNumber, orderId: $orderId){
            id,
            success,
            message
          }
        }
        `, {
        variables: {
          phoneNumber: phoneNumber,
          orderId: orderId
        },
      })
      let response = ref(null);
      console.log(phoneNumber);
      watch(result, value => {
        this.loading = false;
        this.mpesaStkResponse = value.checkout;
      })
    },
    async saveOrder(payload) {
      const { mutate: addOrder } = useMutation(gql`
        mutation addOrder ($order: OrderInput) {
          addOrder (input: $order){
            id
          }
        }
        `, {
        variables: {
          order: payload,
        },
      })
      let id = ref(null);
      addOrder().then(function (result) {
        console.log(result.data.addOrder);
        id.value = result.data.addOrder.id
      }, function (error) {
        console.log('xxxxxxxxxxxxxxx' + error.message)
        router.push('/login')
      });
      watch(id, value => {
        this.modal = null
        this.shoppingCart = null;
        localStorage.setItem('shopping_cart', JSON.stringify([]));
        // this.getBandwidths()
        router.push('/cart-checkout/' + value)
      })
    },
    async getOrder(orderId) {
      const { result } = useQuery(gql`
        query getOrder ($id: Long) {
          getOrder (id: $id) {
            id
            user {
              phone
              firstName
              lastName
            }
            items {
              id
              vps {
                id
                processorType {
                  id
                  type
                }
                cpuType {
                  id
                  name
                }
                cpuClockSpeed {
                  id
                  speed
                }
                ramSize {
                  id
                  size
                }
                romType
                romSize {
                  id
                  size
                }
                bandWidthSize {
                  id
                  size
                }
                ips
                status
              }
              dedicatedServer {
                id
                processorType {
                  id
                  type
                }
                cpuType {
                  id
                  name
                }
                cpuClockSpeed {
                  id
                  speed
                }
                ramSize {
                  id
                  size
                }
                romType
                romSize {
                  id
                  size
                }
                bandWidthSize {
                  id
                  size
                }
                ips
                status
              }
              os {
                id
                name
              }
              amount
            }
            status
          }
        }
      `, {
          id: orderId,
        })
      watch(result, value => {
        console.log(value.getOrder)
        this.order = value.getOrder;
      })
    },
    async getOrders() {
      const { result } = useQuery(gql`
        query {
          getAllOrders {
            id
            user {
              phone
              firstName
              lastName
            }
            items {
              id
              vps {
                id
                processorType {
                  id
                  type
                }
                cpuType {
                  id
                  name
                }
                cpuClockSpeed {
                  id
                  speed
                }
                ramSize {
                  id
                  size
                }
                romType
                romSize {
                  id
                  size
                }
                bandWidthSize {
                  id
                  size
                }
                ips
                status
              }
              dedicatedServer {
                id
                processorType {
                  id
                  type
                }
                cpuType {
                  id
                  name
                }
                cpuClockSpeed {
                  id
                  speed
                }
                ramSize {
                  id
                  size
                }
                romType
                romSize {
                  id
                  size
                }
                bandWidthSize {
                  id
                  size
                }
                ips
                status
              }
              os {
                id
                name
              }
              amount
            }
            status
          }
        }
      `, {
          // 
        })
      watch(result, value => {
        console.log(value.getAllOrders)
        this.orders = value.getAllOrders;
      })
    },
    async getPaymentEmailMatrices(id) {
      const { result } = useQuery(gql`
        query ($vpsId: Long) {
          getPaymentMatrixByVps (vpsId: $vpsId) {
            id
            vps {
              id
              processorType {
                id
                type
              }
              cpuType {
                id
                name
              }
              cpuClockSpeed {
                id
                speed
              }
              ramSize {
                id
                size
              }
              romType
              romSize {
                id
                size
              }
              bandWidthSize {
                id
                size
              }
              ips
              status
            }
            os {
              id
              name
            }
            amount
          }
        }
      `, {
        vpsId: id,
      })
      watch(result, value => {
        this.paymentMatrices = value.getPaymentMatrixByVps;
      })
    },
    async getPaymentVpsMatrices(id) {
      const { result } = useQuery(gql`
        query ($vpsId: Long) {
          getPaymentMatrixByVps (vpsId: $vpsId) {
            id
            vps {
              id
              processorType {
                id
                type
              }
              cpuType {
                id
                name
              }
              cpuClockSpeed {
                id
                speed
              }
              ramSize {
                id
                size
              }
              romType
              romSize {
                id
                size
              }
              bandWidthSize {
                id
                size
              }
              ips
              status
            }
            os {
              id
              name
            }
            amount
          }
        }
      `, {
        vpsId: id,
      })
      watch(result, value => {
        this.paymentMatrices = value.getPaymentMatrixByVps;
      })
    },
    async getPaymentDedicatedServerMatrices(id) {
      const { result } = useQuery(gql`
        query ($dedicatedServerId: Long) {
          getPaymentMatrixByDedicatedServer (dedicatedServerId: $dedicatedServerId) {
            id
            dedicatedServer {
              id
              processorType {
                id
                type
              }
              cpuType {
                id
                name
              }
              cpuClockSpeed {
                id
                speed
              }
              ramSize {
                id
                size
              }
              romType
              romSize {
                id
                size
              }
              bandWidthSize {
                id
                size
              }
              ips
              status
            }
            os {
              id
              name
            }
            amount
          }
        }
      `, {
        dedicatedServerId: id,
      })
      watch(result, value => {
        this.paymentMatrices = value.getPaymentMatrixByDedicatedServer;
      })
    },
    async getPaymentPlans(category, id) {
      if (category == 'vps') {
        this.getPaymentVpsMatrices(id)
      } else if (category === 'dedicated_server') {
        this.getPaymentDedicatedServerMatrices(id)
      } else if (category === 'email_hosting') {
        // this.getPaymentDedicatedServerMatrices(id)
      }
    },
    addCartItem(payload) {
      let cart = this.shoppingCart
      if (cart == null) {
        cart = []
      }
      cart.push(payload)
      this.shoppingCart = cart;
      localStorage.setItem('shopping_cart', JSON.stringify(cart));
      router.push('/cart')
    },
    removeCartItem(index) {
      let cart = this.shoppingCart
      
      cart.splice(index, 1)
      this.shoppingCart = cart;
      localStorage.setItem('shopping_cart', JSON.stringify(cart));
    },
  }
})
