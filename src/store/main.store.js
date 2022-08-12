import { defineStore } from 'pinia'
import router from '../router'
import { watch, ref } from 'vue'
import apolloClient from '../helpers/ApolloClient'
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
provideApolloClient(apolloClient)

export const useMainStore = defineStore('mainstore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      shoppingCart: JSON.parse(localStorage.getItem('shopping_cart')) || [],
      order: null
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
