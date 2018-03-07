var express = require('express');
var router = express.Router();

router.get('/sends/:user_id?', (req, res) => {
    res.send("Parameter: " + req.params.user_id);
});

module.exports = router;
