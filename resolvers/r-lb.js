const { getSPTLB, getTotalSPTLB, addNDLB, deleteNDLB } = require('../functions/f-lb')
const { checkLogin } = require('../middleware/check-auth')

// const auth = ()

module.exports = {
    getSPTLB: (body, { token }) => {
        checkLogin(token, [0,2])
        return getSPTLB(body)
            .then(res => {
                console.log('Berhasil Mengambil Data SPT LB!')
                return res
            })
            .catch(err => {
                console.log('Gagal Mengambil Data SPT LB!')
                throw err
            })
    },
    getTotalSPTLB: () => {
        return getTotalSPTLB()
            .then(res => {
                console.log('Berhasil Mengambil Data SPT LB!')
                return res
            })
            .catch(err => {
                console.log('Gagal Mengambil Data SPT LB!')
                throw err
            })
    },
    addNDLB: args => {
        return addNDLB(args)
            .then(res => {
                console.log('Berhasil Menambah No. ND!')
                return res
            })
            .catch(err => {
                console.log('Gagal Menambah No. ND!')
                throw err
            })
    },
    deleteNDLB: ({ id }) => {
        return deleteNDLB(id)
            .then(res => {
                console.log('Berhasil Menghapus No. ND!')
                return res
            })
            .catch(err => {
                console.log('Gagal Menghapus No. ND!')
                throw err
            })
    },
}