const { getSemuaKetBerkas, getDetailInduk, getDetailPindah, getDetailSPT, addKetBerkas } = require('../functions/f-ket-berkas')

module.exports = {
	getSemuaKetBerkas: () => {
		return getSemuaKetBerkas()
			.then(res => {
				console.log('Berhasil mengambil data Semua Ket Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data Semua Ket Berkas!')
				throw err
			})
	},
	getDetailInduk: ({ kd_berkas }) => {
		return getDetailInduk(kd_berkas)
			.then(res => {
				console.log('Berhasil mengambil data detail berkas')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data detail berkas')
				throw err
			})
	},
	getDetailPindah: ({ kd_berkas }) => {
		return getDetailPindah(kd_berkas)
			.then(res => {
				console.log('Berhasil mengambil data detail berkas')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data detail berkas')
				throw err
			})
	},
	getDetailSPT: ({ kd_berkas }) => {
		return getDetailSPT(kd_berkas)
			.then(res => {
				console.log('Berhasil mengambil data detail berkas')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data detail berkas')
				return err
			})
	},
	addKetBerkas: input => {
		return addKetBerkas(input)
			.then(res => {
				console.log('Berhasil Menambahkan Data Ket Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal  Menambahkan Data Ket Berkas!')
				throw err
			})
	}
}