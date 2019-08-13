const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KetBerkasModel = require('./m-ket-berkas')
const LokasiModel = require('./m-lokasi')
const PenerimaModel = require('./m-penerima')
const WPModel = require('./m-wp')

const berkasSchema = new Schema({
	ket_berkas: {
		type: Schema.Types.ObjectId,
		ref: 'KetBerkas',
		required: true,
	},
	pemilik: {
		type: Schema.Types.ObjectId,
		ref: 'WP'
	},
	penerima: {
		type: Schema.Types.ObjectId,
		ref: 'Penerima'
	},
	masa_pajak: {
		type: Number,
		max: 12,
		min: 0
	},
	tahun_pajak: {
		type: Number,
		max: new Date().getFullYear(),
		min: new Date().getFullYear() - 40
	},
	status_pbk: String,
	nomor_pbk: Number,
	tahun_pbk: Number,
	pembetulan: Number,
	lokasi: {
		type: Schema.Types.ObjectId,
		ref: 'Lokasi',
		required: true
	},
	urutan: {
		type: Number,
		required: true,
		min: 1
	},
	ket_lain: {
		type: String,
		uppercase: true
	},
	file: String,
	transaksi: {
		type: Schema.Types.ObjectId,
		ref: 'Transaksi'
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

berkasSchema.pre('findOneAndUpdate', async function(next){
	const filter = { berkas: this._conditions._id }
	const update = { $pull: filter }, options = { new: true }
	await Promise.all([
		KetBerkasModel.findOneAndUpdate(filter, update, options),
		LokasiModel.findOneAndUpdate(filter, update, options),
		WPModel.findOneAndUpdate(filter, update, options),
		PenerimaModel.findOneAndUpdate(filter, update, options)
	])
	next()
})

berkasSchema.post(/save|findOneAndUpdate/, async (doc, next) => {
	const update = { $push: { berkas:  doc.id } }, options = { new: true }
	await Promise.all([
		KetBerkasModel.findByIdAndUpdate(doc.ket_berkas, update, options),
		LokasiModel.findByIdAndUpdate(doc.lokasi, update, options),
		WPModel.findByIdAndUpdate(doc.pemilik, update, options),
		PenerimaModel.findByIdAndUpdate(doc.penerima, update, options)
	])
	next()
})

berkasSchema.post('findOneAndDelete', async (doc, next) => {
	const pull = []
	pull.push(KetBerkasModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	pull.push(LokasiModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	pull.push(WPModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	pull.push(PenerimaModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))	 
	await Promise.all(pull)
	next()
})

module.exports = mongoose.model('Berkas', berkasSchema)