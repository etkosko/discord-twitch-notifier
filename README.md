# Discord twitch real time live notifier
- By entering /twitchalert [user], the user allows the user to send a message to the desired channel with the desired message when user on living.
- It will pull the data entered via mongodb via events/social alert.js and process it that way.

GET Twitch Acces Token 

1- Create App on tw dev console https://dev.twitch.tv/console/apps and copy clientid & client secret
```
const log = "https://id.twitch.tv/oauth2/token?client_id=<client_id>&client_secret=<clientsecret>&grant_type=client_credentials"

fetch(`${log}` ,{
    method: "POST"
}).then(res => {
    res.json().then(response => {
        console.log(response)
    })
})
```
