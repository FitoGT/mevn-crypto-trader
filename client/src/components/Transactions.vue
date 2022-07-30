<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Operation date</th>
          <th>User</th>
          <th>Address</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, key) of transactions">
          <td>{{ parseDate(transaction.date) }}</td>
          <td>{{ transaction.userName }}</td>
          <td>{{ transaction.address }}</td>
          <td>{{ transaction.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Transactions',
  props: {
    transactions: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    parseDate(date) {
      return Date(date)
    }
  }
}
</script>
