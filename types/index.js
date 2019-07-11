module.exports = `
${require('./t-user')}
${require('./t-ket-berkas')}
${require('./t-wp')}
${require('./t-berkas')}
${require('./t-penerima')}
${require('./t-lokasi')}
${require('./t-lb')}

type RootQuery{
	users(nama: String, status: Int): [User]
	user(username: String!, password: String!): User
	totalUsers(nama: String, status: Int): Int
	ketBerkases(nama_berkas: String, projection: String): [KetBerkas]
	ketBerkas(kd_berkas: String!): KetBerkas
	totalKetBerkases(nama_berkas: String): Int
	wps(by: WPSBy!, search: WPSSearch!, begin: Int, end: Int): [WP]
	wp(npwp: String): WP
	totalWPs(npwp: String, nama_wp: String, status: String): Int
	lastUpdateWPs: String
	berkases(by: BerkasBy!, gudang: Int, kd_lokasi: String, id: ID): [Berkas]
	lastUpdateBerkas(kd_berkas: String!): String
	penerimas(nama_penerima: String, tgl_terima: String): [Penerima]
	lbs(filter: [FilterLB], sort: [SortLB], skip: Int, limit: Int): [LB]
	monitorRekam(tgl_rekam: String!): [User]
}

type RootMutation{
	addUser(input: UserInput!): User
	changePassword(username: String! password_lama: String!, password_baru: String!): User
	addBerkas(username: String!, input: BerkasInput!): Berkas
	addBerkasDocument(id: ID!, file: String!): Berkas
	deleteBerkas(id: ID!): Berkas
	deleteBerkasDocument(id: ID!): Berkas
	editBerkas(id: ID!, input: BerkasInput!): Berkas
	setComplete(username: String!, lokasi: ID!, completed: Boolean!, cancel_msg: String): Lokasi
	deleteLokasi(id: ID!): Lokasi
	addNDLB(id: ID!, no_nd: String!, tahun_nd: Int!): LB
	deleteNDLB(id: ID!): LB
	addTujuanLB(id: ID!, tujuan_nd: String!): LB
	deleteTujuanLB(id: ID!, tujuan_nd: String!): LB
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`