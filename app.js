const express = require('express');
const { projects } = require('./data.json');
const data = projects;

const port = 3000;

const app = express();

//Static file (css, images, js)
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


// Renders
app.get('/', (req, res) => {
    res.render('index', data.projects);
});
app.get('/about', (req, res) => {
    res.render('about', data.projects);
})
app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    console.dir(data[id].project_name);
    const project = data[id];
    res.render('project', project );
})



app.listen(port, () => {
    console.log(`The application is running on localhost: ${port}!`)
});