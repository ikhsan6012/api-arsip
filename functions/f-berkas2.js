const fs = require('fs')
const path = require('path')

const BerkasModel = require('../models/m-berkas')
const LokasiModel = require('../models/m-lokasi')
const WPModel = require('../models/m-wp')
const PenerimaModel = require('../models/m-penerima')
const KetBerkasModel = require('../models/m-ket-berkas')

const berkases = root => {
	let getBerkas
	if(root.by.match(/lokasi/i)) {
		getBerkas = berkasesByLokasi
	}
	if(root.by.match(/pemilik/i)) {
		getBerkas = berkasesByPemilik
	}
	if(root.by.match(/penerima/i)) {
		getBerkas = berkasesByPenerima
	}
	delete root.by
	return getBerkas(root)
		.catch(err => {
			let error
			err.error ? error = err.error : null
			throw Error(error || 'Terjadi Masalah Pada Server...')
		})
}

const addBerkas = async root => {
	const input = root.input
	try {
		if(!input.kd_berkas) throw Error('Kd Berkas Diperlukan...')
		if(!input.lokasi.gudang || !input.lokasi.kd_lokasi) throw Error('Gudang dan Kd Lokasi Diperlukan...')
		const ket_berkas = await KetBerkasModel.findOne({ kd_berkas: new RegExp(input.kd_berkas, 'i') }, 'berkas')
		const lokasi = await LokasiModel.findOneAndUpdate(input.lokasi, input.lokasi, {
			upsert: true, new: true
		})
		const pemilik = input.pemilik ? await WPModel.findOneAndUpdate({ npwp: input.pemilik.npwp }, input.pemilik, {
			upsert: true, new: true
		}).select('berkas') : { id: null }
		const penerima = input.penerima ? await PenerimaModel.findOneAndUpdate(input.penerima, input.penerima, {
			upsert: true, new: true
		}).select('berkas') : { id: null }
		delete input.kd_berkas
		const Berkas = new BerkasModel({
			...input,
			ket_berkas: ket_berkas.id,
			lokasi: lokasi.id,
			pemilik: pemilik.id,
			penerima: penerima.id
		})
		const berkas = await Berkas.save()
		return await berkas.populate([
			{
				path: 'ket_berkas',
				select: 'kd_berkas nama_berkas'
			},
			{
				path: 'pemilik',
				select: 'npwp nama_wp'
			},
			{
				path: 'penerima',
				select: 'nama_penerima tgl_terima'
			}
		])
		.execPopulate()
	} catch (err) {
		console.log(err)
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

const addBerkasDocument = root => {
	return BerkasModel.findByIdAndUpdate(root.id, { file: root.file }, { new: true })
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const deleteBerkas = root => {
	return BerkasModel.findByIdAndDelete(root.id)
		.populate([
			{
				path: 'pemilik',
				select: '_id'
			},
			{
				path: 'penerima',
				select: '_id'
			}
		])
		.then(res => res)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const deleteBerkasDocument = root => {
	return BerkasModel.findOneAndUpdate(root.file, { file: null }, { new: true })
		.then(res => {
			deleteDocument(root.file)
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const editBerkas = async root => {
	const input = root.input
	const promise = []
	try {
		if(!input.kd_berkas) throw Error('Kd Berkas Diperlukan...')
		if(!input.lokasi.gudang || !input.lokasi.kd_lokasi) throw Error('Gudang dan Kd Lokasi Diperlukan...')
		promise.push(KetBerkasModel.findOne({ kd_berkas: new RegExp(input.kd_berkas, 'i') }, 'berkas'))
		promise.push(LokasiModel.findOneAndUpdate(input.lokasi, input.lokasi, {
			upsert: true, new: true
		}).select('_id'))
		if(input.pemilik) promise.push(WPModel.findOneAndUpdate({ npwp: input.pemilik.npwp }, input.pemilik, {
			upsert: true, new: true
		}).select('_id'))
		if(input.penerima) promise.push(PenerimaModel.findOneAndUpdate(input.penerima, input.penerima, {
			upsert: true, new: true
		}).select('_id'))
		const All = await Promise.all(promise)
		const [ket_berkas, lokasi, pemilik, penerima] = All
		delete input.kd_berkas
		return BerkasModel.findByIdAndUpdate(root.id, {
			...input,
			ket_berkas: ket_berkas.id,
			lokasi: lokasi.id, 
			pemilik: pemilik ? pemilik.id : null, 
			penerima: penerima ? penerima.id : null
		}, { new: true }).select('_id')
	} catch (err) {
		console.log(err)
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

const editBerkasDocument = root => {
	return BerkasModel.findByIdAndUpdate(root.id, { file: root.file })
		.then(res => {
			deleteDocument(res.file)
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const berkasesByLokasi = root => {
	if(!root.gudang || !root.kd_lokasi) throw { error: 'Gudang dan Kd Lokasi Diperlukan...' }
	root.kd_lokasi = new RegExp(root.kd_lokasi, 'i')
	return LokasiModel.findOne(root, 'berkas')
		.populate({
			path: 'berkas',
			populate: [
				{
					path: 'ket_berkas',
					model: 'KetBerkas',
					select: 'kd_berkas nama_berkas'
				},
				{
					path: 'lokasi',
					model: 'Lokasi',
					select: 'gudang kd_lokasi'
				},
				{
					path: 'pemilik',
					model: 'WP',
					select: 'npwp nama_wp'
				},
				{
					path: 'penerima',
					model: 'Penerima',
					select: 'nama_penerima tgl_terima'
				}
			]
		})
		.then(res => {
			if(!res) return []
			return res.berkas
		})
}

const berkasesByPemilik = root => {
	if(!root.id) throw { error: 'ID Wajib Pajak Diperlukan...' }
	return WPModel.findById(root.id, 'berkas')
		.populate({
			path: 'berkas',
			populate: [
				{
					path: 'ket_berkas',
					model: 'KetBerkas',
					select: 'kd_berkas nama_berkas'
				},
				{
					path: 'lokasi',
					model: 'Lokasi',
					select: 'gudang kd_lokasi'
				},
				{
					path: 'pemilik',
					model: 'WP',
					select: 'npwp nama_wp'
				}
			]
		})
		.then(res => {
			if(!res) return []
			return res.berkas
		})
}

const berkasesByPenerima = root => {
	if(!root.id) throw { error: 'ID Penerima Diperlukan...' }
	root.nama_penerima ? root.nama_penerima = new RegExp(root.nama_penerima, 'i') : null
	return PenerimaModel.findById(root.id, 'berkas')
		.populate({
			path: 'berkas',
			populate: [
				{
					path: 'ket_berkas',
					model: 'KetBerkas',
					select: 'kd_berkas nama_berkas'
				},
				{
					path: 'lokasi',
					model: 'Lokasi',
					select: 'gudang kd_lokasi'
				},
				{
					path: 'penerima',
					model: 'Penerima',
					select: 'nama_penerima tgl_terima'
				}
			]
		})
		.then(res => {
			if(!res) return []
			return res.berkas
		})
}

const deleteDocument = async file => {
	try {
		fs.unlinkSync(path.resolve(__dirname, '../uploads', file))
		return
	} catch (err) {
		return
	}
}

module.exports = { berkases, addBerkas, addBerkasDocument, deleteBerkas, deleteBerkasDocument, editBerkas, editBerkasDocument }