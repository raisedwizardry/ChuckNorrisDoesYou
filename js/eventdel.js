const jokesdiv = document.getElementById("jokes");
const jokeList = document.getElementById("jokeList");
const jokeClickp = document.getElementById("jokeclick");
const enterjokes = document.getElementById("enterjokes")
jokeClickp.addEventListener('click', function (e) {
    let target = e.target;
    createJokes(3);
});
enterjokes.addEventListener('click', function (e) {
    let target = e.target;
    enterJokes();
});

function createJokes(number1) {
    fetchAsync(number1)
        .then(data => {
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

function enterJokes(){
    let text = document.getElementById("text").value;
    console.log(text);
    createJokes(text);
};

function listJokes(jokeObject) {
    let jokeli = document.createElement("li");
    jokeli.id = jokeObject.id;
    jokeli.innerHTML = jokeObject.joke;
    return jokeli;
};

async function fetchAsync(jokesN) {
    let response = await fetch('http://api.icndb.com/jokes/random/' + jokesN);
    let data = await response.json();
    return data;
};

function createUrl(endpoint, prop, val) {
    let url = endpoint + '?' + prop + '=' + val;
    return url;
};