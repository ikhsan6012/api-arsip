const WPModel = require('../models/m-wp')

const totalWPs = root => {
	root.nama_wp ? root.nama_wp = new RegExp(root.nama_wp, 'i') : null
	root.status ? root.status = new RegExp(root.status, 'i') : null
	return WPModel.countDocuments(root)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const lastUpdateWPs = () => {
	return WPModel.findOne().sort({ updated_at: -1 })
		.then(res => {
			return res.updated_at
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

module.exports = { totalWPs, lastUpdateWPs }