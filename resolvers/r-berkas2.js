const { berkases, addBerkas, deleteBerkas, editBerkas } = require('../functions/f-berkas2')

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
	addBerkas: (root, args) => {
		return addBerkas(root)
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
	},
	editBerkas: (root, args) => {
		return editBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}