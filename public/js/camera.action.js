navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

function start () {
	"use stric";

	var onFailSoHard = function () {
		console.log("Fail!");
	};
	
	video = document.createElement("video");
	video.id = "video";
	video.width = "400";
	video.height = "300";
	video.autoplay = "autoplay";
	
	container.appendChild(video);
	
	navigator.getUserMedia("video", function (LocalMediaStream) {
		video.src = window.webkitURL.createObjectURL(LocalMediaStream);
		lider = true;

		var canvas = document.createElement("canvas"),
			sourceX = 0,
			sourceY = 0,
			sourceWidth = "400",
			sourceHeight = "300";

		canvas.width = "400"
		canvas.height = "300";

		(function refresh () {
			canvas.getContext("2d").drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight);
			var data = canvas.toDataURL("image/png");
			socket.emit("client", {
				"message": data
			});

			setTimeout(function () { refresh() }, 250);
		}());

		/*(function refresh() {

			// Execute itself in Request Animation Frame
			webkitRequestAnimationFrame(refresh);
			
			canvas.getContext("2d").drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight);
			var data = canvas.toDataURL("image/png");
			socket.emit("client", {
				"message": data
			});
		}());*/

	}, onFailSoHard);
};

function stop () {
	container.removeChild(video);
	delete video;
};

var canvas = document.createElement("canvas"),
	container = document.querySelector(".container"),
	img = document.createElement("img"),
	video,
	$shoot = $("#start");
	$stop = $("#stop"),
	socket = io.connect("http://192.168.0.15:3030"),
	video = document.querySelector("video"),
	server = function (data) {
		container.appendChild(img);
		img.src = data.message;
		
		return function (data) {
			img.src = data.message;
		};
	},
	lider = false;

img.width = "400";
img.height = "300";

$shoot.on("click", start);
$stop.on("click", stop);
socket.on("server", server);