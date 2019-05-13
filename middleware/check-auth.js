const jwt = require('jsonwebtoken')

module.exports = {
	verifyToken: (req, res, next) => {
		const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
		if(!token) return next()
		const data = jwt.verify(token, process.env.SECRET_KEY)
		const newToken = jwt.sign({
			_id: data._id,
			username: data.username,
			nama: data.nama,
			status: data.status
		}, process.env.SECRET_KEY, { expiresIn: '1h' })
		req.token = data
		res.setHeader('token', newToken)
		next()
	},
	checkLogin: (token, status) => {
		if(!token) throw new Error("Anda Belum Login...")
		if(status.indexOf(token.status) < 0) throw new Error("Anda Tidak Memiliki Akses...")
		return
	}
}