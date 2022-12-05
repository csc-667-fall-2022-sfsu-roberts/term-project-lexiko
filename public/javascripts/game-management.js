const gamesList = document.querySelector("#games-list ul");

socket.on("game:created", ({ game_id, title }) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  
  span.innerText = title;
  
  const form = document.createElement("form");
  form.action = `/api/games/${game_id}/join`
  form.method = "post";

  const button = document.createElement("button");
  button.innerText = "Join game";
  
  form.appendChild(button);

  li.appendChild(span);
  li.appendChild(form);

  gamesList.appendChild(li);
});