// Constants
const GITHUB_USERNAME = 'jalenng'
// Matches a markdown comment with the text "Icon:" inside
const MD_ICON_COMMENT_REGEX = /(?<=<!--[ ]*Icon:[ ]*)([^ ]*)(?=[ ]*-->)/g

/**
 * Sends a request and returns a parsed response in JSON
 */ 
function getResponseFromRequest(url, type='GET') {
    const request = new XMLHttpRequest()
    request.open(type, url, false)
    request.send()
    return request.response
}

/**
 * Retrieves the list of public repositories for a given user
 */
function getRepos(user) {
    const repos = getResponseFromRequest(`https://api.github.com/users/${user}/repos?sort=pushed`)
    const reposParsed = JSON.parse(repos);
    return reposParsed
}

/**
 * Returns the URL of the repo's icon. This URL is retrieved from the repo's README.
 */
function getIconURL(user, repo) {  
    // Fallback image
    let imageURL = 'img/repos/code.png' // Fallback image

    // Get the readme 
    const response = getResponseFromRequest(`https://api.github.com/repos/${user}/${repo}/readme`)
    const responseParsed = JSON.parse(response)
    const readme = atob(responseParsed.content)

    // Try to match the comment with the icon comment tag in the README
    const imageURLMatch = readme.match(MD_ICON_COMMENT_REGEX)

    console.log(imageURLMatch)

    if (imageURLMatch) {
        imageURL = imageURLMatch[0]
    }

    return imageURL
}

/**
 * Populates the mainElem div with information about the repo.
 */
function createRepoElemPromise(repo) {

    return new Promise((resolve, reject) => {

        // Destructure repo object
        const name = repo.name
        const description = repo.description
        const numStargazers = repo.stargazers_count
        const language = repo.language

        // Get image URL from first imagetag
        let imageURL = getIconURL(GITHUB_USERNAME, name)

        /** Create the child elements */

        // Main
        const mainElem = document.createElement('a')
        mainElem.className = 'repo'
        mainElem.href = repo['svn_url']

        // Left
        const leftElem = document.createElement('div')
        leftElem.className = 'repo-left'

        // Right
        const rightElem = document.createElement('div')
        rightElem.className = 'repo-right'

        // Image
        const imageElem = document.createElement('img')
        imageElem.src = imageURL
        imageElem.className = 'repo-image'
        imageElem.alt = `${name} image`

        // Name/header
        const nameElem = document.createElement('h1')
        nameElem.innerText = name

        // Description
        const descriptionElem = document.createElement('p')
        descriptionElem.className = 'repo-description'
        descriptionElem.innerText = description

        // Stats badge
        const statsElem = document.createElement('div')
        statsElem.className = 'repo-stats'
        statsElem.innerText = `${language} • ⭐${numStargazers}`

        // Put it all together
        mainElem.appendChild(leftElem)      
        mainElem.appendChild(rightElem)

        leftElem.appendChild(imageElem)
        
        rightElem.appendChild(nameElem)
        rightElem.appendChild(statsElem)
        rightElem.appendChild(descriptionElem)

        resolve(mainElem);

    })

}

/** Start of execution */

// Get all repositories and filter them
let repos = getRepos(GITHUB_USERNAME)
repos = repos.filter(repo => !repo['archived'])

// Select repo div to populate
const reposDiv = document.querySelector('.repositories')

// Create the elements based on the repo information, and push them to the DOM
function createElements() {
    for (const repo of repos) {
        createRepoElemPromise(repo).then((repoElem) => {
            reposDiv.appendChild(repoElem)
        })
    }
}

setTimeout(createElements, 0)