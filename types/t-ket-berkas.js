module.exports = `
	type KetBerkas {
		_id: ID!
		kd_berkas: String!
		nama_berkas: String!
		berkas: [Berkas]!
		jumlah: Int!
	}

	type DetailInduk {
		berkas_lama: Int!
		berkas_baru: Int!
		total: Int!
		lastUpdate: String
	}

	type DetailPindah {
		jumlah_wajib_pajak: Int!
		total: Int!
		lastUpdate: String
	}

	type DetailSPT {
		berdasarkan_tanggal_terima: Int!
		tidak_berdasarkan_tanggal_terima: Int!
		total: Int!
		lastUpdate: String
	}

	input KetBerkasInput {
		kd_berkas: String!
		nama_berkas: String!
	}
`