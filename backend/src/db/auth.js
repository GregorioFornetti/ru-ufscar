
import { password } from "../configs/index.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function checkAuthentication(req, res, next){
   if (req.session.password === password) {
      next()
   } else {
      return res.status(401).json({'message': 'You need authentication'})
   }
 }