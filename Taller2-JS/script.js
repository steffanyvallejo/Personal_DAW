/* Cargar las noticias de noticias.json y noticias.xml */
/*function addText(texto){
 var label = $("<label/>", {
    
    html: texto
  })

  var contenedor = $("<div/>", {
    "class": "card-body card col-md-10 col-lg-8",
  });

 label.appendTo(contenedor);

}*/
function addNew(autor, contenido, url, fecha, descripcion) {

  var title = $("<h6/>", {
    "class": "card-title col-md-6",
    
    html: a+" dijo:"
  })

  var p = $("<p/>", {
    "class": "card-text col-md-6",
    html: contenido
  })
  var image = $("<p/>", {
    "class": "card-text col-md-6 ",
    html: descripcion
  })

  var a = $("<a/>", {
    "class": "card-text col-md-6",
    "href": url,
    html: url
  })

  var date = $("<p/>", {
    "class": "card-text col-md-8 text-right",
    html: fecha
  })

  var div = $("<div/>", {
    "class": "card-body card col-md-10 col-lg-8",
  });

  title.appendTo(div)
  p.appendTo(div)
  image.appendTo(div);
  a.appendTo(div)
  date.appendTo(div)
  div.appendTo("#tweets");
}



function loadNewsXml() {
  $.ajax({
    type: "GET",
    url: "rss.xml",
    dataType: "xml",
    success: function (xml) {
      $(xml).find('item').each(function () {
        var autor = $(this).find('dc:creator').text();
        var contenido = $(this).find('title').text();
        var descripcion = $(this).find('description');
        var link = $(this).find('link');
        var fecha = $(this).find('pubDate');

        addNew(autor, contenido, link, fecha, descripcion)


      });
    },
    error: function () {
      alert("Error al procesar el xml");
    }
  });
}

/* Filtrar las noticias de acuerdo al contenido ingresado en el input#buscador, ya sea por el texto en el título o en el contenido */

$(document).ready(function () {


  loadNewsXml();
  loadNewsJson();


  $("button").click(function (e) {

    var texto = $('input#buscador').val();
    addText($('input#buscador').val())
    if (texto.length != 0) {

      var noticias = $('#tweets .card-body');
      $('#tweets .card-body').filter(function (index) {

        $(this).show();

        var noticia = $(this).text()
        if (noticia.indexOf(texto) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#tweets .card-body').each(function () {
        $(this).show();
      });
    } return false;



  })
});

