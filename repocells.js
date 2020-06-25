var url = "https://api.github.com/users/jalenng/repos?sort=pushed";
var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send();
var response = request.response;
var data = JSON.parse(response);
console.log(data);

carouselInit = "<div class=\"main-carousel\" data-flickity=\'{\"pageDots\": false, \"cellAlign\": \"left\", \"dragThreshold\": 10}\'>";

document.write(carouselInit);
for (var i = 0; i < data.length; i++) {
    repoData = data[i];
    cellClass = (repoData["archived"] ? "carousel-cell-archived" : "carousel-cell");
    url = repoData["svn_url"]
    header = "<h1 class=carousel-cell-header>" + repoData["name"] + "</h1>";

    pushedDate = "Pushed " + repoData["pushed_at"].substring(5, 10);
    lang = repoData["language"];
    status = (repoData["archived"] ? "<div class=carousel-cell-archived-status>" + lang + " • " + "Archived</div>" : "<div class=carousel-cell-status>" + lang + " • " + pushedDate + "</div>");

    info = "<div class=carousel-cell-info>" + repoData["description"] + "</div>";
    
    var cellCode = "<a class=" + cellClass + " href=\"" + url + "\">" + header + status + info + "</a>";
    document.write(cellCode);
}

document.write("</div>")