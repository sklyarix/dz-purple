import chalk from 'chalk'
import dedent from 'dedent-js'
import { getIcon } from '../services/api.service.js'

const formatWeatherReport = res => {
	const icon = getIcon(res.weather[0].icon)
	return dedent`${chalk.bgBlue(' WEATHER: ')}
		Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
}

export { formatWeatherReport }
