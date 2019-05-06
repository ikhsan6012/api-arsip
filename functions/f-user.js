const UserModel = require('../models/m-user')
const bcrypt = require('bcrypt')

const getUser = args => {
	return new Promise((resolve, reject) => {
		return UserModel.findOne({ username: args.username })
			.then(res => {
				if(bcrypt.compareSync(args.password, res.password)){
					const token = Math.random().toString(36).substr(2)
					res.token = token
					res.save()
					resolve({ ...res._doc, token })
				}else{
					throw new Error()
				}
			})
			.catch(err => reject("Username atau Password Salah!"))
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