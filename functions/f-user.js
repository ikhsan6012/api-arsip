const UserModel = require('../models/m-user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = args => {
	return new Promise((resolve, reject) => {
		return UserModel.findOne({ username: args.username })
			.then(res => {
				const match = bcrypt.compareSync(args.password, res.password)
				if(match){
					const token = jwt.sign(
						{ _id: res.id, username: res.username, nama: res.nama, status: res.status }, 
						process.env.SECRET_KEY,
						{ expiresIn: '1h' }
					)
					resolve({ ...res._doc, token })
				}
				reject(new Error("Username atau Password Salah..."))
			})
			.catch(err => reject(new Error("Username atau Password Salah...")))
	})
}

const addUser = input => {
	return new Promise((resolve, reject) => {
		const User = new UserModel({
			...input,
			password: bcrypt.hashSync(input.password, 10)
		})
		return User.save()
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

module.exports = { getUser, addUser }