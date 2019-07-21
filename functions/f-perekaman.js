const LokasiModel = require('../models/m-lokasi')
const BerkasModel = require('../models/m-berkas')
const UserModel = require('../models/m-user')

const dateFromObjectId = objectId => {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

const objectIdFromDate = date => {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

const resumeRekam = async () => {
	try {
		const lokasis = await LokasiModel.find({}, '_id')
		const tgl_rekams = [ 's.d. Sekarang', ...new Set(lokasis.map(v => dateFromObjectId(v.id).toLocaleDateString()))]
		const jml_per_tgl = await Promise.all(tgl_rekams.map(async tgl_rekam => {
			if(tgl_rekam === 's.d. Sekarang'){
				const [selesai, belum, berkas] = await Promise.all([
					LokasiModel.countDocuments({ completed: true }),
					LokasiModel.countDocuments({ completed: { $ne: true } }),
					BerkasModel.countDocuments()
				])
				return { lokasi: { selesai, belum, total: selesai + belum }, berkas }
			}
			const tgl = new Date(tgl_rekam)
			const minDate = new Date(tgl.getFullYear(), tgl.getMonth(), tgl.getDate()).getTime()
			const $gte = objectIdFromDate(new Date(minDate))
			const $lt = objectIdFromDate(new Date(minDate+86400000))
			const [selesai, belum, berkas] = await Promise.all([
				LokasiModel.countDocuments({ _id: { $gte, $lt }, completed: true }),
				LokasiModel.countDocuments({ _id: { $gte, $lt }, completed: { $ne: true } }),
				BerkasModel.countDocuments({ lokasi: { $gte, $lt } })
			])
			return { lokasi: { selesai, belum, total: selesai + belum }, berkas }
		}))
		const resume = []
		for(let i = 0; i < tgl_rekams.length; i++){
			resume.push({ tgl_rekam: tgl_rekams[i] === 's.d. Sekarang' ? tgl_rekams[i] : new Date(tgl_rekams[i]), jml_per_tgl: jml_per_tgl[i] })
		}
		return resume.sort((a,b) => b.tgl_rekam - a.tgl_rekam)
	} catch (err) {
		console.log(err)
	}
}

const detailsResume = async ({ tgl_rekam }) => {
	try {
		const promise = []
		if(tgl_rekam !== 'Sekarang'){
			const [d,m,y] = tgl_rekam.split('/').map(v => parseInt(v))
			const date = new Date(y,m-1,d).getTime()
			const $gte = objectIdFromDate(new Date(date))
			const $lt = objectIdFromDate(new Date(date + 86400000))
			promise.push(UserModel.find({}, 'nama lokasi').populate([
				{
					path: 'lokasi',
					select: 'berkas completed',
					match: { _id: { $gte, $lt } }
				}
			]))
		} else {
			promise.push(UserModel.find({}, 'nama lokasi').populate([
				{
					path: 'lokasi',
					select: 'berkas completed'
				}
			]))
		}
		const [perekams] = await Promise.all(promise)
		const details = []
		for(let perekam of perekams){
			const total = perekam.lokasi.length
			const selesai = perekam.lokasi.filter(l => l.completed).length
			let berkas = 0
			perekam.lokasi.forEach(l => berkas += l.berkas.length)
			details.push({
				nama: perekam.nama,
				jml_per_tgl: {
					lokasi: { selesai, total, belum: total - selesai },
					berkas: berkas
				}
			})
		}
		return details
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Pada Server...')
	}
}

module.exports = { resumeRekam, detailsResume }