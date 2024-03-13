const { execSync } = require('child_process');
const fs = require('fs')
const path = require('path')

class WatertoolsService{
	constructor(){
	}

	static async createToken(rawData){
		try{
			let {name, symbol, description, totalSupply, decimals, logoUrl} = rawData;
			if(name==undefined || name=='') throw new Error('Invalid Name')
			if(symbol==undefined || symbol=='') throw new Error('Invalid Symbol')
			if(description==undefined) description = ''
			if(decimals==undefined || isNaN(decimals) || decimals!=Math.floor(decimals) || decimals<0) throw new Error('Invalid Decimals')
			if(logoUrl==undefined) logoUrl=''
			if(totalSupply==undefined || isNaN(totalSupply) || totalSupply!=Math.floor(totalSupply) || totalSupply<0) throw new Error('Invalid Total Supply')

			const baseFolderPath = 'src/database/tokens'
			const folderPath = path.join(baseFolderPath, name)
			const sourceFolderPath = path.join(folderPath, 'sources')
			const moveFilePath = path.join(sourceFolderPath, `${name}.move`)
			const tomlFilePath = path.join(folderPath, 'Move.toml')
			const templateMovePath = 'src/templates/managed.move'
			const templateTomlPath = 'src/templates/Move.toml'
			if(!fs.existsSync(sourceFolderPath)){
				fs.mkdirSync(sourceFolderPath, {recursive: true})
			}
			let templateMoveFile = fs.readFileSync(templateMovePath, 'utf8')
			let templateTomlFile = fs.readFileSync(templateTomlPath, 'utf8')
			const replacements = {
				'managed': name,
				'decimals': Number(decimals),
				'symbol': symbol,
				'name': name,
				'description': description,
				'logo_url': logoUrl,
				'TotalSupply': Number(totalSupply),
				'MANAGED': name.toUpperCase()
			}
			for(const [target, replacement] of Object.entries(replacements)){
				templateMoveFile = templateMoveFile.replaceAll(target, replacement)
			}
			fs.writeFileSync(moveFilePath, templateMoveFile)
			templateTomlFile = templateTomlFile.replaceAll('managed', name)
			fs.writeFileSync(tomlFilePath, templateTomlFile)
			let {modules, dependencies} = JSON.parse(execSync(`sui move build --dump-bytecode-as-base64 --path "${__dirname+"/../../"+folderPath}"`), {encoding: 'utf-8'})
			return {response: true, message: "Success!", modules, dependencies}
		}catch(err){
			console.log(err)
			return {response: false, message: err.message}
		}
	}
}

module.exports = WatertoolsService