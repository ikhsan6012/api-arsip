const { getPenerimas } = require('../functions/f-penerima')

module.exports = {
	getPenerimas: ({ tgl_terima, nama_penerima }) => {
		return getPenerimas(!tgl_terima ? { nama_penerima: new RegExp(nama_penerima, 'i') } : !nama_penerima ? { tgl_terima } : { tgl_terima, nama_penerima: new RegExp(nama_penerima, 'i') })
			.then(res => {
				console.log('Berhasil Mengambil Data Penerima')
				return res
			})
			.catch(err => {
				console.log('Gagal Mengambil Data Penerima')
				throw err
			})
	}
}