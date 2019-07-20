const { resumeRekam, detailsResume } = require('../functions/f-perekaman')

module.exports = {
	resumeRekam: (root, args) => {
		return resumeRekam(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
	detailsResume: (root, args) => {
		return detailsResume(root)
			.then(res => {
				return res
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}