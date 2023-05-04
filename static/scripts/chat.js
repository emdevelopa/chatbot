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

// // const userTexEl = document.querySelector(".userText")

// // userTexEl.addEventListener("click",()=>{
// //     console.log("hello");
// // })

// // const userTexSpanVal = document.querySelector(".userText span");
// // console.log(userTexSpanVal.innerHTML);

// //Timestamp Function

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

// //First  Bot Message

function firstBotMessage() {
    let firstMessage = "Hello I'm John, how can I help you?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime()


    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false)
}

firstBotMessage();

// function getHardResponse(userText) {
//     let botResponse = getBotResponse(userText);
//     let botHtml = '<p class="botText"><span>'+ botResponse +'</span></p>';

//     $("#chatbox").append(botHtml);

//     document.getElementById("chat-bar-bottom").scrollIntoView(true);
// }



// function getResponse() {
//     let userText = $("#textInput").val();
//     if (userText == "") {
//         userText = "I love EMWRLD"
//     }

//     let userHtml = '<p class="userText"><span>'+ userText +'</span></p>'

//     $("#textInput").val("");
//     $("#chatbox").append(userHtml);
//     document.getElementById("chat-bar-bottom").scrollIntoView(true)

//     setTimeout(() => {
//         getHardResponse(userText.toLowerCase())
//     }, 1000);

// }

// //Heart button response function

function buttonSendText(){
    let userText = $("#textInput").val();
    let userHtml = '<p class="userText"><span>'+ userText +'</span></p>'

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true)
        
}

// //Send Button

// function sendButton() {
   
//     getResponse(); 
//     generateResponse(userText)
// }

// //Heart Button
// function heartButton() {
//     buttonSendText("Heart Clicked")
// }

// //Listen to an Enter key
$("#textInput").keypress(function (e) {
        if (e.which == 13) {
            sendButton()
        }
    }
)

function sendButton() {
    let userText = $("#textInput").val();
    if (userText === "") {
        const emptyInputMsg = "Try Sending a message!"
        let botHtml = '<p class="botText"><span>'+ emptyInputMsg +'</span></p>';
    $("#chatbox").append(botHtml);
    }else{
        generateResponse(userText)
        buttonSendText()
    }
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

async function generateResponse(res) {
   
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/completions");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           
            let json_response = xhr.responseText;
            let response = JSON.parse(json_response);
            console.log(response);
            let sendres = response.choices[0].text;
            let userHtml = '<p class="botText"><span>'+ sendres +'</span></p>'
            $("#textInput").val("");
            setTimeout(() => {
                $("#chatbox").append(userHtml);
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
            }, 1000);
        }
    };
    xhr.onerror = function(){
        pasteResponse("Sorry, I didn't get that");
    }
    
    var data = JSON.stringify({
        "model": "text-davinci-003",
        "prompt": res,
        "max_tokens": 100,
        "temperature": 0,
        "top_p": 1,
        "frequency_penalty": 1,
        "presence_penalty": 0,
        "stop": [".\n"]
    });
    xhr.send(data);
};
