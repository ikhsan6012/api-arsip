const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seksiSchema = new Schema({
		kode: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		nama_seksi: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		transaksi: [{
			type: Schema.Types.ObjectId,
			ref: 'Transaksi'
		}]
})

module.exports = mongoose.model('Seksi', seksiSchema)