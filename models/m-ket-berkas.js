const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ketBerkasSchema = new Schema({
	kd_berkas: {
		type: String,
		required: true,
		trim: true,
		uppercase: true,
		unique: true
	},
	nama_berkas: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	berkas: [{
		type: Schema.Types.ObjectId,
		ref: 'Berkas'
	}]
})

module.exports = mongoose.model('KetBerkas', ketBerkasSchema)