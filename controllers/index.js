const router = require('express').Router();
const dashRoutes = require('./dashRoutes.js')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use("/dashboard", dashRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>");
});


module.exports = router;
