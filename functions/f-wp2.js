const WPModel = require('../models/m-wp')

const wps = root => {
	if(!root.npwp && !root.nama_wp) throw Error('NPWP atau Nama WP Diperlukan...')
	root.nama_wp ? root.nama_wp = new RegExp(root.nama_wp, 'i') : null
	root.npwp ? root.npwp = new RegExp(root.npwp, 'i') : null
	return WPModel.find(root, '-berkas')
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

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

module.exports = { wps, totalWPs, lastUpdateWPs }