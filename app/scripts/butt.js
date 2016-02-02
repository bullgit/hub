var butt = function(args) {
  var id = args.id,
      content = args.content || 'Dat Butt tho',
      reveal = args.delay || '850ms',
      direction = args.direction || 'lateral',
      buttonUrl = args.button.url || false,
      buttonTextFront = args.button.text.front || 'More',
      buttonTextBack = args.button.text.back || 'Less',
      buttonPos = args.button.position || 'bottom right';
  var isTouched = false;
  var toButt = document.querySelector('#butt-'+id);
  var theButt = document.createElement('div');
  var theButtContent = document.createElement('section');
  var touchButtFront = document.createElement('a');
  touchButtFront.setAttribute('id', 'touchButtFront-'+ id);
  touchButtFront.href="javascript:void(0)";
  touchButtFront.classList.add('touchButtFront');
  var touchButtBack = document.createElement('a');
  touchButtBack.setAttribute('id', 'touchButtBack-'+ id);
  touchButtBack.href="javascript:void(0)";
  touchButtBack.classList.add('touchButtBack');
  var touchButtStyle;
  if(buttonUrl) {
    touchButtStyle= 'position:fixed;background:url('+ buttonUrl+')no-repeat center center;color: currentColor;text-decoration:none;';
  } else {
    touchButtStyle = 'position:fixed;display:inline-block;width:auto !important;color: currentColor;text-decoration:none;';
    touchButtFront.textContent=buttonTextFront;
    touchButtBack.textContent=buttonTextBack;
  }
  
  var sharedStyle = 'transform-style: preserve-3d;will-change:transform;';
  var buttParent;
 
     buttParent = toButt.parentNode.id='buttParent';
 
  
  function setStyle( objId, cssString ) {
    document.getElementById(objId).style.cssText += cssString;
  }
  theButt.setAttribute('id', 'theButt' + id);
  theButt.classList.add('butt');
  theButtContent.setAttribute('id', 'theButtContent' + id);
  theButtContent.classList.add('buttContent');
  theButtContent.innerHTML=content; 
  theButt.appendChild(theButtContent);
  theButt.appendChild(touchButtBack);
  toButt.appendChild(theButt);
  toButt.appendChild(touchButtFront);

  switch(direction) {
    case 'lateral': 
      setStyle(theButt.id, sharedStyle + 'position:absolute; top:0; left:0;width:100%;height:100%; transform:rotateY(180deg);backface-visibility: hidden;z-index:20;');
      break;
    case 'vertical': 
      setStyle(theButt.id, sharedStyle + 'position:absolute; top:0; left:0;width:100%;height:100%; transform:rotateX(180deg);  backface-visibility: hidden;z-index:20;');
      break;
  }
  setStyle(theButtContent.id, 'float: left; position: absolute; overflow-y: scroll; width: 100%; height: 100%; left: 0; padding: 16px; top: 0;');
  setStyle('buttParent', 'perspective: 1000;');
  setStyle(toButt.id, sharedStyle + 'position:relative; transform-origin:50% 50%; transition:transform '+ reveal +' ease;z-index:20');

  switch(buttonPos) {
    case 'top left':
      setStyle(touchButtFront.id, touchButtStyle + 'top:0;left:0;');
      setStyle(touchButtBack.id, touchButtStyle + 'top:0;left:0;');
      break;
    case 'bottom left':
      setStyle(touchButtFront.id, touchButtStyle + 'bottom:0;left:0;');
      setStyle(touchButtBack.id, touchButtStyle + 'bottom:0;left:0;');
      break;
    case 'top right':
      setStyle(touchButtFront.id, touchButtStyle + 'top: 0;right:0;');
      setStyle(touchButtBack.id, touchButtStyle + 'top: 0;right:0;');
      break;
    case 'bottom right':
      setStyle(touchButtFront.id, touchButtStyle + 'bottom:0;right:0;');
      setStyle(touchButtBack.id, touchButtStyle + 'bottom:0;right:0;');
      break;
  }
  function turnDatButt(){
    switch(isTouched) {
      case false:
        document.querySelector('#'+toButt.id).classList.add('rotated');
        switch(direction) {
          case 'lateral':
            document.querySelector('#'+toButt.id).style.transform="rotateY(180deg)";
            break;
          case 'vertical': 
            document.querySelector('#'+toButt.id).style.transform="rotateX(180deg)";
            break;
        }
        isTouched=true;
        break;
      case true:
        document.querySelector('#'+toButt.id).classList.remove('rotated');
        switch(direction) {
          case 'lateral': 
            document.querySelector('#'+toButt.id).style.transform="rotateY(-0deg)";
            break;
          case 'vertical': 
            document.querySelector('#'+toButt.id).style.transform="rotateX(-0deg)";
        }
        isTouched=false;
        break;
    }
  }
  touchButtFront.addEventListener('click', function(){
    turnDatButt();
  });
  touchButtBack.addEventListener('click', function(){
    turnDatButt();
  }); 

};