module.exports = `
	type User{
		_id: ID!
		username: String!
		nama: String!
		status: Int!
		token: String
	}

	input UserInput{
		username: String!
		password: String!
		nama: String!
		status: Int
	}
`