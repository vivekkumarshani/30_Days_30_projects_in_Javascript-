const noteContainer = document.querySelector(".notes-container");
const CreateNotes = document.querySelector(".createNote");
let notes = document.querySelectorAll(".input_box");

// Function to display notes from localStorage
function showNotes() {
  if (localStorage.getItem("notes")) {
    noteContainer.innerHTML = localStorage.getItem("notes");

    // Re-add the delete functionality to the images after loading from localStorage
    const deleteIcons = noteContainer.querySelectorAll("img");
    deleteIcons.forEach((img) => {
      img.addEventListener("click", function () {
        img.parentElement.remove();
        updateStorage();
      });
    });

    // Make sure contenteditable elements trigger updateStorage on input change
    const noteBoxes = noteContainer.querySelectorAll(".input_box");
    noteBoxes.forEach((note) => {
      note.addEventListener("input", function () {
        updateStorage();
      });
    });
  }
}
showNotes();

// Function to update localStorage with the latest notes
function updateStorage() {
  localStorage.setItem("notes", noteContainer.innerHTML);
}

// Create new note when the "CreateNote" button is clicked
CreateNotes.addEventListener("click", function () {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input_box";
  inputBox.setAttribute("contenteditable", "true");

  img.src = "images/delete.png";
  img.style.cursor = "pointer"; // Make the delete icon look clickable

  // Append the note and delete icon to the container
  inputBox.appendChild(img);
  noteContainer.appendChild(inputBox);

  // Add the delete functionality to the new note
  img.addEventListener("click", function () {
    inputBox.remove();
    updateStorage();
  });

  // Add the input event listener to save changes in contenteditable
  inputBox.addEventListener("input", function () {
    updateStorage();
  });

  // Update localStorage after creating a new note
  updateStorage();
});

// Ensure that notes are saved when deleted or edited
noteContainer.addEventListener("input", function () {
  updateStorage();
});

``


// This is my code I compair all things in the morning 

// const noteContainer = document.querySelector(".notes-container");
// const CreateNotes = document.querySelector(".createNote");
// let notes = document.querySelectorAll(".input_box");

// function showNotes() {
//   noteContainer.innerHTML = localStorage.getItem("notes");
// }
// showNotes();

// function updateStorage() {
//   localStorage.setItem("notes", noteContainer.innerHTML);
// }

// CreateNotes.addEventListener("click", function () {
//   let inputBox = document.createElement("p");
//   let img = document.createElement("img");
//   inputBox.className = "input_box";
//   inputBox.setAttribute("contenteditable", "true");
//   img.src = "images/delete.png";
//   noteContainer.appendChild(inputBox).appendChild(img);
// });

// noteContainer.addEventListener("click", function (e) {
//   if (e.target.tagName === "IMG") {
//     e.target.parentElement.remove();

//     updateStorage();
//   } else if (e.target.tagName === "P") {
//     notes = document.querySelectorAll(".input_box");
//     notes.forEach((nt) => {
//       nt.oneyup = function () {
//         updateStorage();
//       };
//     });
//   }
// });

// when i refresh the browser then all items are removed from localstorage please check where are code error