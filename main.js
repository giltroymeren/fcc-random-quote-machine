// http://stackoverflow.com/a/18775368
document.addEventListener('DOMContentLoaded', function(event) {
    var myUrl = "http://quotes.stormconsultancy.co.uk/quotes.json";
    var currentQuote = currentCite = "";

    var getNewQuote = function(array) {
        return array[Math.floor(Math.random() * (array.length + 1))];
    }

    var setNewQuote = function(array) {
        currentQuote = array["quote"];
        currentCite = array["author"];
        document.getElementById("quote-text").innerHTML = currentQuote;
        document.getElementById("quote-cite").innerHTML = currentCite;
    }

    function getFile(callback) {
        // http://stackoverflow.com/a/16825593
        var request = new XMLHttpRequest();
        request.onload = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback(request.responseText);
            }
        };
        request.open("GET", "http://cors.io/?u=" + myUrl, true);
        request.send();
    };

    var changeToRandomColor = function() {
        var colors = ["#073a80","#0846d5","#1354f2","#1e3fff","#3f2dff","#b352ff","#9fc8d5",
        "#8fb2b9","#739c8e","#63805b","#658052","#436337"];
        var rand = Math.floor(Math.random() * (colors.length + 1));
        document.querySelector("body").style.backgroundColor = colors[rand];

    }

    var callGetFile = function() {
        getFile(function(result) {
            setNewQuote(getNewQuote(JSON.parse(result)));
        });
    };

    callGetFile();
    changeToRandomColor();

    document.getElementById("submit").onclick = function() {
        callGetFile();
        changeToRandomColor();
    };

    document.getElementById("twitter").onclick = function() {
        this.href="https://twitter.com/intent/tweet?hashtags=quotes,programming," +
        "freecodecamp&related=freecodecamp&text=\"" + currentQuote + "\" - " +
        currentCite;
    };

    document.getElementById("tumblr").onclick = function() {
        this.href="https://www.tumblr.com/widgets/share/tool?" +
        "data-posttype=quote&data-tags=quotes,freecodecamp,programming&" +
        "data-content=" + encodeURIComponent(currentQuote) +
        "&data-caption=" + encodeURIComponent(currentCite);
    };
});
