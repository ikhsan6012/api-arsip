module.exports = `
	type WP {
		_id: ID!
		npwp: String!
		nama_wp: String!
		status: String!
		berkas: [Berkas]!
	}

	type WPDetail {
		aktif: Int!
		de: Int!
		ne: Int!
		pindah: Int!
		total: Int!
		lastUpdate: String
	}

	input AddWP {
		npwp: String!
		nama_wp: String!
	}
`