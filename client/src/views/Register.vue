<template>
  <custom-form @registerUser="registerUser($event)">
    <template v-slot:title>
      <h1 class="well">Registration Form</h1>

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
export default {
  name: 'Register',
  components: {
    CustomForm
  },
  data() {
    return {
      repeatPassword: ''
    }
  },
  methods: {
    async registerUser(user) {
      const rawResponse = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const content = await rawResponse.json();

      console.log(content);
    }
  }

}
</script>
