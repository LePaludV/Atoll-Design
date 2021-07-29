
$(function() {
  console.log("type d'appareil : "+device.type);
  console.log("type d'os : "+device.os);

  //test si c'est bien une tablette windows pour pouvoir afficher le bouton prendre une photo
    
    $('#select').hide();
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    //const select = document.getElementById('select');
    
    const webcam = new Webcam(webcamElement, 'enviroment', canvasElement);
    
    
    
       $('.snap').hide();
       $('.valider').hide();
       $('.restart').hide();
       $('.change').hide();
       $('.btnPhoto').hide();

       function gotDevices(mediaDevices) {
        cam=[];
        select.innerHTML = '';
        select.appendChild(document.createElement('option'));
        let count = 1;
        mediaDevices.forEach(mediaDevice => {
          if (mediaDevice.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = mediaDevice.deviceId;
            const label = mediaDevice.label || `Camera ${count++}`;
            const textNode = document.createTextNode(label);
            
            option.appendChild(textNode);
            select.appendChild(option);
            cam.push(textNode)
          }
        });
      }
     

      
 
   
      function isSurface() {
        const isWindows = navigator.userAgent.indexOf('Windows') > -1;
        const maxTouchPoints = navigator.maxTouchPoints || navigator.msMaxTouchPoints;
        const isTouchable = 'ontouchstart' in window
          || maxTouchPoints > 0
          || window.matchMedia && matchMedia('(any-pointer: coarse)').matches;
      
        return isWindows && isTouchable;
      }
     
      if( navigator.maxTouchPoints > 1 && device.os=="windows"){
        console.log("tablette windows")
      }else{
        console.log("pas tablette windows")
       
        console.log(navigator.maxTouchPoints > 1 )
        console.log(device.os=="windows")
      }
      console.log('ontouchstart' in window)
      if(navigator.maxTouchPoints > 1 && device.os=="windows"){

        $('.btnPhoto').show();
       $('.snap').click(function(){
        var picture = webcam.snap();
        webcam.stop();
        $('#canvas').hide();
        $('.snap').hide();
        $('.change').hide();
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
        $('.change').show();
        $('.snap').show();
      }
      $('.btnPhoto').click(function(){

        camera();
      $('.buttonImg').hide();
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

      

    
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
      }
      
      
      
    const video = document.getElementById('webcam');
    const button = document.getElementsByClassName('btnPhoto');
    const select = document.getElementById('select');
    var cam=[];
    let currentStream;
    var currentCam=0;

    function stopMediaTracks(stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    
$('.change').click(function(){
  currentCam=(currentCam+1)%cam.length
  console.log(cam)
  console.log(currentCam)
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  
  console.log(cam[currentCam].parentNode.value)
  videoConstraints.deviceId = { exact: cam[currentCam].parentNode.value };
  
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
})
    

    navigator.mediaDevices.enumerateDevices().then(gotDevices);

    //https://www.twilio.com/blog/choosing-cameras-javascript-mediadevices-api-html
  }
      });