const { ketBerkases, ketBerkas, totalKetBerkases } = require('../functions/f-ket-berkas2')
const { checkLogin } = require('../middleware/check-auth')

module.exports = {
	ketBerkases: (root, args) => {
		return ketBerkases(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	ketBerkas: (root, args) => {
		return ketBerkas(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	totalKetBerkases: (root, args) => {
		return totalKetBerkases(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	}
}