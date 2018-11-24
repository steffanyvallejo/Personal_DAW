/* Cargar las noticias de noticias.json y noticias.xml */
var div;
function addNew(autor, url, fecha, descripcion) {
  
  /*autor*/
  var title = $("<p/>", {
    "class": "card-title col-md-12 col-sm-12 col-12 ",
    html: String(autor).bold()+", dijo: "

  })

  /*contenido*/
  var p = $("<p />", {
   
    "class": "contenido card-title col-md-12 col-12  col-sm-12 py-0 py+0 mx+0 my ",
    
    html: descripcion
  })

   p.addClass("contenido");

  
  /*enlace*/
  var a = $("<a/>f", {
    "class": "card-text col-md-12 col-12 col-sm-12",
    "href": url,
    html: "Enlace al tweet"
  })

  /*fecha*/
  var date = $("<p/>", {
    "class": "card-text  col-md-12 col-12 text-right  col-sm-12 ",
    html: fecha
  })
  date.addClass("fecha");

  /*logo*/
   var imagen = $("<img/>", {
    "class": "card-text col-sm-12 col-md-12 col-12 img-fluid",
    "src": "https://image.flaticon.com/icons/png/512/23/23681.png",
    "style":"max-height:100px; max-width:100px; min-height:40px; min-width:50px",
    html: imagen

  })

  /*div para la imagen*/
  var i = $("<div/>", {
    "class": "card-text col-md-2 col-sm-3 col-2"
  });

/*contenedor de todos los tweets*/
  div = $("<div/>", {
    "class": "card-body  col-md-12 col-sm-12 col-12 row border-top px-2 pt-2 mx-0"

  });
  
/*contenedor de un tweet*/
  var formato = $("<div/>", {
    "class": "card-text col-md-12 col-12 col-sm-12 row my-0"
  });

  /*contenedor de la segunda columna del tweet*/
  var columnas = $("<div/>", {
    "class": "card-text col-md-10 col-sm-9 col-10 px-0 px+0"
  });

  imagen.appendTo(i);
  title.appendTo(columnas);
  p.appendTo(columnas);
  a.appendTo(columnas);
  date.appendTo(columnas);
  i.appendTo(formato);
  columnas.appendTo(formato);
  formato.appendTo(div);
 
  
  div.appendTo("#tweets");
}



function loadTweetsXml() {
  $.ajax({
    type: "GET",
    url: "https://twitrss.me/twitter_user_to_rss/?user=celex_espol",
    dataType: "xml",
    success: function (xml) {
      $(xml).find('item').each(function () {

        /*autor del tweet*/
        var autor = $(this).find('dc\\:creator').text();
        var inicio = autor.indexOf("(");
        var fin = autor.indexOf(")");
        var username= autor.substring(inicio+1,fin);

        /*contenido del tweet*/
        var descripcion = $(this).find('description').text();

        /*link del tweet*/
        var url = $(this).find('link').text();
        var link = String(url)

        /*fecha del tweet*/
        var date = $(this).find('pubDate').text();
        var fecha = String(date).split(" ");
        fecha = fecha[0] + " " + fecha[1] + " " + fecha[2] + " " + fecha[3] + " " + fecha[4];
        addNew(username, link, fecha, descripcion)



      });
    },
    error: function () {
      alert("Error al procesar el xml");
    }
  });
}


$(document).ready(function () {

loadTweetsXml();
  $("button").click(function (e) {
     
    var texto = $('input#buscador').val();


    if (texto.length != 0) {
     
      document.getElementById('texto').innerHTML = texto;
      
      $('#tweets .card-body').filter(function (index) {
       
        $(this).show();

        var t = $(this).text()
        if (t.indexOf(texto) == -1) {
          $(this).hide()

        }

      });

    } else {
      
      $('#tweets .card-body').each(function () {
        $(this).hide();
        document.getElementById('texto').innerHTML = "";
        
        
      });
    } return false;



  })
});

