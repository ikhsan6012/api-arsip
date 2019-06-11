const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lbSchema = new Schema({
    npwp: String,
    nama_wp: String,
    no_tt: String,
    tgl_spt:String,
    time_tgl_spt: Number,
    nilai: String,
    masa_tahun: String,
    res_kom: String,
    sumber: String,
    pb: String,
    tgl_terima: String,
    time_tgl_terima: Number,
    tgl_jt: String,
    no_nd: String,
    tahun_nd: Number,
    tujuan_nd: [String]
})

module.exports = mongoose.model('LB', lbSchema)