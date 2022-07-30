<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-primary">
          <!-- Default panel contents -->
          <div class="panel-heading">
            <h2 class="text-center">
              Dodge Coin <img alt="Vue logo" width="100" src="../assets/logo.png">
            </h2>
          </div>
          <div class="panel-body">
            <h3>
              {{ username }}
            </h3>
            <loader v-if="loading" />
            <transactions v-if="showTransactions" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transactions from '@/components/Transactions.vue'
import Loader from '@/components/Loader.vue'
import router from '@/router'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    Transactions,
    Loader,
  },
  data() {
    return {
      username: '',
      transactions: [],
      token: null,
      loading: false
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
      //fetch transactions
      this.listTransactions(token)
    }
  },
  methods: {
    async listTransactions(token) {
      this.loading = true
      const rawResponse = await fetch(`http://localhost:5000/api/transactions/${this.username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const transactions = await rawResponse.json()
      this.loading = false
      this.transactions = transactions.data ? transactions.data : []
    }
  },
  computed: {
    showTransactions() {
      return !this.loading && this.transactions.length
    }
  }
}
</script>
