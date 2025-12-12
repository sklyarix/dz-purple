import express from 'express'
import cityRoutes from './city/city.routes.js'

const app = express()

const main = async () => {
	const port = process.env.PORT || 3000

	app.use(express.json())
	app.use('/api/city', cityRoutes)

	app.listen(port, () => {
		console.log('Сервер запустился')
	})
}

main()
	.then(async () => {})
	.catch(async e => {
		console.error(e)
		process.exit(1)
	})
