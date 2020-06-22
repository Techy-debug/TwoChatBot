const xlsx = require('xlsx')
const axios = require('axios')

function users() {

    return new Promise( (resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then( res => resolve(res))
        .catch(e => reject(e))
    })
           
}

function emojis() {
    return new Promise( (resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(res => resolve(res))
        .catch(e => reject(e))
    })
}

// const newWb = xlsx.utils.book_new()
// const newWS = xlsx.utils.json_to_sheet(JSON.stringify(arr))

// xlsx.utils.book_append_sheet(newWb, newWs, 'NewData')

// xlsx.writeFile(newWb, 'newFile.xlsx')

users().then( users => {
    emojis().then(emojis => {
        

        let data = [
            {
              "login": "mojombo",
              "id": 1,
              "node_id": "MDQ6VXNlcjE=",
              "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/mojombo",
              "html_url": "https://github.com/mojombo",
              "followers_url": "https://api.github.com/users/mojombo/followers",
              "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
              "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
              "organizations_url": "https://api.github.com/users/mojombo/orgs",
              "repos_url": "https://api.github.com/users/mojombo/repos",
              "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
              "received_events_url": "https://api.github.com/users/mojombo/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "defunkt",
              "id": 2,
              "node_id": "MDQ6VXNlcjI=",
              "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/defunkt",
              "html_url": "https://github.com/defunkt",
              "followers_url": "https://api.github.com/users/defunkt/followers",
              "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
              "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
              "organizations_url": "https://api.github.com/users/defunkt/orgs",
              "repos_url": "https://api.github.com/users/defunkt/repos",
              "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
              "received_events_url": "https://api.github.com/users/defunkt/received_events",
              "type": "User",
              "site_admin": false
            }
        ]
        users = users.data
        emojis = emojis.data
        
        const newWb = xlsx.utils.book_new()
        const newWSUsers = xlsx.utils.json_to_sheet(users)
        const newWSEmojis = xlsx.utils.json_to_sheet(emojis)

        xlsx.utils.book_append_sheet(newWb, newWSUsers, 'users')
        xlsx.utils.book_append_sheet(newWb, newWSEmojis, 'emojis')
        xlsx.utils.book_append_sheet(newWb, data, 'sample')

        xlsx.writeFile(newWb, 'newapi.xlsx')
    })
})
.catch( e => console.log('error:' + e))