const { getSPTLB } = require('../functions/f-lb')

module.exports = {
    getSPTLB: () => {
        return getSPTLB()
            .then(res => {
                console.log('Berhasil Mengambil Data SPT LB!')
                return res
            })
            .catch(err => {
                console.log('Gagal Mengambil Data SPT LB!')
                throw err
            })
    }
}