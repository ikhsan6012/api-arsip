const UserModel = require('../models/m-user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = root => {
	root.nama ? root.nama = new RegExp(root.nama, 'i') : null
	return UserModel.find(root)
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...') 
		})
}

const user = ({ username, password }) => {
	return UserModel.findOne({ username })
		.then(res => {
			if(!res) return res
			const match = bcrypt.compareSync(password, res.password)
			if(!match) return null
			const token = jwt.sign({ _id: res.id, nama: res.nama, username: res.username, status: res.status }, process.env.SECRET_KEY, { expiresIn: '1h' })
			res.token = token
			return res
		})
		.catch(err => {
			console.log(err)
			throw Error('Terjadi Masalah Pada Server...') 
		})
}

const totalUsers = root => {
	root.nama ? root.nama = new RegExp(root.nama, 'i') : null
	return UserModel.countDocuments(root)
		.catch(err => {
			console.log(err)
			throw err
		})
}

const addUser = input => {
	input.password = bcrypt.hashSync(input.password, 10)
	const User = new UserModel(input)
	return User.save()
		.catch(err => {
			if(err.code === 11000) throw Error('Username Telah Digunakan...')
			if(err.name === 'ValidationError') throw Error('Data Tidak Lengkap...')
			throw Error('Terjadi Masalah Pada Server...')
		})
}

const changePassword = async ({ username, password_lama, password_baru }) => {
	const user = await UserModel.findOne({ username })
	const isMatch = bcrypt.compareSync(password_lama, user.password)
	if(!isMatch) throw Error('Password Lama Tidak Cocok...')
	return UserModel.findByIdAndUpdate(user.id, { password: bcrypt.hashSync(password_baru, 10) })
}

module.exports = { users, user, totalUsers, addUser, changePassword }