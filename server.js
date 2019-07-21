require('dotenv/config');
const express 	  = require('express');
const app		      = express();
const port 		    = process.env.PORT || 3000;
const bodyParser  = require('body-parser');
const routes 	    = require('./routes');
const cors	      = require('cors');

// CORS
const whitelist = ['http://192.168.100.78', 'http://192.168.100.24', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 ) { 
        callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// app.use(cors(corsOptions));
app.use(cors());


app.use(
	bodyParser.urlencoded({
		extended:true,
	})
);
app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log('Server Runing '+port);