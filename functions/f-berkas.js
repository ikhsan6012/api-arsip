const BerkasModel = require('../models/m-berkas')

const { checkKetBerkas, checkKetBerkasById } = require('./f-ket-berkas')
const { getWPByNPWP, getWPById, addWP } = require('./f-wp')
const { checkLokasi, checkLokasiById, addLokasi } = require('./f-lokasi')
const { checkPenerima, checkPenerimaById, addPenerima } = require('./f-penerima')

const getBerkasByWP = id => {
	return new Promise((resolve, reject) => {
		return BerkasModel.find({ pemilik: id })
			.populate('ket_berkas')
			.populate('pemilik')
			.populate('lokasi')
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getBerkasByLokasi = async input => {
	let lokasi = await checkLokasi(input)
	return new Promise((resolve, reject) => {
		if(!lokasi) return resolve([])
		return BerkasModel.find({ lokasi: lokasi.id })
			.populate('ket_berkas')
			.populate('pemilik')
			.populate('lokasi')
			.populate('penerima')
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getBerkasByPenerima = id => {
	return new Promise((resolve, reject) => {
		return BerkasModel.find({ penerima: id })
			.populate('ket_berkas')
			.populate('lokasi')
			.populate('penerima')
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const getBerkasByKetBerkas = (id, kd_berkas) => {
	return new Promise((resolve, reject) => {
		if(kd_berkas === 'INDUK') {
			return BerkasModel.find({ ket_berkas: id })
				.populate('lokasi')
				.then(async res => {
					const last = await BerkasModel.findOne({ ket_berkas: id }).sort({ updated_at: -1 })
					resolve({ res, lastUpdate: last.updated_at })
				})
				.catch(err => reject(err))
		} else if(kd_berkas === 'PINDAH') {
			return BerkasModel.distinct('pemilik', { ket_berkas: id })
				.then(async res => {
					const total = await BerkasModel.countDocuments({ ket_berkas: id })
					const last = await BerkasModel.findOne({ ket_berkas: id }).sort({ updated_at: -1 })
					resolve({ jumlah_wajib_pajak: res.length, lastUpdate: last.updated_at, total })
				})
				.catch(err => reject(err))
		} else {
			return BerkasModel.countDocuments({ ket_berkas: id, penerima: null })
				.then(async res => {
					const total = await BerkasModel.countDocuments({ ket_berkas: id })
					const last = await BerkasModel.findOne({ ket_berkas: id }).sort({ updated_at: -1 })
					resolve({ berdasarkan_tanggal_terima: total - res, tidak_berdasarkan_tanggal_terima: res, total, lastUpdate: last.updated_at })
				})
				.catch(err => reject(err))
		}
	})
}

const addBerkasInduk = async input => {
	let ket_berkas = await checkKetBerkas(input.kd_berkas)
	let pemilik = await getWPByNPWP(input.npwp)
	if(!pemilik) pemilik = await addWP({ npwp: input.npwp, nama_wp: input.nama_wp, status: input.status })
	let lokasi = await checkLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	if(!lokasi) lokasi = await addLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	return new Promise((resolve, reject) => {
		if(!ket_berkas) reject(new Error('Kd Berkas Tidak Ditemukan!'))
		const Berkas = new BerkasModel({
			ket_berkas: ket_berkas.id,
			pemilik: pemilik.id,
			lokasi: lokasi.id,
			urutan: input.urutan,
			ket_lain: input.ket_lain,
			file: input.file
		})
		return Berkas.save()
			.then(res => {
				pushBerkas([ket_berkas, pemilik, lokasi], res.id)
				resolve({ ...res._doc, ket_berkas, pemilik, lokasi })
			})
			.catch(err => reject(err))
	})
}

const addBerkasSPTBaru = async input => {
	let ket_berkas = await checkKetBerkas(input.kd_berkas)
	let penerima = await checkPenerima({ nama_penerima: input.nama_penerima, tgl_terima: input.tgl_terima })
	if(!penerima) penerima = await addPenerima({ nama_penerima: input.nama_penerima, tgl_terima: input.tgl_terima })
	let lokasi = await checkLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	if(!lokasi) lokasi = await addLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	return new Promise((resolve, reject) => {
		const Berkas = new BerkasModel({
			ket_berkas: ket_berkas.id,
			penerima: penerima.id,
			lokasi: lokasi.id,
			urutan: input.urutan,
			ket_lain: input.ket_lain
		})
		return Berkas.save()
			.then(res => {
				pushBerkas([ket_berkas, penerima, lokasi], res.id)
				resolve({ ...res._doc, ket_berkas, penerima, lokasi })
			})
			.catch(err => reject(err))
	})
}

const addBerkasPBK = async input => {
	let ket_berkas = await checkKetBerkas(input.kd_berkas)
	let pemilik = await getWPByNPWP(input.npwp)
	if(!pemilik) pemilik = await addWP({ npwp: input.npwp, nama_wp: input.nama_wp, status: input.status })
	let lokasi = await checkLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	if(!lokasi) lokasi = await addLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	return new Promise((resolve, reject) => {
		if(!ket_berkas) reject(new Error('Kd Berkas Tidak Ditemukan!'))
		const Berkas = new BerkasModel({
			ket_berkas: ket_berkas.id,
			pemilik: pemilik.id,
			status_pbk: input.status_pbk,
			nomor_pbk: input.nomor_pbk,
			tahun_pbk: input.tahun_pbk,
			lokasi: lokasi.id,
			urutan: input.urutan,
			ket_lain: input.ket_lain
		})
		return Berkas.save()
			.then(res => {
				pushBerkas([ket_berkas, pemilik, lokasi], res.id)
				resolve({ ...res._doc, ket_berkas, pemilik, lokasi })
			})
			.catch(err => reject(err))
	})
}

const addBerkasLainLain = async input => {
	let ket_berkas = await checkKetBerkas(input.kd_berkas)
	let pemilik = await getWPByNPWP(input.npwp)
	if(!pemilik) pemilik = await addWP({ npwp: input.npwp, nama_wp: input.nama_wp, status: input.status })
	let lokasi = await checkLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	if(!lokasi) lokasi = await addLokasi({ gudang: input.gudang, kd_lokasi: input.kd_lokasi })
	return new Promise((resolve, reject) => {
		if(!ket_berkas) reject(new Error('Kd Berkas Tidak Ditemukan!'))
		const Berkas = new BerkasModel({
			ket_berkas: ket_berkas.id,
			pemilik: pemilik.id,
			masa_pajak: input.masa_pajak,
			tahun_pajak: input.tahun_pajak,
			lokasi: lokasi.id,
			urutan: input.urutan,
			ket_lain: input.ket_lain
		})
		return Berkas.save()
			.then(res => {
				pushBerkas([ket_berkas, pemilik, lokasi], res.id)
				resolve({ ...res._doc, ket_berkas, pemilik, lokasi })
			})
			.catch(err => reject(err))
	})
}

const editBerkas = (id, update) => {
	return new Promise((resolve, reject) => {
		return BerkasModel.findById(id)
			.then(async res => {
				let lokasi, pemilik, ket_berkas, penerima
				let lokasi_lama = await checkLokasiById(res.lokasi)
				if(update.gudang !== lokasi_lama.gudang || update.kd_lokasi !== lokasi_lama.kd_lokasi){
					pullBerkas([lokasi_lama], id)
					lokasi = await checkLokasi({ gudang: update.gudang, kd_lokasi: update.kd_lokasi })
					if(!lokasi) lokasi = await addLokasi({ gudang: update.gudang, kd_lokasi: update.kd_lokasi })
					pushBerkas([lokasi], id)
				} else { lokasi = await lokasi_lama }
				let pemilik_lama = update.npwp ? await getWPById(res.pemilik) : null
				if(update.npwp && pemilik_lama ? pemilik_lama.npwp !== update.npwp : false){
					pullBerkas([pemilik_lama], id)
					pemilik = await getWPByNPWP(update.npwp)
					if(!pemilik) pemilik = await addWP({ npwp: update.npwp, nama_wp: update.nama_wp })
					pushBerkas([pemilik], id)
				} else { pemilik = await pemilik_lama }
				let ket_berkas_lama = await checkKetBerkasById(res.ket_berkas)
				if(ket_berkas_lama.id !== res.ket_berkas){
					pullBerkas([ket_berkas_lama], id)
					ket_berkas = await checkKetBerkas(update.kd_berkas)
					pushBerkas([ket_berkas], id)
				} else { ket_berkas = await ket_berkas_lama }
				let penerima_lama = update.nama_penerima ? await checkPenerimaById(res.penerima) : null
				if(update.nama_penerima && penerima_lama ? penerima_lama.nama_penerima !== update.nama_penerima || penerima_lama.tgl_terima !== update.tgl_terima : false){
					pullBerkas([penerima_lama], id)
					penerima = await checkPenerima({ nama_penerima: update.nama_penerima, tgl_terima: update.tgl_terima })
					if(!penerima) penerima = await addPenerima({ nama_penerima: update.nama_penerima, tgl_terima: update.tgl_terima })
					pushBerkas([penerima], id)
				} else { penerima = await penerima_lama }
				let set = await {
					lokasi: lokasi.id,
					ket_berkas: ket_berkas.id,
				}
				set = pemilik ? await { ...set, pemilik: pemilik.id } : set
				set = penerima ? await { ...set, penerima: penerima.id } : set
				res.set(set)
				res.save()
				let data = { ...res._doc, lokasi, ket_berkas }
				data = pemilik ? await { ...data, pemilik } : data
				data = penerima ? await { ...data, penerima } : data
				resolve(data)
			})
			.catch(err => reject(err))
	})
}

const deleteBerkas = id => {
	return new Promise((resolve, reject) => {
		return BerkasModel.findByIdAndDelete(id)
			.populate('pemilik')
			.then(async res => {
				let array = []
				let ket_berkas = await checkKetBerkasById(res.ket_berkas)
				if(ket_berkas) await array.push(ket_berkas)
				let pemilik = res.pemilik ? await getWPById(res.pemilik) : null
				if(pemilik) await array.push(pemilik)
				let penerima = res.penerima ? await checkPenerimaById(res.penerima) : null
				if(penerima) await array.push(penerima)
				let lokasi = await checkLokasiById(res.lokasi)
				if(lokasi) await array.push(lokasi)
				pullBerkas(array, id)
				resolve(res)
			})
			.catch(err => reject(err))
	})
}

const pushBerkas = (array, id) => {
	array.forEach(each => {
		each.berkas.push(id)
		each.save()
	});
}

const pullBerkas = (array, id) => {
	array.forEach(each => {
		each.berkas.pull(id)
		each.save()
	});
}

module.exports = { getBerkasByWP, getBerkasByLokasi, getBerkasByPenerima, getBerkasByKetBerkas, addBerkasInduk, addBerkasSPTBaru, addBerkasPBK, addBerkasLainLain, editBerkas, deleteBerkas }