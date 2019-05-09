const LBModel = require('../models/m-lb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
})
	.then(() => {
		return LBModel.aggregate([
			{
				$lookup: {
					from: 'wps',
					localField: 'npwp',
					foreignField: 'npwp',
					as: 'wp',
				},
			},
			{ $unwind: '$wp' },
			{
				$project: {
					_id: 0,
					updateMany: {
						filter: { npwp: '$npwp' },
						update: { nama_wp: '$wp.nama_wp' }
					}
				}
			}
		])
	})
	.then(res => {
		return LBModel.bulkWrite(res)
	})
	.then(res => {
		console.log(res)
		mongoose.connection.close()
	})
	.catch(err => {
		console.log(err)
		mongoose.connection.close()
	})