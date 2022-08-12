import { defineStore } from 'pinia'
import router from '../router'
import { watch, ref } from 'vue'
import apolloClient from '../helpers/ApolloClient'
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
provideApolloClient(apolloClient)

export const useMeasurementStore = defineStore('measurements', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      modal: null,
      bandwidths: [],
      cpuClockSpeeds: [],
      cpuTypes: [],
      operatingSystems: [],
      processerTypes: [],
      rams: [],
      roms: [],
      productCategories: [],
      dedicatedServers: [],
      paymentMatrices: [],
      vpsList: []
    }
  },
  getters: {
    featuredVpsPlan() {
      const plans = this.paymentMatrices.filter(e => e.vps);
      return plans.length > 0 ? plans[0] : null;
    },
    featuredDedicatedServerPlan() {
      const plans = this.paymentMatrices.filter(e => e.dedicatedServer);
      return plans.length > 0 ? plans[0] : null;
    }
  },
  actions: {
    // CREATORS
    async saveBandwidth(payload) {
      const { mutate: addBandWidth } = useMutation(gql`
        mutation addBandWidth ($bandwith: BandWidthSizeInput!) {
          addBandWidth (input: $bandwith){
            id
          }
        }
        `, {
        variables: {
          bandwith: payload,
        },
      })
      let id = ref(null);
      addBandWidth().then(function (result) {
        console.log(result.data.addBandWidth);
        id.value = result.data.addBandWidth.id
      });
      watch(id, value => {
        this.modal = null
        this.getBandwidths()
      })
    },
    async saveClockSpeed(payload) {
      const { mutate: addCpuClockSpeed } = useMutation(gql`
        mutation addCpuClockSpeed ($clockspeed: CpuClockSpeedInput!) {
          addCpuClockSpeed (input: $clockspeed){
            id
          }
        }
        `, {
        variables: {
          clockspeed: payload,
        },
      })
      let id = ref(null);
      addCpuClockSpeed().then(function (result) {
        console.log(result.data.addCpuClockSpeed);
        id.value = result.data.addCpuClockSpeed.id
      });
      watch(id, value => {
        this.modal = null
        this.getBandwidths()
      })
    },
    async saveCpuType(payload) {
      const { mutate: addCpuType } = useMutation(gql`
        mutation addCpuType ($cputype: CpuTypeInput!) {
          addCpuType (input: $cputype){
            id
          }
        }
        `, {
        variables: {
          cputype: payload,
        },
      })
      let id = ref(null);
      addCpuType().then(function (result) {
        console.log(result.data.addCpuType);
        id.value = result.data.addCpuType.id
      });
      watch(id, value => {
        this.modal = null
        this.getCpuTypes()
      })
    },
    async saveOperatingSystem(payload) {
      const { mutate: addOperatingSystem } = useMutation(gql`
        mutation addOperatingSystem ($os: OperatingSystemInput!) {
          addOperatingSystem (input: $os){
            id
          }
        }
        `, {
        variables: {
          os: payload,
        },
      })
      let id = ref(null);
      addOperatingSystem().then(function (result) {
        console.log(result.data.addOperatingSystem);
        id.value = result.data.addOperatingSystem.id
      });
      watch(id, value => {
        this.modal = null
        this.getOperatingSystems()
      })
    },
    async saveProcessorType(payload) {
      const { mutate: addProcessorType } = useMutation(gql`
        mutation addProcessorType ($os: ProcessorTypeInput!) {
          addProcessorType (input: $os){
            id
          }
        }
        `, {
        variables: {
          os: payload,
        },
      })
      let id = ref(null);
      addProcessorType().then(function (result) {
        console.log(result.data.addProcessorType);;
        id.value = result.data.addProcessorType.id
      });
      watch(id, value => {
        this.modal = null
        this.getProcessorTypes()
      })
    },
    async saveRamSize(payload) {
      const { mutate: addRamSize } = useMutation(gql`
        mutation addRamSize ($ram: RamSizeInput!) {
          addRamSize (input: $ram){
            id
          }
        }
        `, {
        variables: {
          ram: payload,
        },
      })
      let id = ref(null);
      addRamSize().then(function (result) {
        console.log(result.data.addRamSize);;
        id.value = result.data.addRamSize.id
      });
      watch(id, value => {
        this.modal = null
        this.getRams()
      })
    },
    async saveRomSize(payload) {
      const { mutate: addRomSize } = useMutation(gql`
        mutation addRomSize ($rom: RomSizeInput!) {
          addRomSize (input: $rom){
            id
          }
        }
        `, {
        variables: {
          rom: payload,
        },
      })
      let id = ref(null);
      addRomSize().then(function (result) {
        console.log(result.data.addRomSize);;
        id.value = result.data.addRomSize.id
      });
      watch(id, value => {
        this.modal = null
        this.getRoms()
      })
    },
    async saveProductCategory(payload) {
      const { mutate: addProductCategory } = useMutation(gql`
        mutation addProductCategory ($category: ProductCategoryInput!) {
          addProductCategory (input: $category){
            id
          }
        }
        `, {
        variables: {
          category: payload,
        },
      })
      let id = ref(null);
      addProductCategory().then(function (result) {
        console.log(result.data.addProductCategory);;
        id.value = result.data.addProductCategory.id
      });
      watch(id, value => {
        this.modal = null
        this.getProductCategories()
      })
    },
    async saveDedicatedServer(payload) {
      const { mutate: addDedicatedServer } = useMutation(gql`
        mutation addDedicatedServer ($server: DedicatedServerInput) {
          addDedicatedServer (input: $server){
            id
          }
        }
        `, {
        variables: {
          server: payload,
        },
      })
      let id = ref(null);
      addDedicatedServer().then(function (result) {
        console.log(result.data.addDedicatedServer);;
        id.value = result.data.addDedicatedServer.id
      });
      watch(id, value => {
        this.modal = null
        this.getDedicatedServers()
      })
    },
    async saveVps(payload) {
      const { mutate: addVps } = useMutation(gql`
        mutation addVps ($server: VpsInput) {
          addVps (input: $server){
            id
          }
        }
        `, {
        variables: {
          server: payload,
        },
      })
      let id = ref(null);
      addVps().then(function (result) {
        console.log(result.data.addVps);;
        id.value = result.data.addVps.id
      });
      watch(id, value => {
        this.modal = null
        this.getVpsList()
      })
    },
    async savePaymentMatrix(payload) {
      const { mutate: addPaymentMatrix } = useMutation(gql`
        mutation addPaymentMatrix ($payment: PaymentMatrixInput) {
          addPaymentMatrix (input: $payment){
            id
          }
        }
        `, {
        variables: {
          payment: payload,
        },
      })
      let id = ref(null);
      addPaymentMatrix().then(function (result) {
        console.log(result.data.addPaymentMatrix);;
        id.value = result.data.addPaymentMatrix.id
      });
      watch(id, value => {
        this.modal = null
        this.getPaymentMatrices()
      })
    },
    // Get Lists
    async getBandwidths() {
      const { result } = useQuery(gql`
        query {
          getAllBandwidthSizes {
            id
            size
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.bandwidths = value.getAllBandwidthSizes;
      })
    },
    async getCpuClockSpeeds() {
      const { result } = useQuery(gql`
        query {
          getAllCpuClockSpeeds {
            id
            speed
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.cpuClockSpeeds = value.getAllCpuClockSpeeds;
      })
    },
    async getCpuTypes() {
      const { result } = useQuery(gql`
        query {
          getAllCpuTypes {
            id
            name
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.cpuTypes = value.getAllCpuTypes;
      })
    },
    async getOperatingSystems() {
      const { result } = useQuery(gql`
        query {
          getAllOperatingSystems {
            id
            name
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.operatingSystems = value.getAllOperatingSystems;
      })
    },
    async getProcessorTypes() {
      const { result } = useQuery(gql`
        query {
          getAllProcessorTypes {
            id
            type
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.processerTypes = value.getAllProcessorTypes;
      })
    },
    async getRams() {
      const { result } = useQuery(gql`
        query {
          getAllRamSizes {
            id
            size
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.rams = value.getAllRamSizes;
      })
    },
    async getRoms() {
      const { result } = useQuery(gql`
        query {
          getAllRomSizes {
            id
            size
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.roms = value.getAllRomSizes;
      })
    },
    async getProductCategories() {
      const { result } = useQuery(gql`
        query {
          getAllProductCategories {
            id
            name
            description
            status
          }
        }
      `)
      watch(result, value => {
        this.productCategories = null;
        this.productCategories = value.getAllProductCategories;
      })
    },
    async getDedicatedServers() {
      const { result } = useQuery(gql`
        query {
          getAllDedicatedServers {
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
        }
      `)
      watch(result, value => {
        this.dedicatedServers = value.getAllDedicatedServers;
      })
    },
    async getVpsList() {
      const { result } = useQuery(gql`
        query {
          getAllVps {
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
        }
      `)
      watch(result, value => {
        this.vpsList = value.getAllVps;
      })
    },
    async getPaymentMatrices() {
      const { result } = useQuery(gql`
        query {
          getAllPaymentMatrices {
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
        }
      `)
      watch(result, value => {
        this.paymentMatrices = value.getAllPaymentMatrices;
      })
    },
  }
})
