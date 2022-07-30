<template>
  <div class="container">
    <slot name="title"></slot>
    <div class="col-lg-12 well">
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-12 form-group">
              <label>Username</label>
              <input type="text" v-model="name" class="form-control">
            </div>
            <div class="col-sm-12 form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control">
            </div>
            <slot name="repeatPassword"></slot>
          </div>
          <button type="button" @click="sendUserData" class="btn btn-lg btn-info">Submit</button>
        </div>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger">
      <strong>Oops!</strong> {{ error }}
    </div>

  </div>
</template>

<script>

export default {
  name: 'CustomForm',
  props: {
    error: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    sendUserData() {
      this.$emit("sendUser", {
        name: this.name,
        password: this.password
      })
    }
  }
}
</script>
