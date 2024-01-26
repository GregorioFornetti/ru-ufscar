
import { adminPath } from '../configs/index.js'


export function login(req, res) {
    req.session.regenerate(function (err) {
        if (err) next(err)
        
        req.session.password = req.body.password
    
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect(adminPath)
        })
    })
}

export function logout(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.")
    })
    res.redirect(`${adminPath}/auth.html`)
}