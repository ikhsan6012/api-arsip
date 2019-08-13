const TransaksiModel = require('../models/m-transaksi')

const stringToDate = string => {
	const [d,m,y] = string.split('/').map((s, i) => i != 1 ? parseInt(s) : parseInt(s) - 1)
	return new Date(y,m,d)
}

const transaksis = async root => {
	try {
		const transaksis = await TransaksiModel.find().sort({ tgl_nd_pinjam: -1 })
			.populate(root.populate ? [
				{ path: 'seksi' },
				{
					path: 'berkas',
					populate: 'ket_berkas pemilik penerima lokasi'
				}
			] : '')
		return transaksis
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')	
	}
}

const addTransaksi = async root => {
	try {
		const { input } = root
		const transaksi = await TransaksiModel.findOne({ no_nd_pinjam: input.no_nd_pinjam, tahun_nd_terima: input.tahun_nd_terima })
		if(!transaksi) {
			const newTransaksi = new TransaksiModel({
				...input,
				tgl_nd_pinjam: stringToDate(input.tgl_nd_pinjam),
				tgl_nd_kirim: stringToDate(input.tgl_nd_kirim),
			})
			return newTransaksi.save()
		} else {
			return await TransaksiModel.findOneAndUpdate({ no_nd_pinjam: input.no_nd_pinjam, tahun_nd_terima: input.tahun_nd_terima }, {
				$push: { berkas: input.berkas }
			}, { new: true })
		}
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

const editTransaksi = async root => {
	try {
		const { _id, input } = root
		if(!root._id) throw Error({ errmsg: 'ID Diperlukan...' })
		return TransaksiModel.findByIdAndUpdate(_id, { ...input, tgl_nd_kembali: stringToDate(input.tgl_nd_kembali) })
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

const deleteTransaksi = async root => {
	try {
		return TransaksiModel.findOneAndDelete(root)
	} catch (err) {
		console.log(err)
		if(err.msg) throw err.msg
		throw Error('Terjadi Masalah Saat Menyimpan Data...')
	}
}

module.exports = { transaksis, addTransaksi, editTransaksi, deleteTransaksi }