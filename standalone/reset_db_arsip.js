const mongoose = require('mongoose')
const fs = require('fs')

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
	.then(async (e) => {
		try {
			const collections = await mongoose.connection.db.listCollections().toArray()
			// console.log(collections)
			for({ name } of collections){
				if(name.match(/^berkas$/)){
					console.log('Menghapus Berkas Collection...')
					await BerkasModel.collection.drop()
					console.log('Berhasil Menghapus Berkas Collection...')
				}
				if(name.match(/^lokasis$/)){
					console.log('Menghapus Lokasi Collection...')
					await LokasiModel.collection.drop()
					console.log('Berhasil Menghapus Lokasi Collection...')
				}
				if(name.match(/^penerimas$/)){
					console.log('Menghapus Penerima Collection...')
					await PenerimaModel.collection.drop()
					console.log('Berhasil Menghapus Penerima Collection...')
				}
				if(name.match(/^wps$/)){
					console.log('Menghapus WP Collection...')
					await WPModel.collection.drop()
					console.log('Berhasil Menghapus WP Collection...')
				}
				if(name.match(/^ket_berkas$/)){
					console.log('Menghapus Berkas Dari Ket Berkas...')
					await KetBerkasModel.updateMany({}, { berkas: [], __v: 1 })
					console.log('Berhasil Menghapus Berkas Dari Ket Berkas...')
				}
			}
			console.log('Reset Database Berhasil...')
			console.log('Menghapus Dokumen Upload...')
			const uploads = await fs.readdirSync('../uploads')
			for(upload of uploads){
				await fs.unlinkSync('../uploads/' + upload)
			}
		} catch (error) {
			console.log(error)
		}
		process.exit()
	})