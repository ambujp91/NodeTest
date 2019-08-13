const http = require('http');
const { parse } = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
  var urlpath = url.parse(req.url).pathname;
  switch(urlpath)
  {
    case '/Register':
        collectRequestData(req, result => {
        res.write(`First Name is ${result.fname} \n`);
        res.write(`Last Name is ${result.lname} \n`);
        res.write(`Gender is ${result.gender} \n`);
        res.write(`Address is ${result.address} \n`);
        res.write(`City is ${result.city} \n`);
        res.write(`Mobile Number is ${result.mobile} \n`);
        res.write(`Email address is ${result.email} \n`);
        res.end();
    });break;

    case '/Login':
        collectRequestData(req, result => {
        if(`${result.uname}` === 'ambuj' && `${result.pwd}` === '123456')
        {
        res.write(`${result.uname} has successfully logged in \n`);
        res.end();
        }
        else
        {
            res.write(`Invalid credentials`);
            res.end();
        }
    });break;

    default:
      res.write("Hello");

  }
  /*  if (req.method === 'POST') {
        collectRequestData(req, result => {
            res.write(`First Name is ${result.fname} \n`);
            res.write(`Last Name is ${result.lname} \n`);
            res.write(`Gender is ${result.gender} \n`);
            res.write(`Address is ${result.address} \n`);
            res.write(`City is ${result.city} \n`);
            res.write(`Mobile Number is ${result.mobile} \n`);
            res.write(`Email address is ${result.email} \n`);
            res.end();
        });
    }
  /*  else if (req.method === 'POST')
    {
      collectRequestData(req, result => {
          if(`${result.uname}` === 'ambuj' && `${result.pwd}` === '1234')
          {
          res.write(`${result.uname} has successfully logged in \n`);
          res.end();
          }
          else
          {
              res.write(`Invalid credentials`);
              res.end();
          }
      });
    }
    else {
      res.end();
    }*/
});
server.listen(1234);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
