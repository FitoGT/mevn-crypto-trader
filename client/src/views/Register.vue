<template>
  <custom-form @sendUser="registerUser($event)" :error="error">
    <template v-slot:title>
      <h1 class="well">Register</h1>

    </template>
    <template v-slot:repeatPassword>
      <div class="col-sm-12 form-group">
        <label>Repeat Password</label>
        <input type="password" v-model="repeatPassword" class="form-control">
      </div>
    </template>
  </custom-form>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue'
import router from '@/router';
export default {
  name: 'Register',
  components: {
    CustomForm
  },
  data() {
    return {
      repeatPassword: '',
      error: null
    }
  },
  methods: {
    async registerUser(user) {
      if (!this.checkPasswords(user.password)) {
        this.error = 'Passwords must coincide'
        return
      }
      const rawResponse = await fetch('http://localhost:5000/api/user/register', {
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
    },
    checkPasswords(userPassword) {
      return userPassword === this.repeatPassword
    }
  }

}
</script>
