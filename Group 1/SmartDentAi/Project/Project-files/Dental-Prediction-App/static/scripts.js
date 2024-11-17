// function toggleChatbot() {
//     const chatbotWindow = document.getElementById("chatbot-window");
//     chatbotWindow.style.display = (chatbotWindow.style.display === "none" || chatbotWindow.style.display === "") ? "block" : "none";
// }

// const chatBox = document.querySelector(".chat-box");
// const messageInput = document.querySelector("#message-input");
// const sendBtn = document.querySelector("#send-btn");

// function addMessage(message, isUserMessage) {
//     const messageDiv = document.createElement("div");
//     messageDiv.classList.add("mt-3", "p-3", "rounded");

//     if (isUserMessage) {
//         messageDiv.classList.add("user-message");
//     } else {
//         messageDiv.classList.add("bot-message");
//     }

//     messageDiv.innerHTML = `
//         <p>${message}</p>
//     `;

//     chatBox.appendChild(messageDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }

// function sendMessage() {
//     const message = messageInput.value.trim();

//     if (message !== "") {
//         addMessage(message, true);
//         messageInput.value = "";  // Clear the input

//         fetch("/api", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ message })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.response) {
//                 addMessage(data.response, false);
//             } else {
//                 addMessage("Error: " + data.error, false);
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             addMessage("Error: " + error.message, false);
//         });
//     }
// }

// sendBtn.addEventListener("click", sendMessage);
// messageInput.addEventListener("keydown", event => {
//     if (event.keyCode === 13 && !event.shiftKey) {
//         event.preventDefault();
//         sendMessage();
//     }
// });






function toggleChatbot() {
    var chatbotWindow = document.getElementById("chatbot-window");
    chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "block" : "none";
}

document.getElementById("send-btn").addEventListener("click", async function () {
    const userInput = document.getElementById("message-input").value;

    if (userInput.trim() === "") return;

    // Display user input in chat box
    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + userInput;
    document.getElementById("chatbot-messages").appendChild(userMessage);

    // Send the user input to the Flask backend
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessage = document.createElement("div");
        botMessage.textContent = "Bot: " + data.response;
        document.getElementById("chatbot-messages").appendChild(botMessage);
    } catch (error) {
        console.error("Error communicating with chatbot:", error);
    }

    // Clear the input field
    document.getElementById("message-input").value = "";
});