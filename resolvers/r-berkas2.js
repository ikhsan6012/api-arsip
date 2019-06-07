const { berkases, addBerkas, addBerkasDocument, deleteBerkas, deleteBerkasDocument, editBerkas, editBerkasDocument } = require('../functions/f-berkas2')

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
	addBerkasDocument: (root, args) => {
		return addBerkasDocument(root)
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
	deleteBerkasDocument: (root, args) => {
		return deleteBerkasDocument(root)
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
	},
	editBerkasDocument: (root, args) => {
		return editBerkasDocument(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
}