const express = require("express");

const router = express.Router();

router.post('/artData', (req, res) => {
    try {
        
        res.send([global.articles,global.paintingCategory])
    } catch(error) {
        console.error(error.message);
        res.send("Server Error");
    }
})

module.exports = router;
