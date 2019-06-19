const { penerimas } = require('../functions/f-penerima')

module.exports = {
	penerimas: (root, args) => {
		return penerimas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}