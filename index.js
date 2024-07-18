require('dotenv').config();
var express = require('express');
var app = express();

//usando o cors, que é um pacote que permite que qualquer domínio acesse a API
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

//fazendo o app usar o arquivo style.css
app.use(express.static('public'));

//fazendo o app usar o arquivo index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res, next) {
  const ipaddress = req.headers['x-forwarded-for'] || req.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({
    'ipaddress': ipaddress,
    'language': language,
    'software' : software
  });
  next();
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});