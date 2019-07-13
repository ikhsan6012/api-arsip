const LokasiModel = require('../models/m-lokasi')
const UserModel = require('../models/m-user')
const BerkasModel = require('../models/m-berkas')

const monitorRekam = async root => {
	const [d, m, y] = root.tgl_rekam.split('/').map((v, i) => {
		v = parseInt(v)
		if(i === 1) v -= 1
		return v
	})
	const tgl_rekam = new Date(y, m, d).getTime()
	const end_tgl_rekam = tgl_rekam + 86400000
	const lokasi = await LokasiModel.find({ 
		created_at: { $gte: tgl_rekam, $lt: end_tgl_rekam} 
	}, '-berkas').populate('perekam')
	return lokasi.filter(l => l.perekam.status !== 0 ).map(async l => {
		l.jumlah_berkas = await BerkasModel.countDocuments({ lokasi: l.id })
		return l
	})
}

const setComplete = async root => {
	const user = await UserModel.findOne({ username: root.username }, '_id')
	if(!user) throw Error('User Tidak Ditemukan...')
	return LokasiModel.findByIdAndUpdate(root.lokasi, {
		completed: root.completed, 
		time_completed: root.completed ? new Date() : null,
		cancel_msg: root.cancel_msg
	}, { new: true })
}

const deleteLokasi = async ({ id }) => {
	return LokasiModel.findByIdAndDelete(id)
}

module.exports = { monitorRekam, setComplete, deleteLokasi }