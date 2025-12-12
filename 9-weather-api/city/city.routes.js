import { Router } from 'express'
import { formatWeatherReport } from '../helper/formatReport.js'
import { getIcon, getWeather } from '../services/api.service.js'
import { printWeather } from '../services/log.service.js'

const router = Router()

router.route('/weather').get(async (req, res) => {
	const { city } = req.data
	if (!city) {
		return res.status(400).json({ message: 'Укажите город' })
	}
	const data = await getWeather(city)
	const weather = {
		description: formatWeatherReport(data)
	}
	res.json(weather)
})

export default router
