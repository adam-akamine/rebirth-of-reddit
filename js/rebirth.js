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
  var data;
  var thread;
  var postX;
  var titleX;
  var authorX;
  var scorex;
  var commentsX;
  var dateCreatedX;
  var showMoreX;
  var postDivX;

  var scoreImage;
  var commentLink;
  var numComments;
  var dateCreated;


  for(var i = 0; i < response.data.children.length; i++) {
    data = response.data.children[i].data;
    thread = document.createElement("div");
    titleX = document.createElement("h2");
    authorX = document.createElement("h4");
    postX = document.createElement("div");
    scoreImage = document.createElement("img");
    scoreX = document.createElement("div");
    commentsX = document.createElement("div");
    dateCreatedX = document.createElement("div");
    showMoreX = document.createElement("button");
    postDivX = document.createElement("div");

    thread.className = "thread";
    showMoreX.type = "show more";
    postX.className = "post";
    scoreImage.src = "cigarImage.jpg";
    scoreImage.height = "25";
    scoreImage.width = "25";
    scoreX.className = "score";
    commentsX.className = "comments";
    commentLink = data.url;
    numComments = data.num_comments;
    dateCreated = getDate(data.created_utc);

    titleX.innerHTML = data.title;
    authorX.innerHTML = "Author: " + data.author;
    postX.innerHTML = data.selftext;
    scoreX.innerHTML = 'score: ' +
                        '<img src = "cigar.png" ' +
                        'height = "25" width = "25">' +
                        'x' +
                        data.score;
    commentsX.innerHTML = '<a href = "' + commentLink + '">' + numComments + ' comments</a>';
    dateCreatedX.innerHTML = "created: " + dateCreated;
    postDivX.innerHTML = data.selftext;
    postDivX.style.display = 'none';
    showMoreX.onclick = function (postDivX) {
      if(postDivX.style.display === 'block') {
        postDivX.style.display = 'none';
      }
      else {
        console.log("assigning block style.");
        postDivX.style.display = 'block';
      }
    };

    mainPage.appendChild(thread);
    thread.appendChild(titleX);
    thread.appendChild(authorX);
    thread.appendChild(dateCreatedX);
    thread.appendChild(scoreX);
    thread.appendChild(showMoreX);
    thread.appendChild(postX);
    thread.appendChild(commentsX);
  }
}

function sanityCheck() {
  console.log("Sanity Check Pass.");
}

function addAttributes(element, attributes){
  if(typeof attributes === "object"){
    Object.keys(attributes).forEach(function(attribute){
      element[attribute] = attributes[attribute];
    });
  }else{
    throw new TypeError('attributes must be an Object');
  }
}

function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
  return date;
}

function togglePost(postdiv) {
  if(postdiv.style.display == 'block') {
    postdiv.style.display = 'none';
  }
  else {
    console.log("assigning block style.");
    postdiv.style.display = 'block';
  }
}