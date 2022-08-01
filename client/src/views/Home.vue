<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h2 class="text-center">
              Dodge Coin <img alt="Vue logo" width="100" src="../assets/logo.png">
            </h2>
          </div>
          <div class="panel-body">
            <h3>
              {{ username }}
              <button type="button" @click="showModal(true)" class="btn btn-md btn-primary">Transfer</button>

            </h3>
            <loader v-if="loading" />
            <transactions v-if="showTransactions" :transactions="transactions" />
            <div class="text-center" v-else>
              <h3>No data</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transaction-modal v-if="modalOpen" @showModal="showModal($event)" @sendTransaction="sendTransaction($event)" />
  </div>
</template>

<script>
import Transactions from '@/components/Transactions.vue'
import Loader from '@/components/Loader.vue'
import TransactionModal from '@/components/TransactionModal.vue'
import router from '@/router'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    Transactions,
    Loader,
    TransactionModal
  },
  data() {
    return {
      username: '',
      transactions: [],
      token: null,
      loading: false,
      modalOpen: false
    }
  },
  beforeCreate() {
    if (!localStorage.getItem('token')) {
      router.push('login')
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token)
      this.username = decoded.name
      this.token = token
      //fetch transactions
      this.listTransactions()
    }
  },
  methods: {
    showModal(option) {
      this.modalOpen = option
    },
    async listTransactions() {
      this.loading = true
      const rawResponse = await fetch(`http://localhost:5000/api/transactions/${this.username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
      const transactions = await rawResponse.json()
      this.loading = false
      this.transactions = transactions.data ? transactions.data : []
    },
    async sendTransaction(data) {
      this.loading = true
      this.modalOpen = false
      const transactionData = {
        amount: data.amount,
        address: data.address,
        userName: this.username,
      }
      const rawResponse = await fetch(`http://localhost:5000/api/transactions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(transactionData)
      });
      const transactions = await rawResponse.json()
      if (!transactions.error) {
        this.listTransactions()
      }

    }
  },
  computed: {
    showTransactions() {
      return !this.loading && this.transactions.length
    }
  }
}
</script>
