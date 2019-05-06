const WPModel = require('../models/m-wp')

const getJumlahWP = () => {
	return new Promise((resolve, reject) => {
		return WPModel.countDocuments()
			.then(res => {
				resolve(res)
			})
			.catch(err => reject(err))
	})
}

const getWPByNPWP = npwp => {
	return new Promise((resolve, reject) => {
		return WPModel.findOne({ npwp })
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getWPById = id => {
	return new Promise((resolve, reject) => {
		return WPModel.findById(id)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getWPsByNPWP = npwp => {
	return new Promise((resolve, reject) => {
		return WPModel.find({ npwp: new RegExp(`^${npwp}`) })
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getWPsByNamaWP = nama_wp => {
	return new Promise((resolve, reject) => {
		return WPModel.find({ nama_wp: new RegExp(nama_wp) })
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getWPsByStatus = ({status, begin, end }) => {
	return new Promise((resolve, reject) => {
		return WPModel.find( status !== 'total' ? { status: new RegExp(status, 'i') } : {})
			.skip(begin)
			.limit(end)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getDetailWP = () => {
	return new Promise((resolve, reject) => {
		return WPModel.findOne().sort({ updated_at: -1 })
			.then(async res => {
				const aktif = await WPModel.countDocuments({ status: "AKTIF" })
				const de = await WPModel.countDocuments({ status: "DE" })
				const ne = await WPModel.countDocuments({ status: "NE" })
				const pindah = await WPModel.countDocuments({ status: "PINDAH" })
				const total = aktif + de + ne + pindah
				resolve({ aktif, de, ne, pindah, total, lastUpdate: res.updated_at })
			})
	})
}

const addWP = input => {
	return new Promise((resolve, reject) => {
		const WP = new WPModel(input)
		return WP.save()
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

module.exports = { getJumlahWP, getWPByNPWP, getWPById, getWPsByNPWP, getWPsByNamaWP, getWPsByStatus, getDetailWP, addWP }
