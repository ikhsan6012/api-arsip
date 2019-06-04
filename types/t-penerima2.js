module.exports = `
	type Penerima {
		_id: ID
		nama_penerima: String
		tgl_terima: String
		berkas: [Berkas]
	}

	input PenerimaInput {
		nama_penerima: String!
		tgl_terima: String!
	}
`