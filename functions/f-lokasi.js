const LokasiModel = require('../models/m-lokasi')
const UserModel = require('../models/m-user')
const BerkasModel = require('../models/m-berkas')

const objectIdFromDate = date => {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

const dateFromObjectId = objectId => {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

const monitorRekam = async root => {
	try {
		if(!root.tgl_rekam && !root.perekam) throw { msg: Error('Tanggal Rekam Atau Perekam Diperlukan...') }
		let query = {}
		if(root.tgl_rekam){
			const [d, m, y] = root.tgl_rekam.split('/').map(v => parseInt(v))
			const minDate = new Date(y, m-1, d).getTime()
			const tgl_rekam = objectIdFromDate(new Date(minDate))
			const end_tgl_rekam = objectIdFromDate(new Date(minDate+86400000))
			query = { _id: { $gte: tgl_rekam, $lt: end_tgl_rekam} }
		}
		if(root.perekam){
			root.perekam = new RegExp(root.perekam, 'i')
			const perekam = await UserModel.findOne({ nama: root.perekam }, '_id')
			if(!perekam) throw { msg: Error('Nama Perekam Tidak Cocok...') }
			query = { perekam: perekam.id }
		}
		let lokasi = await LokasiModel.find(query, '-berkas').populate([{ path: 'perekam', select: 'status nama' }])
		return lokasi.map(async l => {
			l.created_at = dateFromObjectId(l.id)
			l.jumlah_berkas = await BerkasModel.countDocuments({ lokasi: l.id })
			return l
		})
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Pada Server...')
	}
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
}

module.exports = { monitorRekam, setComplete, deleteLokasi }