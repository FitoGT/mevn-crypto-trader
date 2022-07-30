<template>
  <custom-form @sendUser="login($event)">
    <template v-slot:title>
      <h1 class="well">Login</h1>
    </template>
  </custom-form>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue'
import router from '@/router';

export default {
  name: 'Login',
  components: {
    CustomForm
  },
  methods: {
    async login(user) {
      const rawResponse = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const content = await rawResponse.json();
      if (content) {
        localStorage.setItem('token', JSON.stringify(content.accessToken));
        router.push('/')
      }
    }
  }

}
</script>
