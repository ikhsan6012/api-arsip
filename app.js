const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const LBModel = require('./models/m-lb')
const { verifyToken } = require('./middleware/check-auth')

require('dotenv').config()
const app = express()

// Resolver
const rootValue = require('./resolvers')

// Types
const schema = buildSchema(`
	${require('./types')}
`)

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

// GraphQL Middleware
app.use('/graphql', verifyToken, graphqlHTTP({
	schema,
	rootValue,
	graphiql: true,
}))

// Get Lampiran
app.get('/lampiran/:link', (req, res) => {
	const link = '/uploads/' + req.params.link
	fs.readFile(__dirname + link, (err, data) => {
		if(err) {
			console.log(err)
			return res.status(404).json({ message: 'File Tidak Ditemukan' })
		}
		res.contentType('application/pdf')
		res.send(data)
	})
})

// Upload Lampiran
app.post('/upload', (req, res) => {
	const file = req.files.file
	const npwp = req.body.npwp.replace(/[-.]/g, '')
	const mime = file.name.split('.')[1]
	const filename = new Date().toISOString() + '_' + npwp + '.' + mime
	fs.writeFileSync(`./uploads/${filename}`, req.files.file.data)
	res.status(200).json({ file: filename })
})

// Import LB
app.post('/importlb', (req, res) => {
	const file = req.files.file
	const lb = JSON.parse(Buffer.from(file.data).toString())
	let isValid = true
	let customMsg = ''
	let title = "File JSON Tidak Valid..."
	if(!lb.length){
		return res.json({ ok: false, message: "File JSON Tidak Valid..." })
	}
	const update = lb.map(l => {
		if(!l.npwp) {
			isValid = false
			customMsg = "NPWP"
			return false
		}else if(!l.no_tt){
			isValid = false
			customMsg = "No. Tanda Terima"
			return false
		}else if(!l.tgl_spt){
			isValid = false
			customMsg = "Tanggal SPT"
			return false
		}else if(!l.nilai){
			isValid = false
			customMsg = "Nilai LB"
			return false
		}else if(!l.masa_tahun){
			isValid = false
			customMsg = "Masa/Tahun Pajak"
			return false
		}else if(l.masa_tahun.length === 2){
			isValid = false
			title = "Kemungkinan Data yang Diimport Merupakan SPT WP yang Menggunakan Mata Uang Asing."
			customMsg = 1
			return false
		}else if(!l.res_kom){
			isValid = false
			customMsg = "Status"
			return false
		}else if(!l.sumber){
			isValid = false
			customMsg = "Sumber"
			return false
		}else if(!l.tgl_terima){
			isValid = false
			customMsg = "Tanggal Terima"
			return false
		}else{
			const npwp1 = l.npwp.split('-')[0]
			const npwp2 = l.npwp.split('-').filter((n, i) => i > 0).join('.')
			const npwp = `${npwp1}-${npwp2}`
			return {
				updateOne: {
					filter: { no_tt: l.no_tt },
					update: { ...l, npwp },
					upsert: true
				}
			}
		}
	})
	let message = customMsg !== 1 ? `Terdapat Data yang Tidak Memiliki ${customMsg}...` : "Jika Benar Perbaiki Masa/Tahun Pajak dan Seterusnya!!!"
	if(!isValid){
		res.json({ ok: false, title, message })
	}else{
		LBModel.bulkWrite(update)
			.then(({ upsertedCount }) => {
				res.json({ ok: true, upsertedCount, total: lb.length })
			})
	}
})

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/arsip', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true
})
	.then(() => {
		console.log('database connected')
		app.listen(3001, () => console.log('Server running on port 3001'))
	})
	.catch(err => {
		console.error(err)
	})