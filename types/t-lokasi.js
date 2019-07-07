module.exports = `
	type Lokasi {
		_id: ID
		gudang: Int
		kd_lokasi: String
		berkas: [Berkas]
		completed: Boolean
		time_completed: String
	}

	input LokasiInput {
		gudang: Int!
		kd_lokasi: String!
	}
`