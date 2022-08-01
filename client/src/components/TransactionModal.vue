<template>
	<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Send transaction</h5>
					<button type="button" @click="showModal" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-12 form-group">
							<label>Address</label>
							<input type="text" v-model="address" class="form-control">
						</div>
						<div class="col-sm-12 form-group">
							<label>Amount</label>
							<input type="number" v-model="amount" class="form-control">
						</div>

					</div>
					<div v-if="error" class="alert alert-danger">
						<strong>Oops!</strong> {{ error }}
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" @click="sendData" class="btn btn-primary">Transfer</button>
					<button @click="showModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'TransactionModal',
	data() {
		return {
			amount: 0,
			address: '',
			error: null
		}
	},
	methods: {
		showModal() {
			this.$emit("showModal", false)
		},
		sendData() {
			if (this.amount === 0 || !this.address.length) {
				this.error = 'Fields must not be empty'
				return
			}
			this.$emit("sendTransaction", {
				amount: this.amount,
				address: this.address
			})
		}
	}
}
</script>
<style>
.modal {
	display: block;
	background-color: #d9edf7b5;
}
</style>