const LBModel = require('../models/m-lb')
const WPModel = require('../models/m-wp')

const getSPTLB = ({ pageSize, page, sorted = [], filtered = [] }) => {
    const skip = pageSize * page
    const sort = {}, filter = {}
    sorted.forEach(s => {
        sort[s.sortBy] = s.order
    })
    filtered.forEach(f => {
        filter[f.filterBy] = new RegExp(f.value, 'i')
    })
    return new Promise((resolve, reject) => {
        return LBModel.find(filter).sort({ ...sort, time_tgl_terima: -1 }).skip(skip).limit(pageSize)
            .then(async res => {
                let data = await res.map(async lb => {
                    const wp = await WPModel.findOne({ npwp: lb.npwp }, 'nama_wp')
                    return { ...lb._doc, nama_wp: wp.nama_wp }
                })
                data = await Promise.all(data)
                resolve(data)
            })
            .catch(err => reject(err))
    })
}


const getTotalSPTLB = () => {
    return LBModel.countDocuments()
}

const addNDLB = ({ id, value, tahun }) => {
    return LBModel.findByIdAndUpdate(id, { no_nd: value, tahun_nd: tahun }, { new: true })
}

const deleteNDLB = id => {
    return LBModel.findByIdAndUpdate(id, { no_nd: null, tahun_nd: null }, { new: true })
}

module.exports = { getSPTLB, getTotalSPTLB, addNDLB, deleteNDLB }
