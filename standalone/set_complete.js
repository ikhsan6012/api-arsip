const mongoose = require('mongoose')
const LokasiModel = require('../models/m-lokasi')

const objectIdFromDate = function (date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
}).then(async (e) => {
		const [d,m,y] = process.argv[2].split('/').map((v, i) => i === 1 ? parseInt(v) - 1 : parseInt(v))
		const date = new Date(y,m,d)
		const $lt = objectIdFromDate(date)
		try {
			const res = await LokasiModel.updateMany({ _id: { $lt } }, { $set: { completed: true } })
			console.log(res)
			mongoose.connection.close()
		} catch (err) {
			console.log(err)
			mongoose.connection.close()
		}
	}
)