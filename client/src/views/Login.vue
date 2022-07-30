<template>
  <custom-form @sendUser="login($event)" :error="error">
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
  data() {
    return {
      error: null
    }
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
      if (!content.error) {
        localStorage.setItem('token', JSON.stringify(content.accessToken));
        router.push('/')
      } else {
        this.error = content.error
      }
    }
  }

}
</script>
