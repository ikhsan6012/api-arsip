module.exports = `
	type Transaksi {
		_id: ID
		seksi: Seksi
		berkas: [Berkas]
		tgl_nd_diterima: String
		no_nd_pinjam: Int
		tahun_nd_pinjam: Int
		tgl_nd_pinjam: String
		no_nd_kirim: Int
		tahun_nd_kirim: Int
		tgl_nd_kirim: String
		no_nd_kembali: Int
		tahun_nd_kembali: Int
		tgl_nd_kembali: String
		keterangan: String
	}

	input TransaksiInput {
		seksi: ID
		berkas: ID
		tgl_nd_diterima: String
		no_nd_pinjam: Int
		tahun_nd_pinjam: Int
		tgl_nd_pinjam: String
		no_nd_kirim: Int
		tahun_nd_kirim: Int
		tgl_nd_kirim: String
		no_nd_kembali: Int
		tahun_nd_kembali: Int
		tgl_nd_kembali: String
		keterangan: String
	}
`