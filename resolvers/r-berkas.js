const { berkases, addBerkas, addBerkasDocument, deleteBerkas, deleteBerkasDocument, editBerkas, editBerkasDocument } = require('../functions/f-berkas')

module.exports = {
	berkases: (root, args) => {
		return berkases(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	addBerkas: (root, args) => {
		return addBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	addBerkasDocument: (root, args) => {
		return addBerkasDocument(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	deleteBerkas: (root, args) => {
		return deleteBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	deleteBerkasDocument: (root, args) => {
		return deleteBerkasDocument(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	editBerkas: (root, args) => {
		return editBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
}