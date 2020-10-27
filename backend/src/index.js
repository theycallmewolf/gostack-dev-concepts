const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
	return response.json([
		'projeto 1',
		'projeto 2'
	]);
});

app.post('/projects', (request, response) => {
	return response.json([
		'projeto 1',
		'projeto 2',
		'projeto 3'
	]);
});

// http://localhost/projects/2
app.put('/projects/:id', (request, response) => {
	return response.json([
		'projeto 4',
		'projeto 2',
		'projeto 3'
	]);
});

app.delete('/projects/:id', (request, response) => {
	return response.json([
		'projeto 2',
		'projeto 3'
	]);
});

app.listen(3333, () => {
	console.log('back-end start 🐺🤟');
});
