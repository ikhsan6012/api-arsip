module.exports = `
	type LokasiResume {
		selesai: Int
		belum: Int
		total: Int
	}
	
	type JumlahPerTanggal {
		lokasi: LokasiResume
		berkas: Int
	}

	type ResumeRekam {
		tgl_rekam: String
		jml_per_tgl: JumlahPerTanggal
	}

	type DetailResume {
		nama: String
		jml_per_tgl: JumlahPerTanggal
	}
`