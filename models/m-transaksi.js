const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SeksiModel = require('./m-seksi')

const transaksiSchema = new Schema({
	berkas: [{
		type: Schema.Types.ObjectId,
		ref: 'Berkas',
	}],
	seksi: {
		type: Schema.Types.ObjectId,
		ref: 'Seksi',
	},
	no_nd_pinjam: {
		type: Number,
		required: true
	},
	tahun_nd_pinjam: {
		type: Number,
		required: true
	},
	tgl_nd_pinjam: {
		type: Date,
		required: true
	},
	no_nd_kirim: {
		type: Number,
		required: true,
	},
	tahun_nd_kirim: {
		type: Number,
		required: true
	},
	tgl_nd_kirim: {
		type: Date,
		required: true
	},
	no_nd_kembali: Number,
	tahun_nd_kembali: Number,
	tgl_nd_kembali: Date,
	keterangan: String
})

transaksiSchema.post('save', async (doc, next) => {
	await SeksiModel.findByIdAndUpdate(doc.seksi, { $push: { transaksi: doc.id } })
	next()
})

transaksiSchema.pre('findOneAndDelete', async function(next){
	const transaksi = this._conditions._id
	await SeksiModel.findOneAndUpdate({ transaksi }, { $pull: { transaksi } })
	next()
})

module.exports = mongoose.model('Transaksi', transaksiSchema)