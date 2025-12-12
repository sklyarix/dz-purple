import axios from 'axios'
import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getIcon = icon => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️'
		case '02':
			return '🌤️'
		case '03':
			return '☁️'
		case '04':
			return '☁️'
		case '09':
			return '🌧️'
		case '10':
			return '🌦️'
		case '13':
			return '❄️'
		case '50':
			return '🌫️'
	}
}

const getWeather = async city => {
	//const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

	const token = await getKeyValue(TOKEN_DICTIONARY.token)

	if (!token) {
		throw new Error('No token provided')
	}

	const { data } = await axios.get(
		'https://api.openweathermap.org/data/2.5/weather',
		{
			params: {
				q: city,
				appid: token,
				lang: 'ru',
				units: 'metric'
			}
		}
	)
	return data

	/* Мамонт версия */
	/*
	const url = new URL('https://api.openweathermap.org/data/2.5/weather')
	url.searchParams.set('q', city)
	url.searchParams.set('appid', token)
	url.searchParams.set('lang', 'ru')
	url.searchParams.set('units', 'metrics')

	https.get(url, response => {
		let res = ''

		response.on('data', chunk => {
			res += chunk
		})

		response.on('end', () => {
			console.log(res)
		})

		response.on('error', err => {
			console.log(err)
		})
	})
	*/
}

export { getWeather, getIcon }
