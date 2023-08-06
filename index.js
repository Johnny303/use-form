import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import fs from "fs";
const dataRoute = './users.json'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/pub`, express.static(path.join(__dirname, `client`, `public`)));

app.get(`/public/script.js`,(req, res) => {
    res.sendFile(path.join(__dirname, `client`, `public`, `client`));

});

app.get(`/`, (req,res) => {
    res.sendFile(path.join(__dirname, `client`, `index.html`));
});

app.get(`/api/users`, (req, res) => {
    fs.readFile(`./users.json`, `utf-8`, (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data).users;
        res.send(users)
    });
});

app.get(`/api/users/:userId`, (req, res) => {
    fs.readFile(`./users.json`, `utf-8`, (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data).users;
        const userId = parseInt(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({state: `User not found`});
        }
    });
});


  app.get('/users/edit', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.patch('/api/users/:userId', (req, res) => {
    fs.readFile(dataRoute, 'utf8', (err, data) => {
      if (err) throw err;
  
      const {users} = JSON.parse(data);
      const userId = parseInt(req.params.userId);
      const user = users.find(user => user.id === userId);
  
      if (user) {
        user.name.first = req.body.name.first;        
        user.name.last = req.body.name.last;        
        user.name.middle = req.body.name.middle;        
        user.email = req.body.email;        
        user.shipping.country = req.body.shipping.country;        
        user.shipping.zip = req.body.shipping.zip;        
        user.shipping.city = req.body.shipping.city;        
        user.shipping.address = req.body.shipping.address;        
        user.invoice.country = req.body.invoice.country;        
        user.invoice.zip = req.body.invoice.zip;        
        user.invoice.city = req.body.invoice.city;        
        user.invoice.address = req.body.invoice.address;        
        fs.writeFile(dataRoute, JSON.stringify({users}), (err) => {
          if (err) throw err;
        });
        
        res.send({state: "DONE"});
      } else {
        res.status(404).send({state: 'User not found'});
      }
    });
  });
app.put('/api/users/:userId', (req, res) => {
    fs.readFile(dataRoute, 'utf8', (err, data) => {
      if (err) throw err;
  
      const {users} = JSON.parse(data);
      const userId = parseInt(req.params.userId);
      const user = users.find(user => user.id === userId);
  
      if (user) {
        user.name.first = req.body.name.first;        
        user.name.last = req.body.name.last;        
        user.name.middle = req.body.name.middle;        
        user.email = req.body.email;        
        user.shipping.country = req.body.shipping.country;        
        user.shipping.zip = req.body.shipping.zip;        
        user.shipping.city = req.body.shipping.city;        
        user.shipping.address = req.body.shipping.address;        
        user.invoice.country = req.body.invoice.country;        
        user.invoice.zip = req.body.invoice.zip;        
        user.invoice.city = req.body.invoice.city;        
        user.invoice.address = req.body.invoice.address;        
        fs.writeFile(dataRoute, JSON.stringify({users}), (err) => {
          if (err) throw err;
        });
        
        res.send({state: "DONE"});
      } else {
        res.status(404).send({state: 'User not found'});
      }
    });
  });

  app.delete('/api/users/:userId', (req, res) => {
    fs.readFile(dataRoute, 'utf8', (err, data) => {
      if (err) throw err;
  
      const { users } = JSON.parse(data);
      const userId = parseInt(req.params.userId);
      const user = users.find(user => user.id === userId);
  
      if (user) {
  
        fs.writeFile(dataRoute, JSON.stringify({ users: users.filter((x) => x !== user) }), (err) => {
          if (err) throw err;
        });
  
        res.send({ state: "DONE" });
      } else {
        res.status(404).send({ state: 'User not found' });
      }
    });
  });

  app.post('/api/users/:userId', (req, res) => {
    fs.readFile(dataRoute, 'utf8', (err, data) => {
      if (err) throw err;
  
      const {users} = JSON.parse(data);
      const lastUser = users[users.length - 1];
      const newUser = {
          id: lastUser.id + 1,
          name:{first: req.body.name.first, last: req.body.name.last, middle: req.body.name.middle },           
          email: req.body.email,      
          invoice:{country: req.body.invoice.country, zip: req.body.invoice.zip, address: req.body.invoice.address, city: req.body.invoice.city },      
          shipping:{country: req.body.shipping.country, zip: req.body.shipping.zip, address: req.body.shipping.address, city: req.body.shipping.city },                  
      }
      users.push(newUser);
  
      fs.writeFile(dataRoute, JSON.stringify({users}), (err) => {
        if (err) throw err;
      });
  
      res.send({state: "DONE"});
    });
  });



  app.listen(3000, () => {
    console.log( "open this link in your browser: http://127.0.0.1:3000")
});
