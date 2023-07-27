// var $messages = $(".messages-content"),
//   d,
//   h,
//   m,
//   i = 0;

// $(window).load(function () {
//   $messages.mCustomScrollbar();
//   setTimeout(function () {
//     fakeMessage();
//   }, 100);
// });

// function updateScrollbar() {
//   $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
//     scrollInertia: 10,
//     timeout: 0
//   });
// }

// function setDate() {
//   d = new Date();
//   if (m != d.getMinutes()) {
//     m = d.getMinutes();
//     $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
//       $(".message:last")
//     );
//   }
// }

// function insertMessage() {
//   msg = $(".message-input").val();
//   if ($.trim(msg) == "") {
//     return false;
//   }
//   $('<div class="message message-personal">' + msg + "</div>")
//     .appendTo($(".mCSB_container"))
//     .addClass("new");
//   setDate();
//   $(".message-input").val(null);
//   updateScrollbar();
//   setTimeout(function () {
//     fakeMessage();
//   }, 1000 + Math.random() * 20 * 100);
// }

// $(".message-submit").click(function () {
//   insertMessage();
// });

// $(window).on("keydown", function (e) {
//   if (e.which == 13) {
//     insertMessage();
//     return false;
//   }
// });

// var Fake = [
//   "you",
//   "지은 뿐이야",
//   "나 이거 만드느라 고생했어.",
//   "여보 뭐해?",
//   "휴 힘들다...",
//   "That's awesome",
//   "Codepen is a nice place to stay",
//   "I think you're a nice person",
//   "Why do you think that?",
//   "Can you explain?",
//   "Anyway I've gotta go now",
//   "It was a pleasure chat with you",
//   "Time to make a new codepen",
//   "Bye",
//   ":)"
// ];

// function fakeMessage() {
//   if ($(".message-input").val() != "") {
//     return false;
//   }
//   $(
//     '<div class="message loading new"><figure class="avatar"><img src="https://www.pikpng.com/pngl/b/109-1099794_ios-emoji-emoji-iphone-ios-heart-hearts-spin.png" /></figure><span></span></div>'
//   ).appendTo($(".mCSB_container"));
//   updateScrollbar();

//   setTimeout(function () {
//     $(".message.loading").remove();
//     $(
//       '<div class="message new"><figure class="avatar"><img src="https://www.pikpng.com/pngl/b/109-1099794_ios-emoji-emoji-iphone-ios-heart-hearts-spin.png" /></figure>' +
//         Fake[i] +
//         "</div>"
//     )
//       .appendTo($(".mCSB_container"))
//       .addClass("new");
//     setDate();
//     updateScrollbar();
//     i++;
//   }, 1000 + Math.random() * 20 * 100);
// }



$(function(){  // $(document).ready shorthand
  $('.monster').fadeIn('slow');
  $('.monster').fadeOut('slow');
});

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},1500);
                    
            }
            
        }); 
    
    });
    
});

$(document).ready(function(){
	$(this).scroll(function(){
		var $winheight = $(window).height();// get height of window
		var $winPos = $(document).scrollTop() + $winheight - 50;// get postion of scroll bar then add the window height and subtrack 50px, creating position 50 px above the bottom of the screen.
			$('.bg-move').each(function(){ // do this for each image
				var $pos = $(this).offset().top; //get the position for image
				if ($winPos > $pos){ // if the image is above the winPos do this
					$(this).addClass('animate');
				}
				else {// remove else if you want animation to happen once. 
					$(this).removeClass('animate');
				}
				// $('.pos').text($pos +' // '+ $winPos); // for testing 
			});
		});
});


/* .chatbot code section .chatbot code section .chatbot code section .chatbot code section */



