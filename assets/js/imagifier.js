// gets the element id that the text is stored in 
// 
function findImages(elementId){
    var text = document.getElementById(elementId).value;
    getTopics(text);
    
    
}


function filterTags(topics){
    topics = topics.documents[0].keyPhrases;
    var filteredTopics = [];
    for(var i = 0; i < topics.length; i++){
        if(topics[i].split(" ").length > 1){
            filteredTopics.push(topics[i]);
        }
    }
    return filteredTopics;
}

// takes an array of topic 
// redirect the page and display the related images
function sendSerializedTopics(topics){
    //console.log(topics);
    //topics = topics.documents[0].keyPhrases;
    topics = filterTags(topics);
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
        var currentTopicEnc = valueArray[i].split("=")[1];
        // debug
        var topicArray = currentTopicEnc.split("%20");
        var currentTopic = "";
        for(var j = 0; j < topicArray.length; j++){
            currentTopic += topicArray[j] + " ";
        }
        document.getElementById("tags").innerHTML += currentTopic + "<br/>";
        topics.push(currentTopic);
    }
    
    
    
    return topics;
}


// gets plain text 
// return an array of topic
function getTopics(text){
    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Access-Control-Allow-Origin","*");
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c56679e913274bf888cedc3806223644");
        },
        type: "POST",
        // Request body
        data: JSON.stringify({
            "documents": [
                {
                    "language": "en",
                    "id": "string",
                    "text": text
                }
            ]
        }),
        
    })
    .done(function(data) {
        console.log(data);
        sendSerializedTopics(data);
    })
    .fail(function(err) {
        console.log(err);
    });
}


// gets an array of topics  
// return an array of links to images
function getImageLinks(topics){
    var imageLinks = [];
    for(var i = 0; i < topics.length; i++){
        var bingResponse = httpGet("https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=1&q=" + topics[topics.length - i - 1] + "s&mkt=en-us&safeSearch=Moderate");
        var url = bingResponse.value[0].contentUrl;
        //console.log(topics[i]);
        imageLinks.push(url)
    }
    return imageLinks;
    
}

// do a get sync request 
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttp.setRequestHeader("Ocp-Apim-Subscription-Key", "db8ae05af21c41a6bd81e8614049bd78");//e7137b278c984b36b2f9df5cade2a74a
    
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
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

/*
function getSumText(text){
    $.ajax({
        url: "https://api.aylien.com/api/v1/summarize",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Access-Control-Allow-Origin","*");
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
            xhrObj.setRequestHeader("X-AYLIEN-TextAPI-Application-ID","d211aca9");
            xhrObj.setRequestHeader("X-AYLIEN-TextAPI-Application-Key","ec91904f9ccf1f50344121e2cbe9f51e");
        },
        type: "POST",
        // Request body
        data: JSON.stringify({
            "text": text,
            "title": "ji",
            "sentences_percentage": 25,
        }),
        
    })
    .done(function(data) {
        console.log("SUMMZED");
        console.log(data);
        getTopics(data);
    })
    .fail(function(err) {
        console.log(err);
    });
}*/
