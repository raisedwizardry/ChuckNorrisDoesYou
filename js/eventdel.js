//http://api.icndb.com/jokes/random/2?firstName=John&lastName=Doe
const jokeClickp = document.getElementById("jokeclick");
const enterjokes = document.getElementById("enterjokes")
enterjokes.addEventListener('click', enterJokes);

function enterJokes(e){
    let jokeN = document.getElementById("joken").value;
    let firstN = document.getElementById("firstn").value;
    let lastN = document.getElementById("lastn").value;
    createJokes(jokesUrlCreator(jokeN, firstN, lastN));
};

function createJokes(url) {
    fetchAsync(url)
        .then(data => {
            console.log(data)
            jokeClickp.innerHTML = showJokeCount(data.value.length);
            for (var i = 0; i < data.value.length; i++) {
                var obj = data.value[i];
                jokesList.appendChild(listJokes(obj));
            }
        })
        .catch(reason => console.log(reason.message))
};

function showJokeCount(jokeN) {
    let jokeCount = "Here are " + jokeN + " Chuck Norris Jokes. Click for more";
    return jokeCount;
};

function listJokes(jokeObject) {
    let jokeli = document.createElement("li");
    jokeli.id = jokeObject.id;
    jokeli.innerHTML = jokeObject.joke;
    return jokeli;
};

function jokesUrlCreator(jokesN, firstN, lastN) {
    let endPoint = 'http://api.icndb.com/jokes/random/' + jokesN;
    let jokesUrl = urlHelper(endPoint, "firstName", firstN, "lastName", lastN);
    return jokesUrl;
};

function urlHelper(endpoint, prop, val, ...pairs) {
    let url = endpoint + '?' + prop + '=' + val;
    if (pairs.length > 1) {
        for (var i=0; i < pairs.length; i++) {
            if (i % 2 == 0) {
                url = url + '&' + pairs[i] + '=' + pairs[i+1];
            }
        }
    }
    console.log(url);
    return url;
};

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};