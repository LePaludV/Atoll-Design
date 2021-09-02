$(function () {
  var numObj = 0;

  /*
  Tableau qui contient le nom de l'objet et son état(verrouiller(true) ou non(false))
  Il ne peut en avoir qu'un seul de déverrouiller à la fois.
  Une fonction regarde quel objet est déverrouiller pour savoir sur quel obj on doit faire les modifs.
  */
  var Obj_State = new Map();
  var currentObj = null;

  $("#newobj").click(function () {
    newObj();
  });
  //Création DOM d"un nouvel objet
  function newObj() {
   

    var mainObj = $("<div>", { class: numObj + " mainObj" }); // = old "containerPorte"

    var containerObj = $("<div>", { class: numObj + " containerObj" }); // = old "container"

    var imgObj = $("<div>", { class: numObj + " imgObj" }); // = old "img"
    var sliderLum = $("<input>", {
      type: "range",
      min: "1",
      max: "100",
      value: "100",
      class: numObj + " form-range slider",
      id: "myRange",
    });

    var pt_tl = $("<div>", { class: numObj + " pt tl" });
    var pt_tr = $("<div>", { class: numObj + " pt tr" });
    var pt_bl = $("<div>", { class: numObj + " pt bl" });
    var pt_br = $("<div>", { class: numObj + " pt br" });
    var btnMiroir = $("<a>", { class: numObj + " btnMiroir" }); //not working for now

    mainObj.append(
      containerObj.append(imgObj, sliderLum, pt_bl, pt_br, pt_tl, pt_tr)
    );

    $(".main").append(mainObj);
    containerObj.draggable({ cancel: "div.pt, .slider" });
    Obj_State.set(numObj, false);
    currentObj=numObj //Car quand on entre dans la fonction newObj on a forcement tous les obj locké (donc sur true)
    settingsObj(numObj, containerObj, imgObj);
    numObj += 1;
  }

  //Paramètre les poignées de l'objet qui doivent être dans les coins
  function settingsObj(numObj, containerObj, imgObj) {
    var pts = $(".pt");
    var IMG_WIDTH = containerObj.width();
    var IMG_HEIGHT = containerObj.height();
    var transform = new PerspectiveTransform(
      imgObj[0],
      IMG_WIDTH,
      IMG_HEIGHT,
      true
    );

    var pt_tl = pts.filter(".tl").css({
      left: transform.topLeft.x,
      top: transform.topLeft.y,
    });
    var pt_tr = pts.filter(".tr").css({
      left: transform.topRight.x,
      top: transform.topRight.y,
    });
    var pt_bl = pts.filter(".bl").css({
      left: transform.bottomLeft.x,
      top: transform.bottomLeft.y,
    });
    var pt_br = pts.filter(".br").css({
      left: transform.bottomRight.x,
      top: transform.bottomRight.y,
    });
  }
  //Regarde dans la map quel objet n'est pas verrouillé (lequel a value=false) et met currentObj = key
  function checkCurrentObj() {
    for (var [key, value] of Obj_State) {
      var nbrF=0;
      if(value==false){
        nbrF+=1;
        if(nbrF>1){
          console.log("ERROR !!! nbr value false > 1 "+nbrF)
        }
      }
      if (value == false) {
        currentObj = key;
      } else {
        currentObj = null;
      }
    }
  }

  $(".portes").click(function (e) {
    $("div."+currentObj+".mainObj").show();
    //$(".containerPorte").show();
    //Regarde si il faut créer une porte ou pas : si on a une porte créer non locké -> il ne faut pas creér de porte
    checkCurrentObj()
    if(currentObj==null){
      newObj();
    }
    //Sinon, on agit sur la porte "currentObj"
    
    var mainObj_currentObj=$("div."+currentObj+".mainObj");
    console.log(mainObj_currentObj)
    //!!!
    if (
      e.target.id.includes("porteNuméro_") &&
      $("#" + e.target.id).css("opacity") == 1
    ) {
      //console.log(e.target.id);
      //$(".img").css("background-image", "url(" + e.target.src + ")");
      $("div."+currentObj+".imgObj").css("background-image", "url(" + e.target.src + ")");
      $("div."+currentObj+".containerObj").css("display", "initial");
      //$('#'+e.target.id).css('border','4px solid;')
    } else {
     $("div."+currentObj+".containerObj").css("display", "none");
     $("div."+currentObj+".mainObj").hide();
    }
  });
});
