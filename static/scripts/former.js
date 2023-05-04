const coll = document.getElementsByClassName("collapsible")
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
}

//Timestamp Function

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    if (hours < 10) {
        hours = "0" + hours
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
}

//First  Bot Message

function firstBotMessage() {
    let firstMessage = "How is it going?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime()


    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false)
}

firstBotMessage();

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>'+ botResponse +'</span></p>';

    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}



function getResponse() {
    let userText = $("#textInput").val();
    if (userText == "") {
        userText = "I love EMWRLD"
    }

    let userHtml = '<p class="userText"><span>'+ userText +'</span></p>'

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true)

    setTimeout(() => {
        getHardResponse(userText.toLowerCase().trim())
    }, 1000);

}

//Heart button response function

function buttonSendText(sampleText){
    let userHtml = '<p class="userText"><span>'+ sampleText +'</span></p>'
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Send Button

function sendButton() {
    getResponse(); 
}

//Heart Button
function heartButton() {
    buttonSendText("Heart Clicked")
}

//Listen to an Enter key
$("#textInput").keypress(function (e) {
        if (e.which == 13) {
            getResponse();
        }
    }
)
Footer
