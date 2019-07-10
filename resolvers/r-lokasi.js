const { setComplete, deleteLokasi } = require('../functions/f-lokasi')

module.exports = {
	setComplete: (root, args) => {
		return setComplete(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
	deleteLokasi: (root, args) => {
		return deleteLokasi(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}