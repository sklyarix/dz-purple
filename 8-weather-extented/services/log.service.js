import chalk from 'chalk'
import dedent from 'dedent-js'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const printError = error => {
	console.error(chalk.bgRed(' Error: ') + ' ' + error)
}

const printSuccess = message => {
	console.log(chalk.bgGreen(' Success: ') + ' ' + message)
}

const printHelp = () => {
	console.log(
		dedent`${chalk.bgYellow(' Help: ')}
		Без параметров - вывод погоды
		-s [CITY] для добавления города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		-l [lang] для изменения языка (en или ru)
		`
	)
}

const printWeather = async (res, icon) => {
	try {
		const lang = await getKeyValue(TOKEN_DICTIONARY.lang)
		switch (lang) {
			case 'ru':
				return console.log(
					dedent`${chalk.bgBlue(' WEATHER: ')}
				Погода в городе ${res.name}
				${icon} ${res.weather[0].description}
				Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
				Влажность: ${res.main.humidity}%
				Скорость ветра: ${res.wind.speed}
				`
				)
			default:
				return console.log(
					dedent`${chalk.bgBlue(' WEATHER: ')}
		    Weather in the city ${res.name}
		    ${icon} ${res.weather[0].description}
		    Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		    Humidity: ${res.main.humidity}%
		    Wind speed: ${res.wind.speed}
		    `
				)
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

export { printError, printSuccess, printHelp, printWeather }
