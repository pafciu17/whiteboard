/**
 * Created by pawel on 12/20/13.
 */
express = require('express.io');
Route = require('./route');

app = express();
app.http().io();

Route(app);
app.listen(38001);