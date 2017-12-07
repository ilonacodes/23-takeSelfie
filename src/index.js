var video = document.querySelector('#stream');
var canvas = document.querySelector('canvas');
var image = document.querySelector('img#taken_photo');
var takePhotoBn = document.querySelector('#take_photo');
var downloadPhotoBtn = document.querySelector('#download');
var deletePhotoButton = document.querySelector('#delete');

navigator.getMedia = (navigator.getUserMedia);

navigator.getUserMedia(
    {
        video: true
    },
    // Success Callback
    function(stream){

        video.src = window.URL.createObjectURL(stream);
        video.play();

    },
    function(err){
        console.error(err);

    }
);

function takePhoto() {

    // the size of the video element
    var widthVideoElem = video.videoWidth;
    var heightVideoElem = video.videoHeight;

    // the obj for working with the canvas
    var context = canvas.getContext('2d');

    // the size of the canvas
    canvas.width = widthVideoElem;
    canvas.height = heightVideoElem;

    // draw a copy
    context.drawImage(video, 0, 0, widthVideoElem, heightVideoElem);

    // get image dataURL from the canvas
    var imageDataURL = canvas.toDataURL('image/png');

    image.setAttribute('src', imageDataURL);

    downloadPhotoBtn.href = imageDataURL;
}

takePhotoBn.addEventListener('click', function (e) {
   takePhoto();
   video.classList.add('invisible');
   video.pause();
});

deletePhotoButton.addEventListener('click', function (e) {
    image.setAttribute('src', '');
    video.classList.remove('invisible');
    video.play();
});
