const { berkases, deleteBerkas } = require('../functions/f-berkas2')

module.exports = {
	berkases: (root, args) => {
		return berkases(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
	deleteBerkas: (root, args) => {
		return deleteBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}