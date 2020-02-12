# Steps to Setup
## Pre-requisities
 1. Node : v10.15.3
 2. NPM : v6.10.1

## Available Scripts
 1. Install dependencies
     ``npm install``
 2. Start Application
     ``npm start``
 3. Build Application
    ``npm run build``

# Architecture
	- Note taking app is a single page application using React.
	- Browser's local storage is being used to save and retrieve notes.
	- Material UI is used for UI components

# Component Tree
	- App.js
		- app-bar.component.jsx
		- show-notes.component.jsx
			- note-thumbnail.component.jsx
			- note-complete.component.jsx
		- create-note.component.jsx
			
# Implemented Features
	- Create new Note by providing mandatory fields i.e. category, title and description 
	- Edit Note
	- Delete Note
	- Search Note based on search term within title, category and description
	- Navigate through notes