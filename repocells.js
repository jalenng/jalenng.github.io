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
    status = (repoData["archived"] ? "<div class=carousel-cell-archived-status>Archived</div>" : "<div class=carousel-cell-status>Pushed " + repoData["pushed_at"].substring(5, 10) + "</div>");
    header = "<h1 class=carousel-cell-header>" + repoData["name"] + "</h1>";
    // subheader = "<h4 class=carousel-cell-subheader>" + repoData["full_name"] + "</h4>";
    info = "<div class=carousel-cell-info>" + repoData["description"] + "</div>";

     var cellCode = "<a class=" + cellClass + " href=\"" + url + "\">" + status + header /*+ subheader*/ + info + "</a>";
     document.write(cellCode);
}

document.write("</div>")