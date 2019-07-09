const { users, user, totalUsers, addUser, changePassword } = require('../functions/f-user')
const { checkLogin } = require('../middleware/check-auth')

module.exports = {
	// Query
	users: (root, args) => {
		checkLogin(args)
		return users(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	user: (root, args) => {
		return user(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	totalUsers: (root, args) => {
		checkLogin(args)
		return totalUsers(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	// Mutation
	addUser: (root, args) => {
		// checkLogin(args)
		return addUser(root.input)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	changePassword: (root, args) => {
		return changePassword(root)
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	}
}