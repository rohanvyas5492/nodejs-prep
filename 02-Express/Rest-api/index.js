const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 8000;
const users = require('./data.json');

//Middleware for form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

//Getting all users in json format
app.get("/api/users", (req, res) => {
  console.log('Getting all users');
  res.json(users);
});

//Getting all users and rendering HTML
app.get("/users",(req,res)=>{
    const html = `<ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html)
});

//Getting single user based on id
app.get("/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    res.json(user);
});

//Creating another user
app.post("/users",(req,res)=>{
    users.push({
        id:users.length + 1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        job_title:req.body.job_title
    });
    //Writing to file
    fs.writeFile('data.json',JSON.stringify(users),(err)=>{
        return res.json({status:'success'});
    });
});

//Editing a user
app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id); // Extract user ID from request parameters
    const { first_name, last_name, email, gender, job_title } = req.body; // Extract updated user data from request body

    // Find the index of the user with the given ID
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) { // Check if the user with the given ID exists
        // Update user data
        users[userIndex] = {
            ...users[userIndex], // Keep the existing user properties
            first_name: first_name || users[userIndex].first_name, // Update first name if provided, otherwise keep existing value
            last_name: last_name || users[userIndex].last_name, // Update last name if provided, otherwise keep existing value
            email: email || users[userIndex].email, // Update email if provided, otherwise keep existing value
            gender: gender || users[userIndex].gender, // Update gender if provided, otherwise keep existing value
            job_title: job_title || users[userIndex].job_title // Update job title if provided, otherwise keep existing value
        };

        // Write updated user data to file
        fs.writeFile('data.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update user' });
            }
            return res.json({ status: 'success' });
        });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});


//Deleting a user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id); // Extract user ID from request parameters

    // Find the index of the user with the given ID
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) { // Check if the user with the given ID exists
        // Remove the user from the users array
        users.splice(userIndex, 1);

        // Write updated user data to file
        fs.writeFile('data.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete user' });
            }
            return res.json({ status: 'success' });
        });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});


app.listen(PORT,()=>console.log('Server started...'))