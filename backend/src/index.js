const express = require('express');
const cors = require('cors');
const { v4: uuid, validate: validateUuid } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

// middleware
function logRequests(request, response, next) {
	const { method, url } = request;
	const logLabel = `[${method.toUpperCase()}] ${url}`;

	console.time(logLabel);

	next(); // next middleware

	console.timeEnd(logLabel);
}

function validateProjectID(request, response, next) {
	const { id } = request.params;

	if (!validateUuid(id)) {
		return response.status(400).json({ error: 'invalid project ID' });
	}

	return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectID);

// routes
app.get('/projects', (request, response) => {
	const { title } = request.query;
	const results =
		title ? projects.filter((project) => project.title.includes(title)) :
		projects;

	return response.json(results);
});

app.post('/projects', (request, response) => {
	const { title, owner } = request.body;

	const project = { id: uuid(), title, owner };

	projects.push(project);

	return response.json(project);
});

// http://localhost/projects/2
app.put('/projects/:id', (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;

	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: 'project not found' });
	}

	const project = {
		id,
		title,
		owner
	};

	projects[projectIndex] = project;

	return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
	const { id } = request.params;

	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: 'project not found' });
	}

	projects.splice(projectIndex, 1);

	return response.status(204).send();
});

app.listen(3333, () => {
	console.log('back-end start 🐺🤟');
});
