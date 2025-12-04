#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import {
	printError,
	printHelp,
	printSuccess,
	printWeather
} from './services/log.service.js'
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY
} from './services/storage.service.js'

const saveToken = async token => {
	if (!token.length) {
		return printError('Нет токена')
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Токен сохранен.')
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async city => {
	if (!city.length) {
		return printError('Не добавлен город.')
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.cities, city)
		printSuccess('Город сохранен.')
	} catch (e) {
		printError(e.message)
	}
}

const saveLanguage = async lang => {
	if (!lang.length) {
		return printError('Не добавлен язык.')
	}
	if (lang !== 'en' && lang !== 'ru') {
		return printError('для изменения языка (en или ru)')
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.lang, lang)
		printSuccess('Язык изменен.')
	} catch (e) {
		printError(e.message)
	}
}

const getForcast = async () => {
	try {
		const cities = await getKeyValue(TOKEN_DICTIONARY.cities)
		for (const city of cities) {
			const data = await getWeather(city)
			await printWeather(data, getIcon(data.weather[0].icon))
		}
	} catch (e) {
		if (e.response.status === 404) {
			printError('Город указан неверно.')
		} else if (e.response.status === 401) {
			printError('Токен указан неправильно.')
		} else {
			printError(e.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)

	if (args.h) {
		// help
		return printHelp()
	}

	if (args.s) {
		// добавить город
		return saveCity(args.s)
	}

	if (args.t) {
		// сохранить токен
		return saveToken(args.t)
	}

	if (args.l) {
		// сохранить язык
		return saveLanguage(args.l)
	}
	// Вывести погоду
	return getForcast()
}
initCLI()

// Добавить возможность хранения нескольких городов
// Сделать настройку языка и отображать результат на русском и английском в зависимости от настройки
