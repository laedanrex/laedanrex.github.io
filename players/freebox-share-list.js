const http = require('http');

var htmlReceived;

function saveHtml(res, callback) {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    htmlReceived = Buffer.concat(data).toString();
    console.log('htmlReceived setted');
    callback(htmlReceived)
  });
}

function extractDataFromLines(html) {
  console.log('start extractDataFromLines');
  console.log(html);
  let data = [];
  html.split('\n').forEach(line => {
      if (!line.startsWith('              <td><a href="')) {
        return;
      }
      console.log(line)
      const found = line.match('              <td><a href="([^<]*)">[^<]*</a></td>')
      if (found) {
        console.log(found[1])
      }
    }
  )
}

function afterPageRetrieved(res) {
  const html = saveHtml(res, extractDataFromLines)
}

http.get('http://88.170.27.234:47360/share/TCF-S-bGSfa-dZjq/', res => afterPageRetrieved(res))
  .on('error', err => {
    console.log('Error: ', err.message);
  });