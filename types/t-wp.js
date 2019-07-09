module.exports = `
	type WP {
		_id: ID
		npwp: String
		nama_wp: String
		status: String
	}

	input WPInput {
		npwp: String!
		nama_wp: String!
		status: String
	}

	input WPSSearch {
		npwp: String
		nama_wp: String
		status: String
	}

	enum WPSBy {
		npwp
		nama_wp
		status
	}
`