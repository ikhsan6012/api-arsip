module.exports = `
	type Lokasi {
		_id: ID
		gudang: Int
		kd_lokasi: String
		berkas: [Berkas]
	}

	input LokasiInput {
		gudang: Int!
		kd_lokasi: String!
	}
`