const PenerimaModel = require('../models/m-penerima')

const penerimas = root => {
	if(!root.nama_penerima && !root.tgl_terima) throw { error: 'Nama Penerima atau Tgl Terima Diperlukan...' } 
	root.nama_penerima ? root.nama_penerima = new RegExp(root.nama_penerima, 'i') : null
	return PenerimaModel.find(root, '-berkas')
		.catch(err => {
			err.error ? err = err.error : null
			console.log(err)
			throw err
		})
}

module.exports = { penerimas }