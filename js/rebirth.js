//sanityCheck();

var httpRequest;

if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

httpRequest.open('GET', 'http://www.reddit.com/r/cigars.json', true);

httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        display(response);
        // document.getElementById("div1").innerHTML = response.data.children[0].kind;
      } else {
        throw new Error('There was a problem with the request.');
      }
    }
};

httpRequest.send(null);

function display(response) {
  var div1 = document.getElementById("div1");
  var postX;
  var titleX;
  var authorx;
  for(var i = 1; i < response.data.children.length; i++) {
    titleX = document.createElement("h2");
    authorx = document.createElement("h4");
    postX = document.createElement("div");

    titleX.innerHTML = response.data.children[i].data.title;
    authorx.innerHTML = "Author: " + response.data.children[i].data.author;
    postX.innerHTML = response.data.children[i].data.selftext + "<br>";

    div1.appendChild(titleX);
    div1.appendChild(authorx);
    div1.appendChild(postX);
  }
}

function sanityCheck() {
  console.log("Sanity Check Pass.");
}