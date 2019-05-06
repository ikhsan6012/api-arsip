const LBModel = require('../models/m-lb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
})
	.then(() => {
		return LBModel.find({}, 'tgl_terima')
	})
	.then(async res => {
		const lb = []
		await res.forEach(d => {
			const l = {
				updateOne: {
					filter: { _id: d._id },
					update: { time_tgl_terima: new Date(d.tgl_terima.split('/').reverse().join('-')).getTime() }
				}
			}
			lb.push(l)
		})
		return LBModel.bulkWrite(lb)
			.then(res => {
				console.log(res.insertedCount, res.modifiedCount, res.deletedCount)
				mongoose.connection.close()
			})
	})
	.catch(err => {
		console.log(err)
		mongoose.connection.close()
	})
