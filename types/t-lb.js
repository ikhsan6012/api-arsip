module.exports = `
    type LB {
        _id: ID!
        npwp: String
        nama_wp: String
        no_tt: String
        tgl_spt: String
        nilai: String
        masa_tahun: String
        res_kom: String
        sumber: String
        pb: String
        tgl_terima: String
        tgl_jt: String
        no_nd: String
        tahun_nd: Int
    }

    input SortLB {
        sortBy: String!
        order: Int!
    }

    input FilterLB {
        filterBy: String!
        value: String
    }
`