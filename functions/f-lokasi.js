const LokasiModel = require('../models/m-lokasi')
const UserModel = require('../models/m-user')

const setComplete = async root => {
	const user = await UserModel.findOne({ username: root.username }, '_id')
	if(!user) throw Error('User Tidak Ditemukan...')
	return LokasiModel.findByIdAndUpdate(root.lokasi, {
		completed: root.completed, 
		time_completed: root.completed ? new Date() : null,
		cancel_msg: root.cancel_msg
	}, { new: true })
}

module.exports = { setComplete }