
import express from 'express';
var router = express.Router();

router.get("/myIdentity", async (req, res, next) => {
    try {
        if (req.session.isAuthenticated) {
            res.json({
                "status": "loggedin", 
                userInfo: {
                   name: req.session.account.name, 
                   username: req.session.account.username
                }
            })
        } else {
            res.json({"status": "loggedout"})
        }
    } catch(error) {
        console.log("error: ", error)
        res.status(500).json({"status": "error"})
    }
    
});

export default router;