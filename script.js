document.addEventListener("DOMContentLoaded", () => {
    const tweetInput = document.getElementById("tweetInput");
    const addTweetButton = document.getElementById("addTweetButton");
    const saveThreadButton = document.getElementById("saveThreadButton");
    const deleteThreadButton = document.getElementById("deleteThreadButton");
    const tweetThread = document.getElementById("tweetThread");

    // Load saved tweets from local storage
    const savedTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    savedTweets.forEach(tweetObj => addTweetToThread(tweetObj.tweet, tweetObj.timestamp));

    addTweetButton.addEventListener("click", () => {
        const tweet = tweetInput.value.trim();
        if (tweet) {
            const timestamp = new Date().toLocaleString();
            addTweetToThread(tweet, timestamp);
            tweetInput.value = "";
        }
    });

    saveThreadButton.addEventListener("click", () => {
        const tweets = Array.from(document.querySelectorAll(".tweet")).map(tweetElement => {
            return {
                tweet: tweetElement.querySelector(".content").textContent,
                timestamp: tweetElement.querySelector(".timestamp").textContent
            };
        });
        localStorage.setItem("tweets", JSON.stringify(tweets));
        alert("Thread saved!");
    });

    deleteThreadButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete the entire thread?")) {
            localStorage.removeItem("tweets");
            tweetThread.innerHTML = "";
            alert("Thread deleted!");
        }
    });

    function addTweetToThread(tweet, timestamp) {
        const tweetElement = document.createElement("div");
        tweetElement.className = "tweet";
        
        const tweetContent = document.createElement("div");
        tweetContent.className = "content";
        tweetContent.textContent = tweet;

        const tweetTimestamp = document.createElement("div");
        tweetTimestamp.className = "timestamp";
        tweetTimestamp.textContent = timestamp;

        tweetElement.appendChild(tweetContent);
        tweetElement.appendChild(tweetTimestamp);
        tweetThread.appendChild(tweetElement);
    }
});
