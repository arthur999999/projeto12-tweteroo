import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const usersList = []

const tweets = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub"
    },
    {
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o hubi"
	}

]

app.post('/sign-up', (req, res)=> {
    const {username, avatar} = req.body
    if ( !username || !avatar ){
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }
    if (usersList.find((m)=> m.username == username) != undefined){
        res.status(400).send("nome de usuário já existente")
        return
    }
    const useer = {
        username: username,
        avatar: avatar
    }
    usersList.push(useer)
    res.status(201).send('OK')

})

app.get("/tweets", (req, res)=> {
    res.send(tweets)
})

app.post('/tweets', (req, res)=> {
    const {username, tweet} = req.body
    if ( !username || !tweet ){
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }
    const avatar = usersList.find((m)=> m.username == username).avatar
    const newTweet = {
        username: username,
        avatar: avatar,
        tweet: tweet
    }
    tweets.unshift(newTweet)
    if(tweets.length > 10){
        tweets.length = 10
    }
    res.status(201).send('OK')

})

app.listen(5000)