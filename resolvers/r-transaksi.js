const { transaksis, addTransaksi, editTransaksi, deleteTransaksi } = require('../functions/f-transaksi')

module.exports = {
	// Query
	transaksis: (root, args) => {
		return transaksis(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	// Mutation
	addTransaksi: (root, args) => {
		return addTransaksi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	editTransaksi: (root, args) => {
		return editTransaksi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	deleteTransaksi: (root, args) => {
		return deleteTransaksi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
}