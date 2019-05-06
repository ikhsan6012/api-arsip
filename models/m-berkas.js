const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('Berkas', berkasSchema)