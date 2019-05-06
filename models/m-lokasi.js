const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lokasiSchema = new Schema({
	gudang: {
		type: Number,
		required: true,
		min: 1,
		max: 2
	},
	kd_lokasi: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 6,
		uppercase: true
	},
	berkas: [{
		type: Schema.Types.ObjectId,
		ref: 'Berkas'
	}]
})

module.exports = mongoose.model('Lokasi', lokasiSchema)