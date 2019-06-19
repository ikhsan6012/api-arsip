const LBModel = require('../models/m-lb.js')

const lbs = root => {
	const sort = {}
	const filter = {}
	root.filter ? root.filter.forEach(f => {
		let regex = f.value
		if(f.filterBy === 'nd') return filter['$or'] = [{ no_nd: new RegExp(regex, 'i') }, { tahun_nd: regex }]
		if(f.filterBy === 'npwp') regex = '^'+f.value
		return filter[f.filterBy] = new RegExp(regex, 'i')
	}) : null
	root.sort ? root.sort.forEach(s => {
		return sort[s.sortBy] = s.desc ? -1 : 1
	}) : null
	return LBModel.find(filter).skip(root.skip || 0).limit(root.limit || 10).sort({ ...sort, time_tgl_terima: -1 })
		.catch(err => {
			console.log(err)
			throw err
		})
}

const addNDLB = root => {
	return LBModel.findByIdAndUpdate(root.id, { no_nd: root.no_nd, tahun_nd: root.tahun_nd }, { new: true })
		.catch(err => {
			console.log(err)
			throw err
		})
}

const deleteNDLB = root => {
	return LBModel.findByIdAndUpdate(root.id, { no_nd: null, tahun_nd: null }, { new: true })
		.catch(err => {
			console.log(err)
			throw err
		})
}

const addTujuanLB = root => {
	return LBModel.findByIdAndUpdate(root.id, { $push: { tujuan_nd: root.tujuan_nd } }, { new: true })
		.catch(err => {
			console.log(err)
			throw err
		})
}

const deleteTujuanLB = root => {
	return LBModel.findByIdAndUpdate(root.id, { $pull: { tujuan_nd: root.tujuan_nd } }, { new: true })
		.catch(err => {
			console.log(err)
			throw err
		})
}

module.exports = { lbs, addNDLB, deleteNDLB, addTujuanLB, deleteTujuanLB }