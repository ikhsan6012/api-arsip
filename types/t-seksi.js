module.exports = `
	type Seksi {
		_id: ID
		kode: String
		nama_seksi: String,
		transaksi: [Transaksi]
	}

	input SeksiInput {
		kode: String
		nama_seksi: String
	}
`