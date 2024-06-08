document.getElementById('addNoteButton').addEventListener('click', addNote);
document.getElementById('saveThreadButton').addEventListener('click', saveThread);
document.getElementById('clearThreadButton').addEventListener('click', clearThread);
document.getElementById('reverseOrderButton').addEventListener('click', reverseOrder);

let isReversed = false;

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteThread = document.getElementById('noteThread');
    const noteContent = noteInput.value.trim();

    if (noteContent === "") {
        alert("Note cannot be empty!");
        return;
    }

    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = noteContent;

    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = formatTimestamp(new Date());

    noteElement.appendChild(contentElement);
    noteElement.appendChild(timestampElement);

    if (isReversed) {
        noteThread.appendChild(noteElement); // Append the new note at the end if reversed
    } else {
        noteThread.prepend(noteElement); // Prepend the new note if not reversed
    }

    noteInput.value = "";
}

function formatTimestamp(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleString('en-US', options);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${timeString} • ${day} ${month}, ${year}`;
}

function saveThread() {
    const noteThread = document.getElementById('noteThread');
    const notes = noteThread.getElementsByClassName('note');
    const thread = [];

    for (let note of notes) {
        const content = note.getElementsByClassName('content')[0].textContent;
        const timestamp = note.getElementsByClassName('timestamp')[0].textContent;
        thread.push({ content, timestamp });
    }

    localStorage.setItem('noteThread', JSON.stringify(thread));
    alert("Thread saved!");
}

function clearThread() {
    if (confirm("Are you sure you want to clear the thread?")) {
        localStorage.removeItem('noteThread');
        const noteThread = document.getElementById('noteThread');
        noteThread.innerHTML = "";
    }
}

function reverseOrder() {
    const noteThread = document.getElementById('noteThread');
    const notes = Array.from(noteThread.children);
    noteThread.innerHTML = "";

    notes.reverse().forEach(note => noteThread.appendChild(note));

    isReversed = !isReversed;
}

window.onload = function() {
    const savedThread = JSON.parse(localStorage.getItem('noteThread'));

    if (savedThread) {
        const noteThread = document.getElementById('noteThread');
        noteThread.innerHTML = "";

        for (let note of savedThread) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');

            const contentElement = document.createElement('div');
            contentElement.classList.add('content');
            contentElement.textContent = note.content;

            const timestampElement = document.createElement('div');
            timestampElement.classList.add('timestamp');
            timestampElement.textContent = note.timestamp;

            noteElement.appendChild(contentElement);
            noteElement.appendChild(timestampElement);

            noteThread.appendChild(noteElement); // Keep the same order when loading
        }

        if (isReversed) {
            reverseOrder(); // Ensure the order is correct after loading
        }
    }
}
