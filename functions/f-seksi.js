const SeksiModel = require('../models/m-seksi')

// Query
const seksis = async root => {
	try {
		root.nama_seksi ? root.nama_seksi = new RegExp(root.nama_seksi, 'i') : null
		const populate = root.populate
		delete root.populate
		const seksis = await SeksiModel.find(root).sort({ kode: 1 })
			.populate(populate ? 'transaksi' : '')
		return seksis
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

const seksi = async root => {
	try {
		if(!Object.keys(root).length) throw { msg: Error('ID atau Kode Seksi Diperlukan...') }
		root.nama_seksi ? root.nama_seksi = new RegExp(root.nama_seksi, 'i') : null
		const seksi = await SeksiModel.findOne(root, '-transaksi')
		return seksi
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

// Mutation
const addSeksi = async root => {
	const { input } = root
	try {
		const newSeksi = new SeksiModel(input)
		const seksi = await newSeksi.save()
		return seksi
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
} 

module.exports = { seksi, seksis, addSeksi }