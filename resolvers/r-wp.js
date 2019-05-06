const { getJumlahWP, getWPByNPWP, getWPsByNPWP, getWPsByNamaWP, getWPsByStatus, getDetailWP } = require('../functions/f-wp')

module.exports = {
	getJumlahWP: () => {
		return getJumlahWP()
			.then(res => {
				console.log('Berhasil mengambil data Jumlah WP!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data Jumlah WP!')
				throw err
			})
	},
	getWPByNPWP: ({npwp}) => {
		return getWPByNPWP(npwp)
			.then(res => {
				console.log('Berhasil mengambil data WP!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data WP!')
				throw err
			})
	},
	getWPsByNPWP: ({npwp}) => {
		return getWPsByNPWP(npwp)
			.then(res => {
				console.log('Berhasil mengambil data WP!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data WP!')
				throw err
			})
	},
	getWPsByNamaWP: ({nama_wp}) => {
		return getWPsByNamaWP(nama_wp)
			.then(res => {
				console.log('Berhasil mengambil data WP!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data WP!')
				throw err
			})
	},
	getWPsByStatus: input => {
		return getWPsByStatus(input)
			.then(res => {
				console.log('Berhasil mengambil data WP!')
				return res
			})
			.catch(err => {
				console.error('Gagal mengambil data WP!')
				throw err
			})
	},
	getDetailWP: () => {
		return getDetailWP()
		.then(res => {
			console.log('Berhasil mengambil detail WP!')
			return res
		})
		.catch(err => {
			console.error('Gagal mengambil detail WP!')
			throw err
		})
	}
}