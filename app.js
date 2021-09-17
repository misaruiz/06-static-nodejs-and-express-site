const express = require('express');
// const { projects } = require('./data.json');
const data = require('./data.json');

const port = 3000;

const app = express();

//Static file (css, images, js)
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


// Renders
app.get('/', (req, res) => {
    const projects = data.projects;
    console.dir(projects);
    res.render('index', {projects});
});
app.get('/about', (req, res) => {
    res.render('about', data.projects);
})
app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const project = data.projects[id];
    res.render('project', project );
})



app.listen(port, () => {
    console.log(`The application is running on localhost: ${port}!`)
});