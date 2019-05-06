const mongoose = require('mongoose')
const Schema = mongoose.Schema

const penerimaSchema = new Schema({
	nama_penerima: {
		type: String,
		required: true,
		trim: true,
		uppercase: true
	},
	tgl_terima: {
		type: String,
		required: true,
		trim: true,
		minlength: 10,
		maxlength: 10
	},
	berkas: [{
		type: Schema.Types.ObjectId,
		ref: 'Berkas'
	}]
})

module.exports = mongoose.model('Penerima', penerimaSchema)