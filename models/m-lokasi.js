const mongoose = require('mongoose')
const UserModel = require('./m-user')
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
	}],
	perekam: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	},
	time_completed: Date,
	cancel_msg: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

lokasiSchema.post('findOneAndUpdate', async (doc, next) => {
	const UserModel = require('./m-user')
	if(doc.perekam){
		const perekam = await UserModel.findById(doc.perekam)
		if(!perekam.lokasi.includes(doc.id)){
			perekam.lokasi.push(doc.id)
			await perekam.save()
		}
	}
	next()
})

lokasiSchema.post('findOneAndDelete', async (doc, next) => {
	const BerkasModel = require('./m-berkas')
	const promise = []
	if(doc.berkas.length){
		for(let berkas of doc.berkas){
			promise.push(BerkasModel.findByIdAndDelete(berkas))
		}
	}
	if(doc.perekam) promise.push(UserModel.findByIdAndUpdate(doc.perekam, { $pull: { lokasi: doc.id } }))
	await Promise.all(promise)
	next()
})

module.exports = mongoose.model('Lokasi', lokasiSchema)