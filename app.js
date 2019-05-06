const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const request = require('request')
const proxy = require('http-proxy').createProxyServer({})

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
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
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