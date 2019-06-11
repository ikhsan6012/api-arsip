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
	file: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

berkasSchema.post('save', async (doc, next) => {
	const promise = []
	promise.push(KetBerkasModel.findByIdAndUpdate(doc.ket_berkas, { $push: { berkas: doc.id } }, { select: 'berkas', new: true }))
	promise.push(LokasiModel.findByIdAndUpdate(doc.lokasi, { $push: { berkas: doc.id } }, { select: 'berkas', new: true }))
	if(doc.pemilik) promise.push(WPModel.findByIdAndUpdate(doc.pemilik, { $push: { berkas: doc.id } }, { select: 'berkas', new: true })) 
	if(doc.penerima) promise.push(PenerimaModel.findByIdAndUpdate(doc.penerima, { $push: { berkas: doc.id } }, { select: 'berkas', new: true })) 
	await Promise.all(promise)
	next()
})

berkasSchema.post('findOneAndUpdate', async (doc, next) => {
	const push = [], pull = []
	pull.push(KetBerkasModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	push.push(KetBerkasModel.findByIdAndUpdate(doc.ket_berkas, { $push: { berkas: doc.id } }, { select: 'berkas', new: true }))
	pull.push(LokasiModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	push.push(LokasiModel.findByIdAndUpdate(doc.lokasi, { $push: { berkas: doc.id } }, { select: 'berkas', new: true }))
	if(doc.pemilik) {
		pull.push(WPModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
		push.push(WPModel.findByIdAndUpdate(doc.pemilik, { $push: { berkas: doc.id } }, { select: 'berkas', new: true })) 
	}
	if(doc.penerima) {
		pull.push(PenerimaModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
		push.push(PenerimaModel.findByIdAndUpdate(doc.penerima, { $push: { berkas: doc.id } }, { select: 'berkas', new: true })) 
	}
	await Promise.all(pull)
	await Promise.all(push)
	next()
})

berkasSchema.post('findOneAndDelete', (doc, next) => {
	const pull = []
	pull.push(KetBerkasModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	pull.push(LokasiModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	if(doc.pemilik) pull.push(WPModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))
	if(doc.penerima) pull.push(PenerimaModel.findOneAndUpdate({ berkas: doc.id }, { $pull: { berkas: doc.id } }, { select: 'berkas', new: true }))	 
	next()
})

module.exports = mongoose.model('Berkas', berkasSchema)