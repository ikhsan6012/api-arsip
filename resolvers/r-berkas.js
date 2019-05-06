const { getBerkasByWP, getBerkasByLokasi, getBerkasByPenerima, addBerkasInduk, addBerkasSPTBaru, addBerkasPBK, addBerkasLainLain, editBerkas, deleteBerkas } = require('../functions/f-berkas')

module.exports = {
	getBerkasByWP: ({id}) => {
		return getBerkasByWP(id)
		.then(res => {
			console.log('Berhasil Mengambil Data Berkas!')
			return res
		})
		.catch(err => {
			console.error('Gagal Mengambil Data Berkas!')
			throw err
		})
	},
	getBerkasByLokasi: lokasi => {
		return getBerkasByLokasi(lokasi)
		.then(res => {
			console.log('Berhasil Mengambil Data Berkas!')
			return res
		})
		.catch(err => {
			console.error('Gagal Mengambil Data Berkas!')
			throw err
		})
	},
	getBerkasByPenerima: ({id}) => {
		return getBerkasByPenerima(id)
			.then(res => {
				console.log('Berhasil Mengambil Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Mengambil Data Berkas!')
				throw err
			})
	},
	addBerkasInduk: ({input}) => {
		return addBerkasInduk(input)
			.then(res => {
				console.log('Berhasil Menyimpan Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Menyimpan Data Berkas!')
				throw err
			})
	},
	addBerkasSPTBaru: ({input}) => {
		return addBerkasSPTBaru(input)
			.then(res => {
				console.log('Berhasil Menyimpan Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Menyimpan Data Berkas!')
				throw err
			})
	},
	addBerkasPBK: ({input}) => {
		return addBerkasPBK(input)
			.then(res => {
				console.log('Berhasil Menyimpan Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Menyimpan Data Berkas!')
				throw err
			})
	},
	addBerkasLainLain: ({input}) => {
		return addBerkasLainLain(input)
			.then(res => {
				console.log('Berhasil Menyimpan Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Menyimpan Data Berkas!')
				throw err
			})
	},
	editBerkas: ({id, update}) => {
		return editBerkas(id, update)
			.then(res => {
				console.log('Berhasil Menyimpan Data Berkas!')
				return res
			})
			.catch(err => {
				console.error('Gagal Menyimpan Data Berkas!')
				throw err
			})
	},
	deleteBerkas: ({id}) => {
		return deleteBerkas(id)
		.then(res => {
			console.log('Berhasil Menghapus Data Berkas!')
			return res
		})
		.catch(err => {
			console.error('Gagal Menghapus Data Berkas!')
			throw err
		})
	}
}