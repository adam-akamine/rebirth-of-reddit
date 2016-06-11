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
      } else {
        throw new Error('There was a problem with the request.');
      }
    }
};

httpRequest.send(null);

function display(response) {
  var mainPage = document.getElementById("mainPage");
  var postX;
  var titleX;
  var authorX;
  var scorex;
  var scoreImage;
  var commentsX;
  var commentLink;
  var numComments;

  for(var i = 0; i < response.data.children.length; i++) {
    titleX = document.createElement("h2");
    authorX = document.createElement("h4");
    postX = document.createElement("div");
    postX.className = "post";
    scoreImage = document.createElement("img");
    scoreImage.src = "cigarImage.jpg";
    scoreImage.height = "25";
    scoreImage.width = "25";
    scoreX = document.createElement("div");
    scoreX.className = "score";
    commentsX = document.createElement("div");
    commentLink = response.data.children[i].data.permalink;
    numComments = response.data.children[i].data.num_comments;

    titleX.innerHTML = response.data.children[i].data.title;
    authorX.innerHTML = "Author: " + response.data.children[i].data.author;
    postX.innerHTML = response.data.children[i].data.selftext + "<br>";
    scoreX.innerHTML = 'score: ' +
                        '<img src = "cigarImage.jpg" ' +
                        'height = "25" width = "25">' +
                        'x' +
                        response.data.children[i].data.score;

    mainPage.appendChild(titleX);
    mainPage.appendChild(authorX);
    mainPage.appendChild(scoreX);
    mainPage.appendChild(postX);
  }
}

function sanityCheck() {
  console.log("Sanity Check Pass.");
}