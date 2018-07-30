const jokeList = document.getElementById("jokeList");
const well = document.getElementById("well");
well.addEventListener('click', function (e) {
    let target = e.target;
    createJokes(3);
    console.log(e.target);
});

function createJokes(number1) {
    let jokeData = urlCall(number1);
    let jokesdiv = document.getElementById("jokes");
    jokesdiv.append(showJokeCount(jokeData.length));
    for (var i = 0; i < jokeData.length; i++) {
        var obj = jokeData[i];
        jokesList.append(listJokes(obj));
    }
};

function showJokeCount(jokeN) {
    let jokeCount = document.createElement("p");
    jokeCount.innerHTML = "Here are " + jokeN + " Chuck Norris Jokes";
    return jokeCount;
};

function listJokes(jokeObject) {
    let jokeli = document.createElement("li");
    jokeli.id = jokeObject.id;
    jokeli.innerHTML = jokeObject.joke;
    console.log(jokeli);
    return jokeli;
};

function urlCall(jokesN) {
    let chuckApi = 'http://api.icndb.com/jokes/random/' + jokesN;
    let storeJokes = doAjax(chuckApi);
    console.log(storeJokes);
    return storeJokes.responseJSON.value;
};

function doAjax(ajaxurl) {
    let result;
    try {
        result = $.ajax({
            url: ajaxurl,
            headers: { 'Accept': 'application/json' },
            success: function (result) {
                if (result.isOk == false) alert(result.message);
            },
            async: false,
        });
        return result;
    } catch (error) {
        console.error(error);
    }
};

function createUrl(endpoint, prop, val) {
    let url = endpoint + '?' + prop + '=' + val;
    return url;
};