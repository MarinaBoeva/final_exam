  if (!XMLHttpRequest){
      var XMLHttpRequest = function() {
      	for (var progIDs = ['Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'],
      		i = 0, length = progIDs.length; i < length; i++) try {
      			return new ActiveXObject(progIDs[i]);
      		} catch (err) {}
      	return null;
      };
    }
  function getImg(q) {
    var req = new XMLHttpRequest();
    req.open('GET',q,false);
    req.send(null);
    var data= req.responseText;
    data = JSON.parse(data);
    return data;
  }
  function init(q) {
    var data=getImg(q);
    var container = document.querySelector('.grid');
    container.innerHTML="";
    for (var i = 0; i <7; i++) {
      var figure=document.createElement('figure');
      var figcaption=document.createElement('figcaption');
      figure.setAttribute('class','grid-item');
      figcaption.setAttribute('class','title title--white');
        if(i===4||i===5){
          figure.setAttribute('class','grid-item grid-item--2');
      }
      container.appendChild(figure);
      figure.appendChild(figcaption);
      figure.setAttribute('style','background-image:url('+data.hits[i].webformatURL+')');
      figcaption.innerHTML=data.hits[i].tags;
    }
    var msnry = new Masonry( container, {
      containerStyle: null,
      columnWidth: ".grid-item",
      itemSelector: '.grid-item',
      gutter:12
    });
 }
window.onload=function () {
  var categorys=['sunset','seaside','mountain','holland','fjords','venice+canal','ireland+lake','alps+nature'];
  category=categorys[Math.floor(Math.random()*categorys.length)];
  init('https://pixabay.com/api/?key=3429450-a383cae33a92ccea1a1e14e3a&&image_type=photo&pretty=true&per_page=7&min_height=300&min_width=600&orientation=horisontal&page=3&q='+category);
  document.querySelector('.ideas__button').onclick=function () {
    getNewQuery();
  }
  var slideHider = document.querySelectorAll('.slide__hider');
  slider(slideHider[0]);
  slider(slideHider[1]);
  slider(slideHider[2]);
}
function getNewQuery() {
  var input = document.querySelector('.ideas__input');
  var keyword =input.value;
  if(keyword!=null){
    init('https://pixabay.com/api/?key=3429450-a383cae33a92ccea1a1e14e3a&&image_type=photo&pretty=true&per_page=7&min_height=300&min_width=600&orientation=horisontal&page=2&q='+keyword);
  }
  input.value=''
}
function slider(slideHider) {
  var slide = slideHider.querySelector('.slide');
  var list = slideHider.querySelector('.slide__container');
  var width=slide.offsetWidth;
  var left = slideHider.querySelector('.slide__control--left');
  var right = slideHider.querySelector('.slide__control--right');
  for(var i=0;i<3;i++){
    var position =0;
    left.onclick=function () {
      if(position<0){
        position=position+width;
        list.style.marginLeft =position+'px';
      }
    }
    right.onclick=function () {
      if(position>-width){
        position=position-width;
        list.style.marginLeft =position+'px';
      }
    }
  }
}
