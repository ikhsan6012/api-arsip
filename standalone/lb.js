const LBModel = require('../models/m-lb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
})
	.then(() => {
		return LBModel.find({}, 'npwp tgl_terima')
	})
	.then(async res => {
		const lb = []
		await res.forEach(d => {
			const npwp1 = d.npwp.split('-')[0]
			const npwp2 = d.npwp.split('-').filter((n, i) => i > 0).join('.')
			const npwp = `${npwp1}-${npwp2}`
			const l = {
				updateOne: {
					filter: { _id: d._id },
					update: { 
						npwp,
						time_tgl_terima: new Date(d.tgl_terima.split('/').reverse().join('-')).getTime()
					}
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
