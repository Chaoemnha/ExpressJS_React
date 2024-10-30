const userRouter = require('./user');

function route(app){
    app.use('/user', userRouter);
    app.use('/', (req, res) => {
        res.render('home/home');
    })
}

module.exports = route;