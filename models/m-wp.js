const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wpSchema = new Schema({
	npwp: {
		type: String,
		required: true,
		maxlength: 20,
		minlength: 20,
		trim: true,
		unique: true
	},
	nama_wp: {
		type: String,
		required: true,
		uppercase: true,
	},
	status: {
		type: String,
		required: true,
		uppercase: true,
		default: 'AKTIF'
	},
	berkas: [{
		type: Schema.Types.ObjectId,
		ref: 'Berkas'
	}],
	transaksi: [{
		type: Schema.Types.ObjectId,
		ref: 'Transaksi'
	}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('WP', wpSchema)