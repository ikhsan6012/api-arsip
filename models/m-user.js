const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	nama: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	token: String,
	transaksi: [{
		type: Schema.Types.ObjectId,
		ref: 'Transaksi'
	}],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', userSchema)