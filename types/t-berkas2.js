module.exports = `
	type Berkas {
		_id: ID
		ket_berkas: KetBerkas
		pemilik: WP
		masa_pajak: Int
		tahun_pajak: Int
		penerima: Penerima
		status_pbk: String
		nomor_pbk: Int
		tahun_pbk: Int
		urutan: Float
		lokasi: Lokasi
		file: String
		ket_lain: String
		created_at: String
		updated_at: String
	}

	input BerkasEdit {
		lokasi: LokasiInput!
		pemilik: WPInput
		kd_berkas: String!
		penerima: PenerimaInput
		masa_pajak: Int
		tahun_pajak: Int
		status_pbk: String
		nomor_pbk: Int
		tahun_pbk: Int
		urutan: Float!
		ket_lain: String
	}

	enum BerkasBy {
		lokasi
		pemilik
		penerima
	}
`