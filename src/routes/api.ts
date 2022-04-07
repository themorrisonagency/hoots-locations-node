const Geocodio = require('geocodio-library-node');
const geocoder = new Geocodio('20b2bcbe4be80bbb8662e6efe068effe6dee446');

import {Request, Response} from 'express'

module.exports = {
    geocode: async( req: Request, res: Response) => {
        try {
            const address = req.body
            console.log('address', address)
            const geo = await geocoder.geocode(`${address.line1} ${address.city} ${address.region} ${address.postalCode}`)
            res.json(geo.results[0].location)
        } catch(e){
            console.log('error', e)
        }
    }
}