const mongoose = require('mongoose')
const UserModel = require('../models/m-user')
const LokasiModel = require('../models/m-lokasi')

const objectIdFromDate = function (date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
}).then(async () => {
	try {
		const [d,m,y] = process.argv[2].split('/').map((v, i) => i === 1 ? parseInt(v) - 1 : parseInt(v))
		const date = new Date(y,m,d)
		const $lt = objectIdFromDate(date)
		await LokasiModel.updateMany({ _id: { $lt } }, { $set: { completed: true } })
		const admin = await UserModel.findOne({ username: 'admin' }, '_id')
		await LokasiModel.updateMany({ perekam: null }, { perekam: admin.id })
		await UserModel.updateMany({}, { lokasi: [] })
		const lokasis = await LokasiModel.find({}, 'perekam')
		const promise = []
		for(lokasi of lokasis){
			promise.push(UserModel.findByIdAndUpdate(lokasi.perekam, { $push: { lokasi: lokasi.id } }))
		}
		await Promise.all(promise)
	} catch (err) {
		console.log(err)
	}
	mongoose.connection.close()
})