// gets the element id that the text is stored in 
// 
function findImages(elementId){
    var text = document.getElementById(elementId).value;
    var topics = getTopics(text);
    
    var serializedTopics = serialize(topics);
    
    // redirect
    location.replace("../result.html?"+serializedTopics);
}


// gets an array and return a serialized string
var serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

// gets url and returns GET values
function getGetValues(url){
    var valueString = url.split("?")[1]; // GET Values
    
    var valueArray = valueString.split("&");
    var topics = [];
    for(var i = 0; i < valueArray.length; i++){
        var currentTopic = valueArray[i].split("=")[1];
        topics.push(currentTopic);
    }
    return topics;
}

// gets plain text 
// return an array of topic
function getTopics(text){
    return ["cats", "dogs"];
}


// gets an array of topics  
// return an array of links to images
function getImageLinks(topics){
    return ["https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg", "https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg"];
}


// gets an array of links 
// display the images on a chosen element
function displayImages(links, elementId){
    document.getElementById(elementId).innerHTML = "Here is the list of images that fits the text\n";
    for(var i = 0; i < links.length; i++){
        appendImage(links[i], elementId);
        //document.getElementById(elementId).innerHTML += links[i]+"\n";
    }
}

// display an image on a page's element
function appendImage(url, elementId){
    var img = document.createElement("img");
    img.setAttribute("class", "image" );
    img.src = url;
    var src = document.getElementById(elementId);
    src.appendChild(img);
}