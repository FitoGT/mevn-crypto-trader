const express = require('express');
const transactionSchema = require('../models/transactions')
const router = express.Router()

router.post("/transactions", async (req, res) => {
	const token = req.headers.authorization
	if (!token) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}
	try {
		const { userName, amount } = req.body
		const date = Date.now()
		const transaction = {
			userName,
			amount,
			date
		}
		const saveTransaction = transactionSchema(transaction)
		saveTransaction.save()
			.then(data => {
				res.status(200).json({ data })
			})
			.catch(error => {
				res.status(400).json({ error })
			})
	} catch (error) {
		res.status(400).json({ error: 'Bad Request, invalid or missing input' });
	}
})

router.get("/transactions/:userName", async (req, res) => {
	const token = req.headers.authorization
	if (!token) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}
	try {
		const userName = req.params.userName
		transactionSchema.find({ userName })
			.then(data => {
				res.status(200).json({ data })
			})
			.catch(error => {
				res.status(400).json({ error })
			})

	} catch (error) {
		res.status(400).json({ error });
	}
});
module.exports = router