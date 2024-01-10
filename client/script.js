import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

// creating ID selector for HTML manually
const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

// Loading the answers

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}
// getting the characters under the specific index
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//generating a unique random ID
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (`
    <div class= "wrapper ${isAi && "ai"}">

  <div class = "chat">
    <div class = "profile">
       <img
        src = ${isAi ? bot : user}
        alt = "${isAi ? "bot" : "user"}"
       />
     </div>
   <div class = "message" id=${uniqueId}>${value}</div>
    </div>
</div>

    `);
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // bots chat stripe chatstripe

  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  //fetching data from server
  
  // console.log("form data",data)
};
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});

 