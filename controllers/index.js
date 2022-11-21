const router = require('express').Router();

const apiRoutes = require('./api');
// case sensitive
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

router.get('*', (req, res) => {
  res.redirect('/404');
});
