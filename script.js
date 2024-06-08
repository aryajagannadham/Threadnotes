document.getElementById('addTweetButton').addEventListener('click', addTweet);
document.getElementById('saveThreadButton').addEventListener('click', saveThread);
document.getElementById('deleteThreadButton').addEventListener('click', deleteThread);

function addTweet() {
    const tweetInput = document.getElementById('tweetInput');
    const tweetThread = document.getElementById('tweetThread');
    const tweetContent = tweetInput.value.trim();
    
    if (tweetContent === "") {
        alert("Tweet cannot be empty!");
        return;
    }

    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');
    
    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = tweetContent;
    
    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = formatTimestamp(new Date());
    
    tweetElement.appendChild(contentElement);
    tweetElement.appendChild(timestampElement);
    
    tweetThread.prepend(tweetElement); // Prepend the new tweet

    tweetInput.value = "";
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
    const tweetThread = document.getElementById('tweetThread');
    const tweets = tweetThread.getElementsByClassName('tweet');
    const thread = [];

    for (let tweet of tweets) {
        const content = tweet.getElementsByClassName('content')[0].textContent;
        const timestamp = tweet.getElementsByClassName('timestamp')[0].textContent;
        thread.push({ content, timestamp });
    }

    localStorage.setItem('tweetThread', JSON.stringify(thread));
    alert("Thread saved!");
}

function deleteThread() {
    if (confirm("Are you sure you want to delete the saved thread?")) {
        localStorage.removeItem('tweetThread');
        const tweetThread = document.getElementById('tweetThread');
        tweetThread.innerHTML = "";
    }
}

window.onload = function() {
    const savedThread = JSON.parse(localStorage.getItem('tweetThread'));

    if (savedThread) {
        const tweetThread = document.getElementById('tweetThread');
        tweetThread.innerHTML = "";

        for (let tweet of savedThread) {
            const tweetElement = document.createElement('div');
            tweetElement.classList.add('tweet');
            
            const contentElement = document.createElement('div');
            contentElement.classList.add('content');
            contentElement.textContent = tweet.content;
            
            const timestampElement = document.createElement('div');
            timestampElement.classList.add('timestamp');
            timestampElement.textContent = tweet.timestamp;
            
            tweetElement.appendChild(contentElement);
            tweetElement.appendChild(timestampElement);
            
            tweetThread.appendChild(tweetElement); // Keep the same order when loading
        }
    }
}
