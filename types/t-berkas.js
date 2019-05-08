module.exports = `
	type Berkas {
		_id: ID!
		ket_berkas: KetBerkas!
		pemilik: WP
		penerima: Penerima
		masa_pajak: Int
		tahun_pajak: Int
		status_pbk: String
		nomor_pbk: Int
		tahun_pbk: Int
		lokasi: Lokasi!
		urutan: Float!
		file: String
		ket_lain: String
		created_at: String!
		updated_at: String!
	}

	input BerkasInduk {
		kd_berkas: String!
		npwp: String!
		nama_wp: String!
		status: String
		gudang: Int!
		kd_lokasi: String!
		urutan: Float!
		file: String
		ket_lain: String
	}

	input BerkasSPTBaru {
		gudang: Int!
		kd_lokasi: String!
		kd_berkas: String!
		nama_penerima: String!
		tgl_terima: String!
		urutan: Float!
		ket_lain: String
		status: String
	}

	input BerkasPBK {
		kd_berkas: String!
		npwp: String!
		nama_wp: String!
		status: String
		status_pbk: String!
		tahun_pbk: String!
		nomor_pbk: String!
		gudang: Int!
		kd_lokasi: String!
		urutan: Float!
		ket_lain: String
	}

	input BerkasLainLain {
		kd_berkas: String!
		npwp: String!
		nama_wp: String!
		masa_pajak: Int!
		tahun_pajak: Int!
		gudang: Int!
		kd_lokasi: String!
		urutan: Float!
		ket_lain: String
		status: String
	}

	input BerkasUpdate {
		gudang: Int
		kd_lokasi: String
		npwp: String
		status: String
		nama_wp: String
		kd_berkas: String
		masa_pajak: Int
		tahun_pajak: Int
		nama_penerima: String
		tgl_terima: String
		urutan: Float
		ket_lain: String
	}
`