const routes = require('express').Router();
const userRoutes = require('./api/userRoutes');
const alertRoutes = require('./api/alertRoutes');
const commentRoutes = require('./api/commentRoutes')
const homeRoutes = require('./homeRoutes')

routes.use('/', homeRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/alert', alertRoutes)
// routes.use('/comments', commentRoutes)

module.exports = routes;