const mongoose = require('mongoose')

const BerkasModel = require('../models/m-berkas')
const KetBerkasModel = require('../models/m-ket-berkas')
const LokasiModel = require('../models/m-lokasi')
const PenerimaModel = require('../models/m-penerima')
const WPModel = require('../models/m-wp')

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
})
	.then(async () => {
		try {
			console.log('Menghapus Berkas Collection...')
			await BerkasModel.collection.drop()
			console.log('Berhasil Menghapus Berkas Collection...')
			console.log('Menghapus Berkas Dari Ket Berkas...')
			await KetBerkasModel.updateMany({}, { berkas: [], __v: 1 })
			console.log('Berhasil Menghapus Berkas Dari Ket Berkas...')
			console.log('Menghapus Berkas Dari Lokasi...')
			await LokasiModel.updateMany({}, { berkas: [], __v: 1 })
			console.log('Berhasil Menghapus Berkas Dari Lokasi...')
			console.log('Menghapus Berkas Dari Penerima...')
			await PenerimaModel.updateMany({}, { berkas: [], __v: 1 })
			console.log('Berhasil Menghapus Berkas Dari Penerima...')
			console.log('Menghapus Berkas Dari WP...')
			await WPModel.updateMany({}, { berkas: [], __v: 1 })
			console.log('Berhasil Menghapus Berkas Dari WP...')
			console.log('Reset Database Berhasil...')
		} catch (error) {
			console.log(error)
		}
		process.exit()
	})