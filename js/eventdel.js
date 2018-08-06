//http://api.icndb.com/jokes/random/2?firstName=John&lastName=Doe

const enterjokes = document.getElementById("enterjokes")
enterjokes.addEventListener('click', enterJokes);

function enterJokes(e){
    let jokeN = document.getElementById("joken").value;
    let firstN = document.getElementById("firstn").value;
    let lastN = document.getElementById("lastn").value;
    createJokes(jokesUrlCreator(jokeN, firstN, lastN));
    clearInputValueById("joken", "firstn", "lastn");
};

function createJokes(url) {
    fetchAsync(url)
        .then(data => {
            document.getElementById("jokeclick").innerHTML = showJokeCount(data.value.length);
            let jokesList = document.getElementById("jokesList");
            jokesList.innerHTML = "";
            for (var i = 0; i < data.value.length; i++) {
                var obj = data.value[i];
                jokesList.appendChild(listJokes(obj));
            }
        })
        .catch(reason => console.log(reason.message))
};

function showJokeCount(jokeN) {
    let jokeCount = "Here are " + jokeN + " Chuck Norris Jokes";
    return jokeCount;
};

function listJokes(jokeObject) {
    let jokeli = document.createElement("li");
    jokeli.id = jokeObject.id;
    jokeli.appendChild(addLink(jokeObject.joke));
    return jokeli;
};

function addLink(joketext) {
    let jokeA = document.createElement("a");
    jokeA.innerHTML = joketext;
    jokeA.href = "#/";
    jokeA.addEventListener("click", clickLink);
    return jokeA;
}

function clickLink(e) {
    e.target.href = "#" + this.parentNode.id + "/"
    console.log(e.target.parentNode.id);
}

function jokesUrlCreator(jokesN, firstN, lastN) {
    let endPoint, jokesUrl;
    if (isNaN(jokesN) || jokesN === "") {
        endPoint = 'http://api.icndb.com/jokes/random/1';
    }
    else { endPoint = 'http://api.icndb.com/jokes/random/' + jokesN; }
    if (firstN === "" || lastN === "") {
        jokesUrl = endPoint;
    }
    else { jokesUrl = urlHelper(endPoint, "firstName", firstN, "lastName", lastN); }
    return jokesUrl;
};

function urlHelper(endpoint, ...pairs) {
    let url = endpoint + '?';
    if (pairs.length > 1) {
        for (var i=0; i < pairs.length; i++) {
            if (i % 2 == 0) {
                url = url + '&' + pairs[i] + '=' + pairs[i+1];
            }
        }
    }
    return url;
};

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

function clearInputValueById(...id) {
    for (var i=0; i < id.length; i++) {
        document.getElementById(id[i]).value='';
    }
}