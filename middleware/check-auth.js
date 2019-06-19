const jwt = require('jsonwebtoken')

module.exports = {
	verifyToken: (req, res, next) => {
		const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
		if(!token) {
			req.token = {}
			return next()
		}
		let data
		const verify = () => {
			data = jwt.verify(token, process.env.SECRET_KEY)
		}
		try {
			verify()
		}catch(err){
			return res.status(401).json({ errors: {
				name: 'SessionError',
				message: 'Session Telah Berakhir!' 
			}})
		}
		const newToken = jwt.sign({
			_id: data._id,
			username: data.username,
			nama: data.nama,
			status: data.status
		}, process.env.SECRET_KEY, { expiresIn: '1h' })
		req.token = {
			token: newToken,
			data
		}
		next()
	},
	checkLogin: (args, status = []) => {
		const token = args.token.data
		if(!token) throw new Error("Anda Belum Login...")
		if([...status,0].indexOf(token.status) < 0) throw new Error("Anda Tidak Memiliki Akses...")
		return
	}
}