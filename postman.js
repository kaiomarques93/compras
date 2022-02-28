const axios = require('axios');
const https = require('https');
const { resolve } = require('path');
const qs = require('qs');

const httpsAgent = new https.Agent({
    requestCert: false,
    rejectUnauthorized: false,
  });
  
axios.defaults.httpsAgent = httpsAgent;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const cookie = await verification2();
    console.log(cookie);
    config.httpsAgent['keepAlive'] = true;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //console.log(response.headers);
    return response;
    }, function (error) {
    return Promise.reject(error);
});


async function verification() {
    var config = {
        method: 'get',
        url: 'https://www.comprasnet.gov.br/main.asp',
        headers: { 
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"', 
          'Upgrade-Insecure-Requests': '1', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36', 
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'navigate', 
          'Sec-Fetch-Dest': 'frame', 
        }
      };
      
      await axios(config)
      .then(function (response) {
          //response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join(';');
          console.log(response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join(';'));
          console.log(JSON.stringify(response.headers));
      })
      .catch(function (error) {
        console.log(error);
      });
};

async function verification2() {
    var config = {
        method: 'get',
        url: 'https://www.comprasnet.gov.br/main.asp',
        headers: { 
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"', 
          'Upgrade-Insecure-Requests': '1', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36', 
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'navigate', 
          'Sec-Fetch-Dest': 'frame', 
        }
      };
      
    return new Promise (async (resolve, reject)  => {
        axios(config)
        .then(function (response) {
            resolve(response)
            //response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join(';');
            console.log(response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join(';'));
            console.log(JSON.stringify(response.headers));
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    //return axios(config);
};

async function login() {
    console.log('Let us get the first cookie');
    //const cookie =  verification();
    console.log('We got it\n');
    var data = qs.stringify({
        'envia': '1',
        'txtLogin': 'martinsalim',
        'txtSenha': 'Palomina02' 
      });
      var config = {
        method: 'post',
        url: 'https://www.comprasnet.gov.br/seguro/loginPortalFornecedor.asp',
        headers: { 
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"', 
          'Upgrade-Insecure-Requests': '1', 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36', 
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-Mode': 'navigate', 
          'Sec-Fetch-User': '?1', 
          'Sec-Fetch-Dest': 'document',
          //'Cookie': cookie
        },
        data : data
      };
      
     await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.headers));
      })
      .catch(function (error) {
        console.log(error);
      });

};

async function proposta() {

    var data = qs.stringify({
        'co_uasg': '986797',
        'dt_abertura': '',
        'dt_entrega': '',
        'numprp': '',
        'txtlstUasg': '',
        'uf': '' 
    });
    var config = {
        method: 'post',
        url: 'https://www.comprasnet.gov.br/pregao/fornec/proposta.asp',
        headers: { 
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"Windows"', 
        'Upgrade-Insecure-Requests': '1', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'frame'
        },
        data : data
        };

        await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};

login();