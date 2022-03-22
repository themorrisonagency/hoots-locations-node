import axios from "axios"
import { Request, Response } from "express"
import CreateOrUpdateLocation from "../utils/CreateOrUpdateLocation"
import {Location} from '../entities/Location'
const formidable = require('formidable');
var fs = require('fs');
module.exports = {
  upload: async (req: Request, res: Response) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        // next(err);
        return;
      }
      console.log('fields and files')
      res.json({ fields, files });
    });
  }
}
