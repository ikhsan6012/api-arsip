const KetBerkasModel = require('../models/m-ket-berkas')

const ketBerkases = root => {
	root.nama_berkas ? root.nama_berkas = new RegExp(root.nama_berkas, 'i') : null
	return KetBerkasModel.find(root)
		.then(res => {
			res = res.map(kb => ({ ...kb._doc, jumlah: kb.berkas.length }))
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const ketBerkas = root => {
	const kd_berkas = new RegExp(root.kd_berkas, 'i')
	if(root.kd_berkas.match(/SPT|PPH|PPN/i)){
		return ketBerkasSPT(root)
	}
	root.kd_berkas ? root.kd_berkas = kd_berkas : null
	if('INDUK'.match(kd_berkas)){
		return ketBerkasInduk(root)
	} else if('PINDAH'.match(kd_berkas)) {
		return ketBerkasPindah(root)
	}
}

const ketBerkasInduk = root => {
	return KetBerkasModel.findOne(root)
		.populate({
			path: 'berkas',
			select: '-_id lokasi updated_at',
			populate: {
				path: 'lokasi',
				select: '-_id -berkas',
			}
		})
		.then(res => {
			res.berkas_baru = res.berkas.filter(b => {
				return b.lokasi.gudang === 1 || (b.lokasi.gudang === 2 && b.lokasi.kd_lokasi.match(/^[ABC]\d/))
			}).length
			res.total = res.berkas.length
			res.berkas_lama = res.total - res.berkas_baru
			res.lastUpdate = res.berkas.sort((a,b) => {
				return b.updated_at - a.updated_at
			})[0].updated_at
			return res
		})
		.catch(err => {
			console.log(err)
			throw err
		})
}

const ketBerkasPindah = root => {
	return KetBerkasModel.findOne(root)
		.populate({
			path: 'berkas',
			select: '_id updated_at',
			populate: {
				path: 'pemilik',
				select: '_id'
			}
		})
		.then(res => {
			const berkas_wajib_pajak_pindah = res.berkas
			res.berkas_wajib_pajak_pindah = berkas_wajib_pajak_pindah.length
			const wajib_pajak_pindah = []
			berkas_wajib_pajak_pindah.forEach(b => {
				if(wajib_pajak_pindah.indexOf(b.pemilik) < 0) return wajib_pajak_pindah.push(b.pemilik)
				return
			})
			res.wajib_pajak_pindah = wajib_pajak_pindah.length
			res.lastUpdate = res.berkas.sort((a,b) => {
				return b.updated_at - a.updated_at
			})[0].updated_at
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const ketBerkasSPT = root => {
	return KetBerkasModel.findOne(root)
		.populate({
			path: 'berkas',
			select: '-_id penerima updated_at'
		})
		.then(res => {
			res.berdasarkan_tanggal_terima = res.berkas.filter(b => b.penerima).length
			res.total = res.berkas.length
			res.tidak_berdasarkan_tanggal_terima = res.total - res.berdasarkan_tanggal_terima
			res.lastUpdate = res.berkas.sort((a,b) => {
				return b.updated_at - a.updated_at
			})[0].updated_at
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const totalKetBerkases = root => {
	root.nama_berkas ? root.nama_berkas = new RegExp(root.nama_berkas, 'i') : null
	return KetBerkasModel.countDocuments(root)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...')
		})
}

module.exports = { ketBerkases, ketBerkas, totalKetBerkases }