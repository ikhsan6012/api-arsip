const LBModel = require('../models/m-lb')
const WPModel = require('../models/m-wp')

const getSPTLB = () => {
    return new Promise((resolve, reject) => {
        return LBModel.find()
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

module.exports = { getSPTLB }