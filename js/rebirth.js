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
  var heading;
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
    heading = document.createElement("div");
    thread = document.createElement("div");
    titleX = document.createElement("h1");
    authorX = document.createElement("h4");
    postX = document.createElement("div");
    scoreImage = document.createElement("img");
    scoreX = document.createElement("div");
    commentsX = document.createElement("div");
    dateCreatedX = document.createElement("div");
    showMoreX = document.createElement("button");
    postDivX = document.createElement("div");
    space = document.createElement("div");

    space.innerHTML = "<br><br><br>";
    heading.className = "heading";
    heading.innerHTML = "/r/" + data.subreddit;
    thread.className = "thread";
    postDivX.className = "post";
    scoreImage.src = "cigarImage.jpg";
    scoreImage.height = "25";
    scoreImage.width = "25";
    scoreX.className = "score";
    commentsX.className = "comments";
    commentLink = data.url;
    numComments = data.num_comments;
    dateCreated = getDate(data.created_utc);
    showMoreX.innerHTML = "show more";
    showMoreX.className = "btnShowMore";

    // $(".btnShowMore").click(function () {

    // });
    titleX.innerHTML = data.title;
    authorX.innerHTML = "Author: <a href = 'https://www.reddit.com/user/" + data.author + "'>" + data.author + "</a>";
    postX.innerHTML = data.selftext;
    scoreX.innerHTML = 'score: ' +
                        '<img src = "cigar.png" ' +
                        'height = "25" width = "25">' +
                        'x' +
                        data.score;
    commentsX.innerHTML = '<a href = "' + commentLink + '">' + numComments + ' comments</a>';
    dateCreatedX.innerHTML = "created: " + dateCreated;
    postDivX.innerHTML = marked(data.selftext);
    showMoreX.onclick = function () {
      togglePost(postDivX);
    };

    mainPage.appendChild(heading);
    mainPage.appendChild(space);
    mainPage.appendChild(thread);
    thread.appendChild(titleX);
    thread.appendChild(authorX);
    thread.appendChild(dateCreatedX);
    thread.appendChild(scoreX);
    //thread.appendChild(showMoreX);
    //thread.appendChild(postX);
    thread.appendChild(postDivX);
    //console.log("Appended " + postDivX.innerHTML);
    thread.appendChild(commentsX);
  }
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
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var time;

  if(min < 10) {
    min = '0' + min.toString();
  }
  if(hour > 12) {
    if(hour < 13) {
      hour = 12;
    }
    else {
      hour = hour - 12;
    }
    time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + 'PM (HST)';
  }
  else {
    time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + 'AM (HST)';
  }
  return time;
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