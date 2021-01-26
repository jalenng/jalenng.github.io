// Function to send an OPEN request and return parsed response in JSON
function getResponseFromGetRequest(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    var response = request.response;
    return response
}

// Constants
const githubUsername = 'jalenng'
const markdownImageRegex = /!\[[^\]]+\]\([^)]+\)/g;
const markdownImageRegexBeginning = /!\[[^\]]+\]\(/g;

// Configure request to pull list of all repos
var allReposResponse = getResponseFromGetRequest('https://api.github.com/users/' + githubUsername + '/repos?sort=pushed');
var allRepos = JSON.parse(allReposResponse); 

// Configure repository flickity carousel
var repoDiv = document.querySelector('.repositories');
var repoCarousel = document.createElement('div');
repoCarousel.className = 'main-carousel';
repoCarousel.setAttribute('data-flickity', '{"pageDots": false, "cellAlign": "left", "dragThreshold": 10, "contain": true}');

// Populate flickity carousel
for (var i = 0; i < allRepos.length; i++) {

    // Get repo
    var repo = allRepos[i];
    var repoName = repo['name'];

    // Ignore archived repos
    if (!repo['archived']) {
        // Get repo readme content
        var repoReadmeContentResponse = getResponseFromGetRequest('https://api.github.com/repos/' + githubUsername + '/' + repoName + '/readme');
        var repoReadmeContent = JSON.parse(repoReadmeContentResponse); 
        
        // Get actual content of README.md 
        var repoReadmeText = getResponseFromGetRequest(repoReadmeContent['download_url'])

        // Get imagetags from actual content
        var repoImageTags = repoReadmeText.match(markdownImageRegex)

        // Get image URL from first imagetag
        var repoImageURL = null
        if (repoImageTags != null) {

            // Get first imagetag
            repoImageURL = repoImageTags[0];

            // Get the beginning part of the tag "![...]("
            var repoImageTagBeginning = repoImageURL.match(markdownImageRegexBeginning);

            // Remove the beginning part from imagetag
            repoImageURL = repoImageURL.replace(repoImageTagBeginning, '');

            // Remove the closing paranthesis at the end
            repoImageURL = repoImageURL.substring(0, repoImageURL.length - 1)

            // Check for https://
            if (repoImageURL.match(/https:\/\//g) == null) {
                repoImageURL = null;
            }
        }

        // Populate carousel cell
        var cell = document.createElement('a');
        cell.className = repo['archived'] ? 'carousel-cell-archived' : 'carousel-cell';
        cell.href = repo['svn_url'];

        if (repoImageURL != null) {
            var image = document.createElement('img');
            image.className = 'carousel-cell-image'
            image.src = repoImageURL;
            cell.appendChild(image);
        }

        var header = document.createElement('h1');
        header.className = 'carousel-cell-header';
        header.innerText = repoName;
        cell.appendChild(header);

        var badge = document.createElement('div');
        badge.className = 'carousel-cell-status'
        badge.innerText = repo['language'] + ' • ';
        badge.innerText += repo['archived'] ? 'Archived' : 'Pushed ' + repo['pushed_at'].substring(5, 10);
        cell.appendChild(badge);

        var info = document.createElement('div');
        info.className = 'carousel-cell-info';
        info.innerText = repo['description'];
        cell.appendChild(info);
        
        repoCarousel.appendChild(cell);
    }

}

repoDiv.appendChild(repoCarousel);