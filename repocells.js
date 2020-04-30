var url = "https://api.github.com/users/jalenng/repos?sort=pushed";
var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send();
var response = request.response;
var data = JSON.parse(response);
// console.log(data);

carouselInit = "<div class=\"main-carousel\" data-flickity=\'{\"pageDots\": false, \"cellAlign\": \"left\", \"dragThreshold\": 10}\'>";

document.write(carouselInit);
for (var i = 0; i < data.length; i++) {
    repoData = data[i];
    url = repoData["svn_url"]
    header = "<h1 class=carousel-cell-header>" + repoData["name"] + "</h1>";
    subheader = "<h4 class=carousel-cell-subheader>" + repoData["full_name"] + "</h4>";
    info = "Last pushed on " + repoData["pushed_at"].substring(5, 10);

     var cellCode = "<a class=\"carousel-cell\" href=\"" + url + "\">" + header + subheader + info + "</a>";
     document.write(cellCode);
}

document.write("</div>")