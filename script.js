"use strict";

const table = document.querySelector(".booktable");
const resetButton = document.querySelector("#reset");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#addBook");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputYear = document.querySelector("#year");
const inputGenre = document.querySelector("#genre");
const inputRead = document.querySelector("#read");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");

const myLibrary = [];

class Book {
	constructor(title, author, date, genre, read) {
		this.title = title;
		this.author = author;
		this.date = date;
		this.genre = genre;
		this.read = read;
		this.id = crypto.randomUUID();
	}

	toggleReadStatus() {
		this.read = !this.read;
	}
}

resetButton.addEventListener("click", setupLibrary);

addBookButton.addEventListener("click", () => {
	dialog.show();
});

submitButton.addEventListener("click", (event) => {
	addBook(
		inputTitle.value,
		inputAuthor.value,
		inputYear.value,
		inputGenre.value,
		inputRead.checked
	);
	event.preventDefault();
	document.getElementById("new-book").reset();
	dialog.close();
});

cancelButton.addEventListener("click", () => {
	document.getElementById("new-book").reset();
	dialog.close();
});

function addBook(title, author, date, genre, read) {
	const newBook = new Book(title, author, date, genre, read);
	myLibrary.push(newBook);
	updateTable();
}

function removeBook(bookId) {
	const bookIndex = myLibrary.findIndex((e) => e.id === bookId);
	if (bookIndex > -1) {
		myLibrary.splice(bookIndex, 1);
	}
	updateTable();
}

function toggleRead(bookId) {
	myLibrary.find((e) => e.id === bookId).toggleReadStatus();
	updateTable();
}

function setupLibrary() {
	myLibrary.length = 0;
	addBook("Pride and Prejudice", "Jane Austen", 1813, "Romance", true);
	addBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Romance", true);
	addBook("To Kill a Mockingbird", "Harper Lee", 1960, "Southern", false);
	addBook("1984", "George Orwell", 1949, "Dystopia", false);
	addBook("Frankenstein", "Mary Shelley", 1818, "Horror", false);
	addBook("Crime and Punishment", "Fyodor Dostoevsky", 1866, "Crime", false);
}

function updateTable() {
	while (table.childElementCount > 1) {
		table.removeChild(table.lastChild);
	}
	myLibrary.forEach((e) => {
		const tableRow = document.createElement("tr");
		const title = document.createElement("td");
		const author = document.createElement("td");
		const date = document.createElement("td");
		const genre = document.createElement("td");
		const read = document.createElement("td");
		const readButtonCell = document.createElement("td");
		const removeButtonCell = document.createElement("td");
		const toggleReadButton = document.createElement("button");
		const removeButton = document.createElement("button");

		title.innerText = e.title;
		author.innerText = e.author;
		date.innerText = e.date;
		genre.innerText = e.genre;
		read.innerText = e.read ? "Yes" : "No";

		toggleReadButton.innerText = "toggle";
		toggleReadButton.addEventListener("click", () => toggleRead(e.id));

		removeButton.innerText = "remove";
		removeButton.addEventListener("click", () => removeBook(e.id));

		readButtonCell.appendChild(toggleReadButton);
		removeButtonCell.appendChild(removeButton);
		tableRow.appendChild(title);
		tableRow.appendChild(author);
		tableRow.appendChild(date);
		tableRow.appendChild(genre);
		tableRow.appendChild(read);
		tableRow.appendChild(readButtonCell);
		tableRow.appendChild(removeButtonCell);
		table.appendChild(tableRow);
	});
}
