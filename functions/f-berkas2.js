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
				}
			]
		})
		.then(res => {
			if(!res) return []
			return res.berkas
		})
}

const deleteBerkas = root => {
	return BerkasModel.findByIdAndDelete(root.id)
		.populate('pemilik', '_id')
		.populate('penerima', '_id')
		.then(async res => {
			const berkasToPull = { berkas: res.id }
			try {
				const KetBerkas = await KetBerkasModel.findOne(berkasToPull)
				const Lokasi = await LokasiModel.findOne(berkasToPull)
				const Pemilik = await WPModel.findOne(berkasToPull)
				const Penerima = await PenerimaModel.findOne(berkasToPull)
				pullBerkas([KetBerkas, Lokasi, Pemilik, Penerima], res.id)
				return res
			} catch (err) {
				throw err
			}
		})
		.catch(err => {
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const pullBerkas = (array, id) => {
	array.forEach(each => {
		if(each){
			each.berkas.pull(id)
			each.save()
		}
	})
}

module.exports = { berkases, deleteBerkas }