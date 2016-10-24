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
$(function () {
  $('.slide__hider').jcarousel({
    scroll:1,
    wrap:"circular",
    list: '.slide__container'
  });
  $('.slide__control--left').jcarouselControl({
        target: '-=1'
    });

    $('.slide__control--right').jcarouselControl({
        target: '+=1'
    });
  $('.ideas__button').on('click',function (event) {
    event.preventDefault();
    getNewQuery();
  });
  var categorys=['sunset','seaside','mountain','holland','fjords','venice+canal','ireland+lake','alps+nature'];
  category=categorys[Math.floor(Math.random()*categorys.length)];
  init('https://pixabay.com/api/?key=3429450-a383cae33a92ccea1a1e14e3a&&image_type=photo&pretty=true&per_page=7&min_height=300&min_width=600&orientation=horisontal&page=3&q='+category);
});
function getNewQuery() {
  var input = document.querySelector('.ideas__input');
  var keyword =input.value;
  if(keyword!=null){
    init('https://pixabay.com/api/?key=3429450-a383cae33a92ccea1a1e14e3a&&image_type=photo&pretty=true&per_page=7&min_height=300&min_width=600&orientation=horisontal&page=2&q='+keyword);
  }
  input.value=''
}
