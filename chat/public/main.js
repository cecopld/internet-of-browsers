$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize varibles
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  var html5FingerprintKey;

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  //
  function getMessageValue () {
    message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    return message;
  }

  function sendMessage (message) {
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  //fire notification
  //
  function notification (data) {
    var title,
        options;

    title = data.message;
    options = {
      body: data.username,
      tag: 'IoB',
      icon: "http://christof-bauer.de/iob/websockets/js64.png"
    };

    Notification.requestPermission(function(result) {
      var notification = new Notification(title, options);
      console.log("Result: " + result + " notification tag: " + notification.tag);
      console.log(data);
    });
  }

  // Keyboard events

  $window.keydown(function (event) {
    var inputValue;
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        inputValue = getMessageValue();
        sendMessage(inputValue);
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events
  $(".login-button").on("click touchstart", function (e) {
    e.preventDefault();
    setUsername();
    saveUserWirhFingerprint(html5FingerprintKey);
  });

  $(".fingerprint-login").on("click touchstart", function (e) {
    e.preventDefault();
    manageFingerprintUserKey();
  });

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Socket.IO Chat – ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    addChatMessage(data);
    notification(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });


  // ambient API
  if ('ondevicelight' in window) {
    changeDeviceLight();
  } else {
    console.log("ambient API is not supported");
  }

  function changeDeviceLight() {
    var threshold = 5;
    window.addEventListener('devicelight', function(event) {
      if(event.value < threshold && document.body.className !== "night") {
        document.body.className = "night";
      }
      else if(event.value > threshold && document.body.className !== "day") {
        document.body.className = "day";
      }
      console.log("The current value of light is " + event.value + " lux.");
      sendMessage("The current value of light is " + event.value + " lux.");
    });
  }

  // battery status
  window.navigator = window.navigator || {};

  function eventHandler(event) {
    sendMessage(event.type);
  }

  function addEvents(battery) {
    var events = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
    for (var i = 0; i < events.length; i++) {
      battery.addEventListener(events[i], eventHandler);
    }
  }

  if (!navigator.battery && !navigator.getBattery) {
    alert("Battery status API is not supported");
  }
  else {
    if (navigator.getBattery) {
      navigator.getBattery().then(function(battery) {
        addEvents(battery);
      });
    }
    else {
      addEvents(navigator.battery);
    }
  }



  function html5Fingerprint () {
    new Fingerprint2().get(function(result){
      html5FingerprintKey = result;
    });
  }

  function manageFingerprintUserKey () {
    var isUserExist = checkForUserWithFingerprint(html5FingerprintKey);
    if (!isUserExist) {
      alert("we dont have saved User with this fingerprint");
    }
    else {
      $usernameInput.val(username);
      setUsername();
    }
  }

  function saveUserWirhFingerprint (key) {
    var userData;
    if(typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      userData = {
        username: $usernameInput.val(),
        key: key
      };
      localStorage.setItem("html5fingerprint", JSON.stringify(userData));
    } else {
      // Sorry! No Web Storage support..
    }
  }

  function checkForUserWithFingerprint (key) {
    var userData = localStorage.getItem("html5fingerprint");
    userData = JSON.parse(userData);
    if (userData) {
      if (key === userData.key) {
        username = userData.username;
        return true;
      }
    }
    else {
      return false;
    }
  }

  html5Fingerprint();

});
