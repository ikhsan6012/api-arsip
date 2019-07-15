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
	}, '-berkas').populate([{ path: 'perekam', select: 'nama' }])
	return lokasi.filter(l => l.perekam.status !== 0 ).map(async l => {
		l.jumlah_berkas = await BerkasModel.countDocuments({ lokasi: l.id })
		return l
	})
}

const setComplete = async root => {
	const user = await UserModel.findOne({ username: root.username }, '_id')
	if(!user) throw Error('User Tidak Ditemukan...')
	const lokasi = await LokasiModel.findById(root.lokasi)
	if((lokasi.perekam != user.id) && root.username !== 'admin') throw Error('Anda Tidak Memiliki Akses Pada Lokasi Ini...')
	lokasi.completed = root.completed
	lokasi.time_completed = root.completed ? new Date() : null
	lokasi.cancel_msg = root.cancel_msg
	return lokasi.save()
}

const deleteLokasi = async ({ id, username }) => {
	try {
		const [l, p] = await Promise.all([
			LokasiModel.findById(id, 'perekam'),
			UserModel.findOne({ username })
		])
		if((l.perekam != p.id) && (username !== 'admin')) throw { msg: Error('Anda Tidak Diizinkan Menghapus Lokasi Ini...') }
		return LokasiModel.findByIdAndDelete(id)
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Pada Server...')
	}
	const lokasi = awa
	return LokasiModel.findByIdAndDelete(id)
}

module.exports = { monitorRekam, setComplete, deleteLokasi }