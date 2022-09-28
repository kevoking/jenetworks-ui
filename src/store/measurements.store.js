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
      vpsList: [],
      emailIds: [],
      emailPlans: [],
      emailSpaces: [],
      emailHostingList: [],
      sharedHostingList: [],
      selectedVps: null,
      selectedDedicatedServer: null,
      toReload: '',
      //
      editUser: false,
      editUserData: null,
      //
      editDedicatedServer: false,
      editDedicatedServerData: null,
      //
      editVps: false,
      editVpsData: null,
      //
      editSharedHosting: false,
      editSharedHostingData: null,
      //
      editPaymentMatrix: false,
      editPaymentMatrixData: null,
      //
      editEmailHosting: false,
      editEmailHostingData: null,
      //
      editEmailPlan: false,
      editEmailPlanData: null,
      //
      editEmailSpace: false,
      editEmailSpaceData: null,
      //
      editEmailId: false,
      editEmailIdData: null,
      //
      editBandwidth: false,
      editBandwidthData: null,
      //
      editCpuClockSpeed: false,
      editCpuClockSpeedData: null,
      //
      editCpuType: false,
      editCpuTypeData: null,
      //
      editProcessorType: false,
      editProcessorTypeData: null,
      //
      editOs: false,
      editOsData: null,
      //
      editRam: false,
      editRamData: null,
      //
      editRom: false,
      editRomData: null,
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
    selectVps(vps) {
      this.selectedVps = vps
      this.selectedDedicatedServer = null;
    },
    selectDedicatedServer(server) {
      this.selectedDedicatedServer = server
      this.selectedVps = null;
    },
    saveBandwidth(payload) {
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
        this.toReload = 'bandwidth'
        window.location.reload()
        // this.getBandwidths()
      })
    },
    saveClockSpeed(payload) {
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
        window.location.reload()
      })
    },
    saveCpuType(payload) {
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
        window.location.reload()
        this.getCpuTypes()
      })
    },
    saveOperatingSystem(payload) {
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
        window.location.reload()
        this.getOperatingSystems()
      })
    },
    saveProcessorType(payload) {
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
        console.log('>>>' + result.data.addProcessorType);
        id.value = result.data.addProcessorType.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
        this.getProcessorTypes()
      })
    },
    saveRamSize(payload) {
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
        window.location.reload()
        this.getRams()
      })
    },
    saveRomSize(payload) {
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
        window.location.reload()
        this.getRoms()
      })
    },

    // start product categories
    saveProductCategory(payload) {
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
        window.location.reload()
        this.getProductCategories()
      })
    },
    updateProductCategory(payload) {
      const { mutate: updateProductCategory } = useMutation(gql`
        mutation updateProductCategory ($category: ProductCategoryInput!) {
          updateProductCategory (input: $category){
            id
          }
        }
        `, {
        variables: {
          category: payload,
        },
      })
      let id = ref(null);
      updateProductCategory().then(function (result) {
        console.log(result.data.updateProductCategory);;
        id.value = result.data.updateProductCategory.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
        this.getProductCategories()
      })
    },
    // end product categories

    saveDedicatedServer(payload) {
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
        window.location.reload()
        this.getDedicatedServers()
      })
    },
    saveVps(payload) {
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
        window.location.reload()
        this.getVpsList()
      })
    },
    savePaymentMatrix(payload) {
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
        window.location.reload()
        this.getPaymentMatrices()
      })
    },

    // start product categories
    saveEmailId(payload) {
      const { mutate: addEmailId } = useMutation(gql`
        mutation addEmailId ($emailIds: EmailIdsInput!) {
          addEmailId (input: $emailIds){
            id
          }
        }
        `, {
        variables: {
          emailIds: payload,
        },
      })
      let id = ref(null);
      addEmailId().then(function (result) {
        id.value = result.data.addEmailId.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
        this.getEmailIds()
      })
    },
    // end product categories

    // start product categories
    saveEmailSpace(payload) {
      const { mutate: addEmailSpace } = useMutation(gql`
        mutation addEmailSpace ($emailSpace: EmailSpaceInput!) {
          addEmailSpace (input: $emailSpace){
            id
          }
        }
        `, {
        variables: {
          emailSpace: payload,
        },
      })
      let id = ref(null);
      addEmailSpace().then(function (result) {
        id.value = result.data.addEmailSpace.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
        this.getEmailSpaces()
      })
    },
    // end product categories

    // start product categories
    saveEmailPlan(payload) {
      const { mutate: addEmailPlan } = useMutation(gql`
        mutation addEmailPlan ($emailPlan: EmailPlanInput!) {
          addEmailPlan (input: $emailPlan){
            id
          }
        }
        `, {
        variables: {
          emailPlan: payload,
        },
      })
      let id = ref(null);
      addEmailPlan().then(function (result) {
        id.value = result.data.addEmailPlan.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
      })
    },
    // end product categories

    // start product categories
    saveEmailHosting(payload) {
      const { mutate: addEmailHosting } = useMutation(gql`
        mutation addEmailHosting ($emailHosting: EmailHostingInput!) {
          addEmailHosting (input: $emailHosting){
            id
          }
        }
        `, {
        variables: {
          emailHosting: payload,
        },
      })
      let id = ref(null);
      addEmailHosting().then(function (result) {
        id.value = result.data.addEmailHosting.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
      })
    },
    // end product categories

    // start product categories
    saveSharedHosting(payload) {
      const { mutate: addSharedHosting } = useMutation(gql`
        mutation addSharedHosting ($sharedHosting: SharedHostingInput!) {
          addSharedHosting (input: $sharedHosting){
            id
          }
        }
        `, {
        variables: {
          sharedHosting: payload,
        },
      })
      let id = ref(null);
      addSharedHosting().then(function (result) {
        id.value = result.data.addSharedHosting.id
      });
      watch(id, value => {
        this.modal = null
        window.location.reload()
      })
    },
    // end product categories

    // Get Lists
    getEmailIds() {
      const { result } = useQuery(gql`
        query {
          getAllEmailIds {
            id
            ids
            description
          }
        }
      `)
      watch(result, value => {
        this.emailIds = value.getAllEmailIds;
      })
    },
    getEmailSpaces() {
      const { result } = useQuery(gql`
        query {
          getAllEmailSpaces {
            id
            totalSpace
            description
          }
        }
      `)
      watch(result, value => {
        this.emailSpaces = value.getAllEmailSpaces;
      })
    },
    getEmailPlans() {
      const { result } = useQuery(gql`
        query {
          getAllEmailPlans {
            id
            code
            name
            description
          }
        }
      `)
      watch(result, value => {
        this.emailPlans = value.getAllEmailPlans;
      })
    },
    getEmailHostingList() {
      const { result } = useQuery(gql`
        query {
          getAllEmailHosting {
            id
            emailPlan {
              id
              code
              name
            }
            emailIds {
              id
              ids
            }
            emailSpace {
              id
              totalSpace
            }
            webmail
            isPop3
            isImap
            isSmtp
            isMobileSupport
            isOutlookSupport
          }
        }
      `)
      watch(result, value => {
        this.emailHostingList = value.getAllEmailHosting;
      })
    },
    getSharedHostingList() {
      const { result } = useQuery(gql`
        query {
          getAllSharedHosting {
            id
            controlPanel
            hostedDomain
            diskSpace {
              id
              size
            }
            bandWidthSize {
              id
              size
            }
            emailAccounts {
              id
              ids
            }
            noOfFiles
            isMultiDomain
            description
          }
        }
      `)
      watch(result, value => {
        this.sharedHostingList = value.getAllSharedHosting;
      })
    },
    getBandwidths() {
      this.toReload = ''
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
        console.log(value)
        this.bandwidths = value.getAllBandwidthSizes;
      })
    },
    getCpuClockSpeeds() {
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
    getCpuTypes() {
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
    getOperatingSystems() {
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
    getProcessorTypes() {
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
    getRams() {
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
    getRoms() {
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
    getProductCategories() {
      console.log('called')
      let { result } = useQuery(gql`
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
        console.log('called again')
        this.productCategories = null;
        this.productCategories = value.getAllProductCategories;
      })
      result = null
    },
    getDedicatedServers() {
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
    getVpsList() {
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
    getPaymentMatrices() {
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

    // DELETE RECORDS
    deleteBandwidth(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateBandWidth } = useMutation(gql`
        mutation deactivateBandWidth ($id: Long!) {
          deactivateBandWidth (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateBandWidth().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteRam(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateRamSize } = useMutation(gql`
        mutation deactivateRamSize ($id: Long!) {
          deactivateRamSize (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateRamSize().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteRom(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateRomSize } = useMutation(gql`
        mutation deactivateRomSize ($id: Long!) {
          deactivateRomSize (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateRomSize().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteCpuType(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuType } = useMutation(gql`
        mutation deactivateCpuType ($id: Long!) {
          deactivateCpuType (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuType().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteOs(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateOperatingSystem } = useMutation(gql`
        mutation deactivateOperatingSystem ($id: Long!) {
          deactivateOperatingSystem (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateOperatingSystem().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteProcessorType(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateProcessorType } = useMutation(gql`
        mutation deactivateProcessorType ($id: Long!) {
          deactivateProcessorType (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateProcessorType().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteCpuClockSpeed(id) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    deleteRecord(record, id) {
      console.log('>>>>>>>>>>>>>> ' + record)
      if (record == 'bandwidth') {
        this.deleteBandwidth(id);
      } else if (record === 'ram') {
        this.deleteRam(id);
      } else if (record === 'rom') {
        this.deleteRom(id);
      } else if (record === 'processortype') {
        this.deleteProcessorType(id);
      } else if (record === 'os') {
        this.deleteOs(id);
      } else if (record === 'cputype') {
        this.deleteCpuType(id);
      } else if (record === 'cpuclockspeed') {
        this.deleteCpuClockSpeed(id);
      }
    },

    updateEmailHosting(payload) {
      const { mutate: updatedEmailHosting } = useMutation(gql`
        mutation updatedEmailHosting ($input: EmailHostingInput) {
          updatedEmailHosting (input: $input){
            id
          }
        }
        `, {
        variables: {
          input: input,
        },
      })
      
      updatedEmailHosting().then(function (result) {
        window.location.reload()
      }, function (error) {
        //
      });
    },

    updateEmailPlan(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateEmailSpace(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateEmailId(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateDedicatedServer(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateVps(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateSharedHosting(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updatePaymentMatrix(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateBandwidth(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateCpuClockSpeed(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateCpuType(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateProcessorType(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateOs(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateRam(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

    updateRom(payload) {
      console.log('>>>>>>>>>>>>>> ' + id)
      const { mutate: deactivateCpuClockSpeed } = useMutation(gql`
        mutation deactivateCpuClockSpeed ($id: Long!) {
          deactivateCpuClockSpeed (id: $id){
            id
          }
        }
        `, {
        variables: {
          id: id,
        },
      })
      
      deactivateCpuClockSpeed().then(function (result) {
        // window.location.reload()
      }, function (error) {
        //
      });
    },

  }
})
