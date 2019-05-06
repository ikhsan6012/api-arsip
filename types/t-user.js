module.exports = `
	type User {
		_id: ID!
		username: String!
		nama: String!
		status: Int!
		token: String!
	}

	input UserData {
		username: String!
		password: String!
	}

	input UserInput {
		username: String!
		password: String!
		nama: String!
		status: Int
	}

	input UserNew {
		username: String
		password: String
		nama: String
		status: Int
	}

	input UserOld {
		username: String!
		password: String
		nama: String
		status: Int
	}
`