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
              JONES Alexander
            </h3>
            <transactions />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Transactions from '@/components/Transactions.vue'

export default {
  name: 'HomeView',
  components: {
    Transactions
  }
}
</script>
