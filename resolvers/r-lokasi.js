const { monitorRekam, setComplete, deleteLokasi } = require('../functions/f-lokasi')

module.exports = {
	monitorRekam: (root, args) => {
		return monitorRekam(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
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