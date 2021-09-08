$(function () {
//   var container = $("#container");
//   var img = $(".img");
//   var pts = $(".pt");

//   var IMG_WIDTH = container.width();
//   var IMG_HEIGHT = container.height();
//   var etatPorte = 0;

//   var transform = new PerspectiveTransform(img[0], IMG_WIDTH, IMG_HEIGHT, true);

//   var tl = pts.filter(".tl").css({
//     left: transform.topLeft.x,
//     top: transform.topLeft.y,
//   });
//   var tr = pts.filter(".tr").css({
//     left: transform.topRight.x,
//     top: transform.topRight.y,
//   });
//   var bl = pts.filter(".bl").css({
//     left: transform.bottomLeft.x,
//     top: transform.bottomLeft.y,
//   });
//   var br = pts.filter(".br").css({
//     left: transform.bottomRight.x,
//     top: transform.bottomRight.y,
//   });

  // var btnMiroir = $(".btnMiroir")
  //   .filter(".btnMiroir")
  //   .css({
  //     left: transform.bottomRight.x / 2,
  //     top: transform.bottomRight.y / 2,
  //   });

  // var target;
  // var targetPoint;
// TRANSFORMATION 
  // function onMouseMove(e) {
  //   targetPoint.x = e.pageX - container.offset().left - 20;
  //   targetPoint.y = e.pageY - container.offset().top - 20;
  //   target.css({
  //     left: targetPoint.x,
  //     top: targetPoint.y,
  //   });

  //   // check the polygon error, if it's 0, which mean there is no error
  //   if (transform.checkError() == 0) {
  //     transform.update();
  //     img.show();
  //   } else {
  //     img.hide();
  //   }
  // }

  
  // pts.mousedown(function (e) {
  //   img.css("opacity", "0.6");

  //   target = $(this);
  //   targetPoint = target.hasClass("tl")
  //     ? transform.topLeft
  //     : target.hasClass("tr")
  //     ? transform.topRight
  //     : target.hasClass("bl")
  //     ? transform.bottomLeft
  //     : transform.bottomRight;
  //   onMouseMove.apply(this, Array.prototype.slice.call(arguments));
  //   $(window).mousemove(onMouseMove);
  //   $(window).mouseup(function () {
  //     img.css("opacity", "1");
  //     //checkState();
  //     $(window).unbind("mousemove", onMouseMove);
  //   });
  // });

  // $("#container").draggable({ cancel: "div.pt, .slider" });

  $("#container").on("taphold"),
    function () {
      console.log("ça bouge");
    };

  // ------------Fonction Miroir -----------------   
  // function sensPorte() {
  //   console.log("avant modif  -> " + img.css("transform"));
  //   if (etatPorte == 0) {
  //     img.css("transform", " rotate3d(0, 1, 0, 0deg)");
  //     console.log("APRES modif -> " + img.css("transform"));
  //   }
  //   if (etatPorte == 1) {
  //     // $('#container').css("transform", " rotate3d(0, 1, 0, 180deg)");
  //     img.css("transform", " rotate3d(0, 1, 0, 180deg)");
  //     // $('#p1').attr('class','pt tr')
  //     // $('#p2').attr('class','pt tl')
  //     // $('#p3').attr('class','pt br')
  //     // $('#p4').attr('class','pt bl')
  //   }
  //   console.log("APRES  modif -> " + img.css("transform"));
  // }

  // $(".btnMiroir").click(function () {
  //   etatPorte = (etatPorte + 1) % 2;
  //   sensPorte();
  // });

  // ####Regarde l'état de la porte pour en deduire le sens (miroir ou pas)
  // et modifier une valeur de la matrice 3d de la porte.

  // function checkState() {
  //   if (etatPorte == 1) {
  //     var temp = img.css("transform");
  //     temp = temp.slice(9);
  //     temp = temp.split(",");
  //     if (temp[0].indexOf("-") == -1) {
  //       temp[0] = temp[0] * -1;
  //     }

  //     console.log(temp);
  //     img.css("transform", " matrix3d(" + temp.concat());
  //   }
  // }

  var nomPortes = [
    "battante-mistral-brun-cuir-brosse-2878-13034.jpg",
    "battante-mistral-chene-grisperle-brosse-4714-22037.jpg",
    "battante-mistral-design-chene-brut-4710-18273.jpg",
    "battante-mistral-design-chene-naturel-2886-22041.jpg",
    "battante-mistral-design-chene-selectionne-blanc-satin-brosse-4708-18269.jpg",
    "battante-mistral-design-hetre-brut-4712-18277.jpg",
    "battante-mistral-hetre-naturel-2491-22036.jpg",
    "battante-porte-chene-ardoise-mistral-design-2880-13038.jpg",
    "coulissante-mistral-chene-blanc-satin-brosse-5234-19338.jpg",
    "coulissante-mistral-chene-blanchi-brosse-2882-13042.jpg",
    "coulissante-mistral-chene-clair-coul-2893-13104.jpg",
    "coulissante-mistral-chene-grisperle-brosse-2895-13108.jpg",
    "coulissante-mistral-chene-selectionne-brun-cuir-brosse-5805-20697.jpg",
    "coulissante-mistral-design-chene-ardoise-2891-13100.jpg",
    "coulissante-mistral-design-chene-blanchi-brosse-5236-19342.jpg",
    "coulissante-mistral-design-chene-brut-5233-21281.jpg",
    "coulissante-mistral-design-chene-selectionne-naturel-brosse-vitrage-clair-transparent-5238-20348.jpg",
    "coulissante-mistral-design-hetre-brut-6136-21285.jpg",
    "coulissante-mistral-design-hetre-finition-hetre-naturel-5240-19350.jpg",
  ];
  var nom = "mistral";
  var path = "./docs_sources/porte_Mistral/";
  /* Fonction avec le nom de la gamme de porte choisi pour trouver le dossier de la gamme est récupéré les portes 
besoin de le faire avec node.js server-side
*/
  function initPorte(nom) {
    var cptID = 0;
    console.log(Math.floor(nomPortes.length / 3));
    for (var row = 0; row < Math.floor(nomPortes.length / 3) + 1; row++) {
      var ligne = $("<ul>", { class: "row nrbRow_" + row });

      for (var col = 0; col < 3; col++) {
        url = nomPortes[cptID];
        if (cptID < nomPortes.length) {
          var colonne = $("<img>", {
            class: "col porte",
            id: "porteNuméro_" + row + "_" + col,
            src: path + url,
          });
          ligne.append(colonne);
          cptID += 1;
        } else {
          var colonne = $("<img>", {
            class: "col",
            id: "porteNuméro_" + row + "_" + col,
          });
          colonne.css("opacity", "0");
          ligne.append(colonne);
        }
      }
      $(".portes").append(ligne);
    }
    /*
    while(nomPortes.length!=0){
        
        url=nomPortes[0]
        nomPortes.shift()
        ligne=$("<img>",{class:"porte",id:"porteNuméro_"+cptID,src:path+url})
        $('.portes').append(ligne)
        cptID+=1;
    }
*/
  }

//Affiche l'objet selectionné dans le menu sur le configurateur 

// $(".portes").click(function (e) {
//   $(".containerPorte").show();
 
//   if (
//     e.target.id.includes("porteNuméro_") &&
//     $("#" + e.target.id).css("opacity") == 1
//   ) {
//     console.log(e.target.id);
//     $(".img").css("background-image", "url(" + e.target.src + ")");
//     $("#container").css("display", "initial");
//     //$('#'+e.target.id).css('border','4px solid;')
//   } else {
//     $("#container").css("display", "none");
//     $(".containerPorte").hide();
//   }
// });

  function init() {
    console.log(device.type);
    $("#container").css("display", "none");
    $(".containerPorte").hide();
    console.log(device.type);
    if (
      device.type == "mobile" ||
      device.type == "tablet" ||
      device.os == "ipad"
    ) {
      $(".buttonImg").text("Sélectionner une photo ou prendre une photo");
    }

    initPorte(nom);
  }

 /* 
$(window).resize(function () {
    console.log("resize");

    var container = $("#container");
    var img = $(".img");
    var pts = $(".pt");

    var IMG_WIDTH = img.width();
    var IMG_HEIGHT = img.height();
    var etatPorte = 0;

    var transform = new PerspectiveTransform(
      img[0],
      IMG_WIDTH,
      IMG_HEIGHT,
      true
    );

    var tl = pts.filter(".tl").css({
      left: transform.topLeft.x,
      top: transform.topLeft.y,
    });
    var tr = pts.filter(".tr").css({
      left: transform.topRight.x,
      top: transform.topRight.y,
    });
    var bl = pts.filter(".bl").css({
      left: transform.bottomLeft.x,
      top: transform.bottomLeft.y,
    });
    var br = pts.filter(".br").css({
      left: transform.bottomRight.x,
      top: transform.bottomRight.y,
    });

    var btnMiroir = $(".btnMiroir")
      .filter(".btnMiroir")
      .css({
        left: transform.bottomRight.x / 2,
        top: transform.bottomRight.y / 2,
      });

    var slider = $(".slider")
      .filter(".slider")
      .css({
        top: transform.bottomRight.y / 2.2,
      });

    $(".pt").hide();
    $(".pt").show();
  });*/

  $(".Save").click(function () {
    // $("#div").children().attr("crossorigin", "anonymous");
    // $("#container").attr("crossorigin", "anonymous");
    // $("#container").children().attr("crossorigin", "anonymous");
    $(".pt").hide();
    $(".btnMiroir").hide();
    $(".slider").hide();
    html2canvas(document.querySelector("#div")).then((canvas) => {
      var img = new Image();
      var img = canvas.toDataURL();

      var a = document.createElement("a");
      a.download = "Porte.png";
      a.href = img;
      a.click();
    });
  });



  // var slider = document.getElementById("myRange");

  // $(".img").css("filter", "brightness(" + slider.value + "%)");

  // slider.oninput = function () {
  //   $(".img").css("filter", "brightness(" + this.value + "%)");
  // };
  init();
});
