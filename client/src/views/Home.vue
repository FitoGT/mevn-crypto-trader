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
            <transactions />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transactions from '@/components/Transactions.vue'
import router from '@/router'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    Transactions
  },
  data() {
    return {
      username: ''
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
    }
  }
}
</script>
