/*Server basics*/
const config = require("./config/index");
const express = require('express');
const routerApi = require('./routes');
/*Middlewares*/
const {logErrors, errorHandler, boomErrorHandler, queryErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = config.server.port;
app.use(express.json());


app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center;font-family: Roboto sans-serif;">Hello Everybody (:</h1>');
});
/*Routes config*/

routerApi(app);


/*Middlewares Config */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(queryErrorHandler);


/*Serve*/
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running in port ${port}`);
});
