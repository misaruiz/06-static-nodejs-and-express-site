const express = require('express');
const data = require('./data/data.json');

const port = 3000;

const app = express();

//Static file (css, images, js)
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

// Renders
app.get('/', (req, res) => {
    const projects = data.projects;
    res.render('index', {projects});
});
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/project/:id', (req, res, next) => {
    const { id } = req.params;
    const numOfProjects = Object.keys(data.projects).length;

    if (typeof id === 'number' || id == parseInt(id)) {
        if (parseInt(id) < numOfProjects) {
            const project = data.projects[id];
            res.render('project', project );
        } else {
            next();
        }   
    } else {
        next();
    }
});

// Handle 404 Errors
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle other Errors
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    // Special page for 404 Errors
    if (err.status === 404) {
        res.render('page-not-found', err);
    } else {
        res.render('error');
    }
    
});


app.listen(port, () => {
    console.log(`The application is running on localhost: ${port}!`)
});