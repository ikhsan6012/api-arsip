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
	return BerkasModel.findByIdAndDelete(root.id, { select: '_id' })
}

const deleteBerkasDocument = root => {
	return BerkasModel.findByIdAndUpdate(root.id, { file: null }, { new: true }).select('_id')
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const editBerkas = async ({ id, input }) => {
	if(!input.lokasi.gudang || !input.lokasi.kd_lokasi) throw Error('Gudang dan Kd Lokasi Diperlukan...')
	if(!input.urutan) throw Error('Urutan Diperlukan...')
	try {
		const promise1 = [], promise2 = []
		promise1.push(BerkasModel.findById(id))
		promise1.push(KetBerkasModel.findOne({ kd_berkas: input.kd_berkas }, '_id'))
		promise1.push(LokasiModel.findOneAndUpdate(input.lokasi, input.lokasi, { upsert: true, new: true }).select('_id'))
		promise1.push(!input.pemilik ? null : WPModel.findOneAndUpdate({ npwp: input.pemilik.npwp }, input.pemilik, { upsert: true, new: true }).select('_id'))
		promise1.push(!input.penerima ? null : PenerimaModel.findOneAndUpdate(input.penerima, input.penerima, { upsert: true, new: true }).select('_id'))
		const Promise1 = await Promise.all(promise1)
		const [berkas, ket_berkas, lokasi, pemilik, penerima] = Promise1
		promise2.push(KetBerkasModel.findByIdAndUpdate(berkas.ket_berkas, { $pull: { berkas: id } }))
		promise2.push(LokasiModel.findByIdAndUpdate(berkas.lokasi, { $pull: { berkas: id } }))
		promise2.push(WPModel.findByIdAndUpdate(berkas.pemilik, { $pull: { berkas: id } }))
		promise2.push(PenerimaModel.findByIdAndUpdate(berkas.penerima, { $pull: { berkas: id } }))
		await Promise.all(promise2)
		berkas.ket_berkas = ket_berkas.id
		berkas.lokasi = lokasi.id
		berkas.pemilik = pemilik ? pemilik.id : null
		berkas.penerima = penerima ? penerima.id : null
		berkas.masa_pajak = input.masa_pajak ? input.masa_pajak : null
		berkas.tahun_pajak = input.tahun_pajak ? input.tahun_pajak : null
		berkas.status_pbk = input.status_pbk ? input.status_pbk : null
		berkas.nomor_pbk = input.nomor_pbk ? input.nomor_pbk : null
		berkas.tahun_pbk = input.tahun_pbk ? input.tahun_pbk : null
		berkas.urutan = input.urutan ? input.urutan : null
		berkas.ket_lain = input.ket_lain ? input.ket_lain : null
		return berkas.save()
	} catch (err) {
		console.log(err)
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
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

module.exports = { berkases, addBerkas, addBerkasDocument, deleteBerkas, deleteBerkasDocument, editBerkas }