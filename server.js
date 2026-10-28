const express = require('express')

const app = express();
const port = process.env.PORT || 3000


let users = [
    {id: 1, name: 'Pawel'}
]

//zeby mzna bylo czytac jsony z body zapytania
app.use(express.json())




app.get('/', (req, res) => {
    res.send('Witaj w aplickacji Express!')
})

app.get('/contact', (req, res) => {
    res.send('Strona kontaktowa')
})

app.get('/api/info', (req, res) => {
    res.json({
        application: 'Express LAB4',
        version: "1.0"
    })
})

//endpoint wyszukiwania
app.get('/api/users/search', (req, res) => {
    const {name, page = 1} = req.query

    res.json({name,page})
})
//pobieranie adresu uzytkownika przez URL
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    res.json({
        message: 'Pobrano uzytkownika',
        id: id
    })
})

//metody http post, put, delete

/app.post('/api/users', (req, res) => {
    const {name} = req.body;

    if(!name || name.trim() === '')
    {
        return res.status(400).json({error: 'Wymagane pole name'})
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: name.trim()
    }

    users.push(newUser)
    res.status(201).json(newUser)
})


app.put('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id)
    const { name } = req.body
    
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Użytkownik do edycji nie istnieje' });
    }

    if (!name) {
        return res.status(400).json({ error: 'Brak danych do aktualizacji' });
    }

    users[userIndex].name = name;
    res.status(200).json(users[userIndex]);
})


app.delete('/api/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika do usunięcia' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
    console.log(`Serwer  dziala na porcie ${port}`)
})

