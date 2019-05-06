module.exports = `
	${require('./t-user')}
	${require('./t-ket-berkas')}
	${require('./t-lokasi')}
	${require('./t-wp')}
	${require('./t-berkas')}
	${require('./t-penerima')}
	${require('./t-lb')}

	type RootQuery {
		getUser(username: String!, password: String!): User
		getJumlahWP: Int!
		getSemuaKetBerkas: [KetBerkas]!
		getWPByNPWP(npwp: String!): WP!
		getWPsByNPWP(npwp: String!): [WP]!
		getWPsByNamaWP(nama_wp: String!): [WP]!
		getWPsByStatus(status: String!, begin: Int!, end: Int): [WP]!
		getPenerimas(tgl_terima: String, nama_penerima: String): [Penerima]!
		getBerkasByWP(id: ID!): [Berkas]!
		getBerkasByLokasi(gudang: Int!, kd_lokasi: String!): [Berkas]!
		getBerkasByPenerima(id: ID!): [Berkas]!
		getDetailWP: WPDetail!
		getDetailInduk(kd_berkas: String!): DetailInduk!
		getDetailPindah(kd_berkas: String!): DetailPindah!
		getDetailSPT(kd_berkas: String!): DetailSPT!
		getSPTLB(pageSize: Int!, page: Int!, sorted: [SortLB], filtered: [FilterLB]): [LB]!
		getTotalSPTLB: Int!
	}

	type RootMutation {
		addUser(input: UserInput!): User!
		addKetBerkas(kd_berkas: String!, nama_berkas: String!): KetBerkas!
		addBerkasInduk(input: BerkasInduk!): Berkas!
		addBerkasSPTBaru(input: BerkasSPTBaru!): Berkas!
		addBerkasPBK(input: BerkasPBK!): Berkas!
		addBerkasLainLain(input: BerkasLainLain!): Berkas!
		editBerkas(id: ID!, update: BerkasUpdate!): Berkas!
		deleteBerkas(id: ID!): Berkas!
		addNDLB(id: ID!, value: Int!, tahun: Int!): LB!
		deleteNDLB(id: ID!): LB!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`