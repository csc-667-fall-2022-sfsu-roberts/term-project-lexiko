const socket = io();

document
  .querySelector("#message-field")
  .addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      console.log(document.querySelector("#message-field").value)
      fetch("/chat/0", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: event.target.value }),
      })
        .then(() => {
          document.querySelector("#message-field").value = "";
        })
        .catch((error) => console.log(error));
    }
  });

const messages = document.querySelector("#messages");

socket.on("chat:0", ({ sender, message, timestamp }) => {
  const template = document.querySelector("#message");

  const content = template.content.cloneNode(true);
  content.querySelector(".sender").innerText = sender + ": ";
  content.querySelector(".content").innerText = message;
  content.querySelector(".timestamp").innerText = timestamp;

  messages.appendChild(content);
});