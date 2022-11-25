const socket = io();

document.querySelector("#message").addEventListener("keydown", (event) => {
    console.log(event);
    if (event.keycode === 13) {
        fetch("/chat/0", {
            method: "post",
            body: JSON.stringify({message: event.target.value}),
        })
        .then(() => {
            document.querySelector("#message").value = "";
        })
        .catch((error) => console.log(error))
    }
})

socket.on("chat:0", ({ sender, message, timestamp }) =>{
    console.log({ sender, message, timestamp })
})