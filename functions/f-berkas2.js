const BerkasModel = require('../models/m-berkas')
const LokasiModel = require('../models/m-lokasi')
const WPModel = require('../models/m-wp')
const PenerimaModel = require('../models/m-penerima')
const KetBerkasModel = require('../models/m-ket-berkas')

const berkases = root => {
	if(root.by.match(/lokasi/i)) {
		delete root.by
		return berkasesByLokasi(root)
	}
}

const berkasesByLokasi = root => {
	if(!root.gudang || !root.kd_lokasi) throw Error('Gudang dan Kd Lokasi Diperlukan...')
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
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
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
			console.log(err)
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