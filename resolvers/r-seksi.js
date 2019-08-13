const { seksi, seksis, addSeksi } = require('../functions/f-seksi')

module.exports = {
	// Query
	seksis: (root, args) => {
		return seksis(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},

	seksi: (root, args) => {
		return seksi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},

	// Mutation
	addSeksi: (root, args) => {
		return addSeksi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
}