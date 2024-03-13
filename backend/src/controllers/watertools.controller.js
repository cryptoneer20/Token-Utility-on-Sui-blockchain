const WatertoolsService = require("../services/watertools.service")

class WatertoolsController {
	createToken = async(req, res, next) => {
        try{
            const result = await WatertoolsService.createToken(req.body)
            res.send(result)
        }catch(err){
            next(err)
        }
    }
}

module.exports = new WatertoolsController