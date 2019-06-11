const KetBerkasModel = require('../models/m-ket-berkas')

const checkKetBerkas = kd_berkas => {
	return new Promise((resolve, reject) => {
		return KetBerkasModel.findOne({ kd_berkas })
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const checkKetBerkasById = id => {
	return new Promise((resolve, reject) => {
		return KetBerkasModel.findById(id)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getSemuaKetBerkas = () => {
	return new Promise((resolve, reject) => {
		return KetBerkasModel.find()
			.then(res => {
				return res.map(kb => {
					return { ...kb._doc, jumlah: kb.berkas.length }
				})
			})
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getDetailInduk = async kd_berkas => {
	const { getBerkasByKetBerkas } = require('./f-berkas')
	let ket_berkas = await KetBerkasModel.findOne({ kd_berkas })
	return new Promise((resolve, reject) => {
		return getBerkasByKetBerkas(ket_berkas.id, kd_berkas)
			.then(async ({res, lastUpdate}) => {
				let berkas_baru = await res.filter(data => {
					return data.lokasi.gudang === 1 || (data.lokasi.gudang === 2 && data.lokasi.kd_lokasi.match(/^[ABC]\d/))
				}).length
				resolve({ berkas_baru, berkas_lama: res.length - berkas_baru, lastUpdate, total: res.length })
			})
			.catch(err => reject(err))
	})
}

const getDetailPindah = async kd_berkas => {
	console.log(kd_berkas)
	const { getBerkasByKetBerkas } = require('./f-berkas')
	let ket_berkas = await KetBerkasModel.findOne({ kd_berkas })
	return new Promise((resolve, reject) => {
		return getBerkasByKetBerkas(ket_berkas.id, kd_berkas)
			.then(async res => resolve(res))
			.catch(err => reject(err))
	})
}

const getDetailSPT = async kd_berkas => {
	const { getBerkasByKetBerkas } = require('./f-berkas')
	let ket_berkas = await KetBerkasModel.findOne({ kd_berkas })		
	return new Promise((resolve, reject) => {
		return getBerkasByKetBerkas(ket_berkas.id, kd_berkas)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const addKetBerkas = input => {
	return new Promise((resolve, reject) => {
		const KetBerkas = new KetBerkasModel({
			kd_berkas: input.kd_berkas,
			nama_berkas: input.nama_berkas
		})
		return KetBerkas.save()
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

module.exports = { checkKetBerkas, checkKetBerkasById, getSemuaKetBerkas, getDetailInduk, getDetailPindah, getDetailSPT, addKetBerkas }