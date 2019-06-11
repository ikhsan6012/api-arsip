const { lbs, addNDLB, deleteNDLB, addTujuanLB, deleteTujuanLB } = require('../functions/f-lb2')

module.exports = {
	lbs: (root, args) => {
		return lbs(root)
	},
	addNDLB: (root, args) => {
		return addNDLB(root)
	},
	deleteNDLB: (root, args) => {
		return deleteNDLB(root)
	},
	addTujuanLB: (root, args) => {
		return addTujuanLB(root)
	},
	deleteTujuanLB: (root, args) => {
		return deleteTujuanLB(root)
	}
}