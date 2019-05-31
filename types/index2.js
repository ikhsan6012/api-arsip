module.exports = `
${require('./t-user2')}
${require('./t-ket-berkas2')}
${require('./t-wp2')}
${require('./t-berkas2')}
${require('./t-penerima2')}
${require('./t-lokasi2')}

type RootQuery{
	users(nama: String, status: Int): [User]
	user(username: String!, password: String!): User
	totalUsers(nama: String, status: Int): Int
	ketBerkases(nama_berkas: String, projection: String): [KetBerkas]
	ketBerkas(kd_berkas: String!): KetBerkas
	totalKetBerkases(nama_berkas: String): Int
	wps(npwp: String, nama_wp: String): [WP]
	totalWPs(npwp: String, nama_wp: String, status: String): Int
	lastUpdateWPs: String
	berkases(by: BerkasBy!, gudang: Int, kd_lokasi: String, id: ID): [Berkas]
	lastUpdateBerkas(kd_berkas: String!): String
	penerimas(nama_penerima: String, tgl_terima: String): [Penerima]
}

type RootMutation{
	addUser(input: UserInput!): User
	deleteBerkas(id: ID!): Berkas
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`