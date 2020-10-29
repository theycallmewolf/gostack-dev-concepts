import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import './App.css';
import backgroundImage from './assets/background.jpg';

function App() {

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('/projects').then(response => {
			setProjects(response.data);
		})
	}, []);

	async function handleAddProject() {
		// setProjects([...projects, `Novo projeto ${Date.now()}`]);
		const response = await api.post('/projects', {
			title: `Novo projeto ${Date.now()}`,
			owner: 'Lobatinni',
		});

		const project = response.data;
		setProjects([...projects, project]);

	}

	return (
		<>
			<Header title="Projects" />

			<ul>
				{projects.map(project => <li key={project.id}>{project.title}</li>)}
			</ul>

			<button type="button" onClick={handleAddProject}>Adicionar projeto</button>

			<br />
			{/* <img width={300} src={ backgroundImage }/> */}
		</>
	);
}

export default App;
