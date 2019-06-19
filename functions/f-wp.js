const WPModel = require('../models/m-wp')

const wps = root => {
	!root.begin ? root.begin = 0 : null
	!root.end ? root.end = 10 : null
	if(root.by.match(/status/i)) {
		return wpsByStatus(root)
	}
	if(root.by.match(/npwp/i)) {
		return wpsByNPWP(root)
	}
	if(root.by.match(/nama_wp/i)) {
		return wpsByNamaWP(root)
	}
}

const wp = root => {
	if(!root.npwp) throw Error('NPWP 15 Digit Diperlukan...')
	return WPModel.findOne(root, '-berkas')
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

const wpsByStatus = root => {
		if(!root.search.status) throw 'Status WP Diperlukan...'
		else root.search.status = new RegExp(root.search.status, 'i')
		return WPModel.find(root.search, '-berkas')
			.skip(root.begin)
			.limit(root.end)
			.catch(err => {
				console.log(err)
				throw Error('Terjadi Masalah Pada Server...')
			})
}

const wpsByNPWP = root => {
	if(!root.search.npwp) throw 'NPWP Diperlukan...'
	else root.search.npwp = new RegExp(root.search.npwp, 'i')
	return WPModel.find(root.search, '-berkas')
		.skip(root.begin)
		.limit(root.end)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const wpsByNamaWP = root => {
	if(!root.search.nama_wp) throw 'Nama WP Diperlukan...'
	else root.search.nama_wp = new RegExp(root.search.nama_wp, 'i')
	return WPModel.find(root.search, '-berkas')
		.skip(root.begin)
		.limit(root.end)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

module.exports = { wps, wp, totalWPs, lastUpdateWPs }