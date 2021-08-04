/**
 * Sends an OPEN request and returns a parsed response in JSON
 */ 
function getResponseFromGetRequest(url) {
    const request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()

    return request.response
}

/**
 * Retrieves the list of public repositories for a given user
 */
function getRepos(user) {
    const repos = getResponseFromGetRequest(`https://api.github.com/users/${user}/repos?sort=pushed`)
    const reposParsed = JSON.parse(repos);
    return reposParsed
}

/**
 * Returns the text of the readme file in a given user and repository
 */
function getReadme(user, repo) {
    const contents = getResponseFromGetRequest(`https://api.github.com/repos/${user}/${repo}/readme`)
    const contentsParsed = JSON.parse(contents)
    const text = getResponseFromGetRequest(contentsParsed['download_url'])
    return text
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

        // Get repo readme content
        const readme = getReadme(GITHUB_USERNAME, name)

        // Get imagetags from content
        const imageTags = readme.match(MD_IMAGE_REGEX)

        // Get image URL from first imagetag
        let imageURL = 'img/repos/code.png' // Fallback image

        if (imageTags) {

            // Get first imagetag
            let firstTag = imageTags[0]

            // Get the beginning part of the tag '![...]('
            const imageTagBeginning = firstTag.match(MD_IMAGE_REGEX_BEGIN)

            // Remove the beginning part from imagetag
            firstTag = firstTag.replace(imageTagBeginning, '')

            // Remove the closing paranthesis at the end
            firstTag = firstTag.substring(0, firstTag.length - 1)

            // Check for https://
            if (firstTag.match(/https:\/\//g)) {
                imageURL = firstTag
            }
        }

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

// Constants
const GITHUB_USERNAME = 'jalenng'
const MD_IMAGE_REGEX = /!\[[^\]]+\]\([^)]+\)/g
const MD_IMAGE_REGEX_BEGIN = /!\[[^\]]+\]\(/g

// Get all repositories and filter them
let repos = getRepos(GITHUB_USERNAME)
repos = repos.filter(repo => !repo['archived'])

// Select repo div to populate
const reposDiv = document.querySelector('.repositories')

// Create the elements based on the repo information, and push them to the DOM
for (const repo of repos) {
    createRepoElemPromise(repo).then((repoElem) => {
        reposDiv.appendChild(repoElem)
    })
}


