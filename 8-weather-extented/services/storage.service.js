import { homedir } from 'os'
import { join, basename, dirname, extname } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
	token: 'token',
	cities: 'cities',
	lang: 'lang'
}

const saveKeyValue = async (key, value) => {
	let data = {}
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath)
		data = JSON.parse(file)
	}
	if (key === 'cities') {
		if (!data.cities) data.cities = []
		await addCity(value, data.cities)
	} else {
		data[key] = value
	}
	await promises.writeFile(filePath, JSON.stringify(data))
}

const addCity = async (newCity, cities) => {
	if (cities.includes(newCity)) {
		throw new Error('Такой город уже добавлен')
	}
	cities.push(newCity)
}

const getKeyValue = async key => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath)
		const data = JSON.parse(file)
		return data[key]
	}
	return undefined
}

const isExist = async path => {
	try {
		await promises.stat(filePath)
		return true
	} catch (e) {
		return false
	}
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
