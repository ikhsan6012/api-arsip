const LokasiModel = require('../models/m-lokasi'	)

const checkLokasi = input => {
	return new Promise((resolve, reject) => {
		return LokasiModel.findOne(input)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const checkLokasiById = id => {
	return new Promise((resolve, reject) => {
		return LokasiModel.findById(id)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const addLokasi = input => {
	return new Promise((resolve, reject) => {
		const Lokasi = new LokasiModel({
			gudang: input.gudang,
			kd_lokasi: input.kd_lokasi
		})
		return Lokasi.save()
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

module.exports = { checkLokasi, checkLokasiById, addLokasi }