const { totalWPs, lastUpdateWPs } = require('../functions/f-wp2')

module.exports = {
	totalWPs: (root, args) => {
		return totalWPs(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	lastUpdateWPs: (root, args) => {
		return lastUpdateWPs()
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	}
}