const path = require('path');
const router = require('express').Router();

router.get("/images/:imageName", function sendImage(req, res) {
    res.sendFile(path.resolve(path.join(__dirname, '..', 'uploads', req.params.imageName)));
});

module.exports = router