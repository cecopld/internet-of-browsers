# internet-of-browsers

![HTML5](images/HTML51.png)


# Abstract
When speaking about the internet of things, what we really mean is browsers, as they are the interface to those things.
Browsers do more than just presenting content; they allow us to gather information about our surroundings and make changes to our environment. The inspiration for this project comes from a talk at FutureJS-Conference in September 2015 in Barcelona held by Ben Foxall. (https://www.youtube.com/watch?v=frWlRtT5UCU)

# Note
  While we speak of "HTML5 APIs", many of these APIs aren't part of the HTML5 specifications. So, technically speaking, many of them aren't actually HTML5 APIs.


# APIs we investigated:


| API   | Specifications |  Support | Live demo |
| ----- | :------------: |  :-----: | :-------: |
| Ambient Light API| [Specifications](http://www.w3.org/TR/ambient-light/) | [Support](http://caniuse.com/#feat=ambient-light) | [Live demo](http://aurelio.audero.it/demo/ambient-light-api-demo.html)
| Battery Status API| [Specifications](http://www.w3.org/TR/battery-status/) | [Support](http://caniuse.com/#feat=battery-status) | [Live demo](http://aurelio.audero.it/demo/battery-status-api-demo.html)
| Device Orientation API| [Specifications](http://www.w3.org/TR/orientation-event/) | [Support](http://caniuse.com/#feat=deviceorientation) | [Live demo](http://aurelio.audero.it/demo/device-orientation-api-demo.html)
| Geolocation API| [Specifications](http://www.w3.org/TR/geolocation-API/) | [Support](http://caniuse.com/#feat=geolocation) | [Live demo](http://aurelio.audero.it/demo/geolocation-api-demo.html)
| getUserMedia API| [Specifications](http://www.w3.org/TR/mediacapture-streams/) | [Support](http://caniuse.com/#feat=stream) | [Live demo](http://aurelio.audero.it/demo/getusermedia-api-demo.html)
| Proximity API| [Specifications](http://www.w3.org/TR/proximity/) | [Support](http://caniuse.com/#feat=proximity) | [Live demo](http://aurelio.audero.it/demo/proximity-api-demo.html)
| Screen Orientation API| [Specifications](http://www.w3.org/TR/screen-orientation/) | [Support](http://caniuse.com/#feat=screen-orientation) | [Live demo](http://aurelio.audero.it/demo/screen-orientation-api-demo.html)
| Vibration API| [Specifications](http://www.w3.org/TR/vibration/) | [Support](http://caniuse.com/#feat=vibration) | [Live demo](http://aurelio.audero.it/demo/vibration-api-demo.html)
| Web Notification API| [Specifications](http://www.w3.org/TR/notifications/) | [Support](http://caniuse.com/#feat=notifications) | [Live demo](http://aurelio.audero.it/demo/web-notifications-api-demo.html)
| Network Information API| [Specifications](http://w3c.github.io/netinfo/) | [Support](http://caniuse.com/#feat=netinfo)| [Live demo](http://aurelio.audero.it/demo/network-information-api-demo.html)


# Learnings
* HTML5-APIs are not (yet) supported in a manner, that you can use them without hacks. Especially if you want to integrate desktop and mobile together.
* Pages like caniuse.com are misleading... Better: the information of browser vendors are misleading!
* Fingerprinting is even easier with HTML5-APIs:

If you think that IP address, cookies and HTTP headers are the only factors used to uniquely identify and track users around the web… you are terribly wrong! Actually nearly every HTML5-API can be used to gather unique information about a user. Thanks to new HTML5 standards, developers can access sensible user information or device hardware in some cases without the need to ask for permissions. The following APIs are currently exploited:

* Canvas: This is a nasty, stealth and (with javascript enabled) almost unstoppable technique, utilized actively since 2012, occasionally embedded in widely used scripts. When the browser visits a webpage with a canvas fingerprinting script, it is instructed to draw a hidden graphic that gets converted to a token. The uniqueness of the token depends by factors like browser, operating system and installed graphics hardware.

* Battery Status: According to researches Battery Status API is able to get level, charging time and discharging time of device battery. All this data combined together is nearly unique for each device and battery status, potentially allowing the tracking of activities on the web.

* WebRTC: You should disable WebRTC if you don’t use it. WebRTC leaks your local IP and might leak your IP on VPN (on Windows) other than be another factor used to fingerprint your system.

* Resource Timing: Developers can use this API to collect complete timing information related to resources on a document. Concerns involving privacy are expressed in the Working Draft: "Statistical fingerprinting is a privacy concern where a malicious web site may determine whether a user has visited a third-party web site by measuring the timing of cache hits and misses of resources in the third-party web site.".

* Geolocation: If enabled can reveal your physical location compromising your privacy. Modern browsers always ask permission to reveal geo location to websites and apps requesting it.

* Hardware fingerprinting: A paper titled "Hardware Fingerprinting Using HTML5" shows that hardware like GPU (modern browsers use hardware acceleration), camera, speakers and mic,  motion sensors, GPS and battery can all be accessed with HTML5 (not always with user permission) and in particular GPU can effectively be used to fingerprint users.

# Outcome
We built a little chat application that runs on websockets, uses the Web Notification, Ambient Light and Battery Status API. Changes in battery status and/or ambient light are reported via notifications. The chat-data is broadcasted via the websocket-server.


# Status of APIs
| API   | Status |  Caveats | ... |
| ----- | :------------: |  :-----: | :-------: |
| Ambient Light API| Poor  | - | ...
| Battery Status API| Poor  | - | ...
