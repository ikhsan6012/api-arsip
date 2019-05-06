const PenerimaModel = require('../models/m-penerima')

const getPenerimas = input => {
	return new Promise((resolve, reject) => {
		return PenerimaModel.find(input)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const checkPenerima = input => {
	return new Promise((resolve, reject) => {
		return PenerimaModel.findOne(input)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const checkPenerimaById = id => {
	return new Promise((resolve, reject) => {
		return PenerimaModel.findById(id)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

const addPenerima = input => {
	return new Promise((resolve, reject) => {
		const Penerima = new PenerimaModel(input)
		return Penerima.save()
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

module.exports = { getPenerimas, checkPenerima, checkPenerimaById, addPenerima }