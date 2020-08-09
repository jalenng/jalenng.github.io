var url = 'https://api.github.com/users/jalenng/repos?sort=pushed';
var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send();
var response = request.response;
var data = JSON.parse(response);
// console.log(data);

var repoDiv = document.querySelector('.repositories');
var repoCarousel = document.createElement('div');
repoCarousel.className = "main-carousel";
repoCarousel.setAttribute('data-flickity', '{"pageDots": false, "cellAlign": "left", "dragThreshold": 10, "contain": true}');

for (var i = 0; i < data.length; i++) {
    repoData = data[i];
    var cell = document.createElement('a');
    cell.className = repoData["archived"] ? 'carousel-cell-archived' : 'carousel-cell';
    cell.href = repoData["svn_url"];

    var header = document.createElement('h1');
    header.className = "carousel-cell-header";
    header.innerText = repoData["name"];
    cell.appendChild(header);

    var badge = document.createElement('div');
    badge.className = repoData["archived"] ? 'carousel-cell-archived-status' : 'carousel-cell-status'
    badge.innerText = repoData["language"] + ' • ';
    badge.innerText += repoData["archived"] ? 'Archived' : 'Pushed ' + repoData["pushed_at"].substring(5, 10);
    cell.appendChild(badge);

    var info = document.createElement('div');
    info.className = 'carousel-cell-info';
    info.innerText = repoData["description"];
    cell.appendChild(info);
    
    repoCarousel.appendChild(cell);
}

repoDiv.appendChild(repoCarousel);