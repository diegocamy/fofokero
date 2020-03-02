const fs = require('fs');
const puppeteer = require('puppeteer');

const url = 'http://facebook.com';

async function obtenerInfo(url2, page, usuario) {
  await page.goto(url2, {
    waitUntil: 'networkidle2',
    timeout: 3000000
  });
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);
  await page.evaluate(() => window.scrollBy(0, 2500));
  await page.waitFor(3000);

  const data = await page.evaluate(() => {
    const noticias = Array.from(
      document.querySelectorAll('div._1dwg._1w_m._q7o')
    );

    const datos = [];

    noticias.forEach(noticia => {
      let noti = {};
      let imagen;
      let tiempo = noticia.querySelector(
        'div:nth-child(2) > div> div > div >div >div >div > div > div._5pcp._5lel._2jyu._232_'
      );

      tiempo
        ? (tiempo = tiempo.innerText
            .split(' ')
            .slice(0, 2)
            .join(' '))
        : null;

      let titulo = noticia.querySelector(
        'div:nth-child(2) > div._5pbx.userContent._3576'
      );

      titulo
        ? (titulo = titulo.innerText
            .replace('Ver traducción', '')
            .replace('Ver más', '')
            .trim())
        : null;

      if (noticia.innerHTML.includes('_2a2q _65sr')) {
        imagen = noticia.querySelector(
          'div:nth-child(2) > div._3x-2 > div > div > div > a img'
        );
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      } else if (noticia.innerHTML.includes('_6ks')) {
        imagen = noticia.querySelector(
          'div:nth-child(2) > div._3x-2 > div > div > div > div > div.lfloat._ohe > span > div > div > a > div > div > img'
        );
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      } else if (noticia.innerHTML.includes('lfloat _ohe')) {
        imagen = noticia.querySelector(
          'div:nth-child(2) > div._3x-2 > div > div > div > div > div.lfloat._ohe > span > div > img'
        );
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      } else if (noticia.innerHTML.includes('_4-eo _2t9n _50z9')) {
        imagen = noticia.querySelector('div:nth-child(2) > div._3x-2 img');
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      } else if (noticia.innerHTML.includes('_5cq3 _1ktf')) {
        imagen = noticia.querySelector('div:nth-child(2) > div._3x-2 img');
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      } else if (noticia.innerHTML.includes('_1ktf')) {
        imagen = noticia.querySelector('div:nth-child(2) > div._3x-2 img');
        imagen ? (imagen = imagen.getAttribute('src')) : null;
      }

      noti.tiempo = tiempo;
      noti.titulo = titulo;
      noti.imagen = imagen;
      datos.push(noti);
    });

    return datos;
  });

  const nuevaData = data.map(e => {
    let obj = { ...e, periodista: usuario, link: url2 };
    return obj;
  });

  return nuevaData;
}

// {
//   headless: false,
//   args: ['--disable-notifications']
// }

async function run() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);

  //LOGIN
  const [correo] = await page.$x('//*[@id="email"]');
  const [password] = await page.$x('//*[@id="pass"]');

  await correo.type('diegocamy23@gmail.com');
  await password.type('fofokerofofokero2020');

  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  //Obtener publicaciones de la pagina deseada
  const marcio = await obtenerInfo(
    'https://www.facebook.com/marcio.silva.1272',
    page,
    'Marcio Silva'
  );
  const sentinela = await obtenerInfo(
    'https://www.facebook.com/sentinela24h/posts',
    page,
    'Sentinela 24H'
  );
  const plateia = await obtenerInfo(
    'https://www.facebook.com/aplateia/posts',
    page,
    'Jornal A Plateia'
  );
  const riveraMiCiudad = await obtenerInfo(
    'https://www.facebook.com/pg/RiveraCiudad/posts/',
    page,
    'Jornal A Plateia'
  );

  fs.writeFileSync(
    'noticias.js',
    JSON.stringify([...marcio, ...sentinela, ...plateia, ...riveraMiCiudad])
  );
  browser.close();
}

run();
