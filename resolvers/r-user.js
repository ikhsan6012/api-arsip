const { addUser, getUser } = require('../functions/f-user')

module.exports = {
	getUser: args => {
		return getUser(args)
			.then(res => {
				console.log('Berhasil Mengambil Data User!')
				return(res)
			})
			.catch(err => {
				console.log('Gagal Mengambil Data User!')
				throw(err)
			})
	},
	addUser: ({input}) => {
		return addUser(input)
			.then(res => {
				console.log('Berhasil Menambah User!')
				return res
			})
			.catch(err => {
				console.log('Gagal Menanmbah User!')
				throw err
			})
	}
}