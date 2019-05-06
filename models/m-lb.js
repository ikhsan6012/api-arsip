const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lbSchema = new Schema({
    npwp: String,
    no_tt: String,
    tgl_spt:String,
    nilai: String,
    masa_tahun: String,
    res_kom: String,
    sumber: String,
    pb: String,
    tgl_terima: String,
    tgl_jt: String,
})

module.exports = mongoose.model('LB', lbSchema)