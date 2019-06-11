const { wps, wp, totalWPs, lastUpdateWPs } = require('../functions/f-wp2')

module.exports = {
	wps: (root, args) => {
		return wps(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	wp: (root, args) => {
		return wp(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
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