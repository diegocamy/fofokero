const fs = require('fs');
const puppeteer = require('puppeteer');

async function obtenerInfo(url, page) {
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 3000000
  });

  //hace scroll en la pagina para cargar mas posts en el feed
  await page.evaluate(() => window.scrollBy(0, 5000));
  await page.waitFor(1500);
  await page.evaluate(() => window.scrollBy(0, 5000));
  await page.waitFor(1500);

  //obtiene la foto de perfil ya sea de una pagina o usuario normal
  let fotoPerfil = await page.evaluate(() => {
    let selector1 = document.querySelector('._1nv3 img');
    let selector2 = document.querySelector('._6tay img');

    selector1 ? (selector1 = selector1.getAttribute('src')) : null;
    selector2 ? (selector2 = selector2.getAttribute('src')) : null;

    return selector1 ? selector1 : selector2;
  });

  //obtiene el nombre de usuario del perfil o la pagina
  let nombreUsuario = await page.evaluate(() => {
    let selector1 = document.querySelector('._64-f');
    let selector2 = document.querySelector('._2nlw._2nlv');

    selector1 ? (selector1 = selector1.textContent) : null;
    selector2 ? (selector2 = selector2.textContent) : null;

    return selector1 ? selector1 : selector2;
  });

  //seleccion de datos
  const data = await page.evaluate(() => {
    //selecciona todos los posts y los pone en un array
    const noticias = Array.from(
      document.querySelectorAll('div._1dwg._1w_m._q7o')
    );

    console.log(noticias);

    const datos = [];

    //por cada post en el array extrae la fecha de publicacion,
    // la info del post, el enlace directo y la foto. Luego los mete en un array llamado datos
    noticias.forEach(noticia => {
      let noti = {};

      let timestamp = noticia.querySelector('.timestampContent');
      timestamp ? (timestamp = timestamp.textContent) : null;

      let titulo = noticia.querySelector(
        'div:nth-child(2) > div._5pbx.userContent._3576'
      );
      titulo
        ? (titulo = titulo.innerText
            .replace('Ver traducción', '')
            .replace('Ver más', '')
            .trim())
        : null;

      let imagen = noticia.querySelector('div:nth-child(2) > div._3x-2 img');
      imagen ? (imagen = imagen.getAttribute('src')) : null;

      let enlace = noticia.querySelectorAll('a')[
        noticia.querySelectorAll('a').length - 1
      ];
      enlace ? (enlace = enlace.getAttribute('href')) : null;

      //verificar si el enlace comienza con facebook.com, sino, corregirlo
      !enlace.contains('facebook.com')
        ? (enlace = 'http://facebook.com' + enlace)
        : enlace;

      let titular;

      noticia
        .querySelectorAll('a')
        [noticia.querySelectorAll('a').length - 1].getAttribute('aria-label')
        ? (titular = noticia
            .querySelectorAll('a')
            [noticia.querySelectorAll('a').length - 1].getAttribute(
              'aria-label'
            ))
        : null;

      noti.timeStamp = timestamp;
      noti.titulo = titulo;
      noti.imagen = imagen;
      noti.titular = titular;
      noti.enlace = enlace;
      datos.push(noti);
    });

    return datos;
  });

  //al array data creado previamente se le hace un map y por cada elemento se
  //agrega el nombre de usuario y la foto del perfil
  const nuevaData = data.map(e => {
    let obj = {
      ...e,
      fuente: nombreUsuario,
      linkPerfil: url,
      fotoUsuario: fotoPerfil
    };
    return obj;
  });

  return nuevaData;
}

async function runScrape(perfiles) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://facebook.com');

    //LOGIN
    const [correo] = await page.$x('//*[@id="email"]');
    const [password] = await page.$x('//*[@id="pass"]');

    await correo.type(process.env.FACE_USER);
    await password.type(process.env.FACE_PASS);

    await page.keyboard.press('Enter');

    await page.waitForNavigation();

    //Obtener publicaciones de las paginas deseadas
    let noticias = [];

    for (let i = 0; i < perfiles.length; i++) {
      const perfil = perfiles[i];
      const noticiasPerfil = await obtenerInfo(perfil, page);
      noticias = [...noticias, ...noticiasPerfil];
    }

    browser.close();

    return noticias;
  } catch (error) {
    return error;
  }
}

module.exports = runScrape;
