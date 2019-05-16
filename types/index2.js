module.exports = `
${require('./t-user2')}
${require('./t-ket-berkas2')}

type RootQuery{
	users(nama: String, status: Int): [User]
	user(username: String!, password: String!): User
	totalUsers(nama: String, status: Int): Int
	ketBerkases(nama_berkas: String): [KetBerkas]
	ketBerkas(kd_berkas: String!): KetBerkas
	totalKetBerkases(nama_berkas: String): Int
	totalWPs(npwp: String, nama_wp: String, status: String): Int
	lastUpdateWPs: String
	lastUpdateBerkas(kd_berkas: String!): String
}

type RootMutation{
	addUser(input: UserInput!): User
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`