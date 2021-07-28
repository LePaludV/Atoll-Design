$(function() {
  
  //test si c'est bien une tablette windows pour pouvoir afficher le bouton prendre une photo
    
    
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    
    
    const webcam = new Webcam(webcamElement, 'user', canvasElement);
    
    
    
       $('.snap').hide();
       $('.valider').hide();
       $('.restart').hide();
      
       $('.snap').click(function(){
        var picture = webcam.snap();
        webcam.stop();
        $('#canvas').hide();
        $('.snap').hide();
        $('.valider').show();
        $('.restart').show();
       
      });
    
      function camera(){
        
        webcam.start()
        .then(result =>{
           console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
        });
        $('.snap').show();
      }
      $('.btnPhoto').click(function(){

        camera();
        
       $('.btnPhoto').hide();
       
       
      });
      $('.restart').click(function(){
        camera();
        $('.valider').hide();
        $('.restart').hide();
      });
      $('.valider').click(function(){

        var canvas = document.getElementById("canvas");
        var img    = canvas.toDataURL("image/png");
       
        $('.main').css('background-image','url('+img+')');
        
        $('#canvas').hide();
        $('#webcam').hide();
        $('.snap').hide();
        $('.valider').hide();
        $('.restart').hide();
        $('input').disabled
        $('.buttonImg').css('display','none')
     
      })
      });