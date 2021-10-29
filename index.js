/*Server basics*/
const express = require('express');
const routerApi = require('./routes');
/*Middlewares*/
const { logErrors, errorHandler, boomErrorHandler, queryErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
app.use(passport.initialize({ session: false }));

app.use(express.json());


app.get('/', checkApiKey, (req, res) => {
    res.send('<h1 style="text-align: center;font-family: Roboto sans-serif;">Hello Everybody (:</h1>');
});
/*Routes config*/

routerApi(app);

require("./utils/auth");
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