const accessToken = '3796899bd37c423bad3a21a25277bce0'
const baseUrl = 'https://api.api.ai/api/query?v=2015091001'
const sessionId = '20150910';
const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`
const errorMessage = 'My apologies, I\'m not avail at the moment, however, feel free to call our support team directly 0123456789.'
const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
const $document = document
const $chatbot = $document.querySelector('.chatbot')
const $chatbotMessageWindow = $document.querySelector('.chatbot__message-window')
const $chatbotHeader = $document.querySelector('.chatbot__header')
const $chatbotMessages = $document.querySelector('.chatbot__messages')
const $chatbotInput = $document.querySelector('.chatbot__input')
const $chatbotSubmit = $document.querySelector('.chatbot__submit')

const botLoadingDelay = 1000
const botReplyDelay = 2000

document.addEventListener('keypress', event => {
  if (event.which == 13) validateMessage()
}, false)

$chatbotHeader.addEventListener('click', () => {
  toggle($chatbot, 'chatbot--closed')
  $chatbotInput.focus()
}, false)

$chatbotSubmit.addEventListener('click', () => {
  validateMessage()
}, false)

const toggle = (element, klass) => {
  const classes = element.className.match(/\S+/g) || [],
    index = classes.indexOf(klass)
  index >= 0 ? classes.splice(index, 1) : classes.push(klass)
  element.className = classes.join(' ')
}

const userMessage = content => {
  $chatbotMessages.innerHTML += `<li class='is-user animation'>
      <p class='chatbot__message'>
        ${content}
      </p>
      <span class='chatbot__arrow chatbot__arrow--right'></span>
    </li>`
}

const aiMessage = (content, isLoading = false, delay = 0) => {
  setTimeout(() => {
    removeLoader()
    $chatbotMessages.innerHTML += `<li 
      class='is-ai animation' 
      id='${isLoading ? "is-loading" : ""}'>
        <div class="is-ai__profile-picture">
          <svg class="icon-avatar" viewBox="0 0 32 32">
            <use xlink:href="#avatar" />
          </svg>
        </div>
        <span class='chatbot__arrow chatbot__arrow--left'></span>
        <div class='chatbot__message'>${content}</div>
      </li>`
    scrollDown()
  }, delay)
}

const removeLoader = () => {
  let loadingElem = document.getElementById('is-loading')
  if (loadingElem) $chatbotMessages.removeChild(loadingElem)
}

const escapeScript = unsafe => {
  const safeString = unsafe
    .replace(/</g, ' ')
    .replace(/>/g, ' ')
    .replace(/&/g, ' ')
    .replace(/"/g, ' ')
    .replace(/\\/, ' ')
    .replace(/\s+/g, ' ')
  return safeString.trim()
}

const linkify = inputText => {
  return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`)
}

const validateMessage = () => {
  const text = $chatbotInput.value
  const safeText = text ? escapeScript(text) : ''
  if (safeText.length && safeText !== ' ') {
    resetInputField()
    userMessage(safeText)
    send(safeText)
  }
  scrollDown()
  return
}

const multiChoiceAnswer = text => {
  const decodedText = text.replace(/zzz/g, "'")
  userMessage(decodedText)
  send(decodedText)
  scrollDown()
  return
}

const processResponse = val => {
  if (val && val.fulfillment) {
    let output = ''
    let messagesLength = val.fulfillment.messages.length

    for (let i = 0; i < messagesLength; i++) {3
      let message = val.fulfillment.messages[i]
      let type = message.type

      switch (type) {
        // 0 fulfillment is text
        case 0:
          let parsedText = linkify(message.speech)
          output += `<p>${parsedText}</p>`
          break

        // 1 fulfillment is card
        case 1:
          let imageUrl = message.imageUrl
          let imageTitle = message.title
          let imageSubtitle = message.subtitle
          let button = message.buttons[0]
          
          if(!imageUrl && !button && !imageTitle && !imageSubtitle) break

          output += `
            <a class='card' href='${button.postback}' target='_blank'>
              <img src='${imageUrl}' alt='${imageTitle}' />
            <div class='card-content'>
              <h4 class='card-title'>${imageTitle}</h4>
              <p class='card-title'>${imageSubtitle}</p>
              <span class='card-button'>${button.text}</span>
            </div>
            </a>
          `
          break

        // 2 fulfillment is a quick reply with multi-choice buttons
        case 2:
          let title = message.title
          let replies = message.replies
          let repliesLength = replies.length
          output += `<p>${title}</p>`

          for (let i = 0; i < repliesLength; i++) {
            let reply = replies[i]
            let encodedText = reply.replace(/'/g, 'zzz')
            output += `<button onclick='multiChoiceAnswer("${encodedText}")'>${reply}</button>`
          }
          break
      }
    }
    
    removeLoader()
    return output
  }

  removeLoader()
  return `<p>${errorMessage}</p>`
}

const setResponse = (val, delay = 0) => {
  setTimeout(() => {
    aiMessage(processResponse(val))
  }, delay)
}

const resetInputField = () => {
  $chatbotInput.value = ''
}

const scrollDown = () => {
  const distanceToScroll =
    $chatbotMessageWindow.scrollHeight -
    ($chatbotMessages.lastChild.offsetHeight + 60)
  $chatbotMessageWindow.scrollTop = distanceToScroll
  return false
}

const send = (text = '') => {
  fetch(`${baseUrl}&query=${text}&lang=en&sessionId=${sessionId}`, {
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json; charset=utf-8'
    }
  
  })
  // .then(response => response.json())
  // .then(res => {
  //   if (res.status < 200 || res.status >= 300) {
  //     let error = new Error(res.statusText)
  //     throw error
  //   }
  //   return res
  // })
  // .then(res => {
  //   setResponse(res.result, botLoadingDelay + botReplyDelay)
  // })
  // .catch(error => {
  //   setResponse(errorMessage, botLoadingDelay + botReplyDelay)
  //   resetInputField()
  //   console.log(error)
  // })

  aiMessage(loader, true, botLoadingDelay)
}



