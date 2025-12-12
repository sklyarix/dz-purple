import { Router } from 'express'
import { formatWeatherReport } from '../helper/formatReport.js'
import { getIcon, getWeather } from '../services/api.service.js'

const router = Router()

router.route('/weather').get(async (req, res) => {
	const { city } = req.body
	if (!city) {
		return res.status(400).json({ message: 'Укажите город' })
	}
	try {
		const data = await getWeather(city)
		const weather = {
			description: formatWeatherReport(data)
		}
		res.json(weather)
	} catch (e) {
		console.error(e)
	}
})

export default router
