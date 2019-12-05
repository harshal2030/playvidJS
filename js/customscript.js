var video = document.getElementById('video');
var pbar = document.getElementById('orange-juice');
var btn = document.getElementById('play-pause');
var ppbar = document.getElementById('orange-bar')
var volicon = document.getElementById('vol-icon')
var rbar = document.getElementById('rate-selector');
var back10 = document.getElementById('back');
var skip10 = document.getElementById('ago');
var duration = document.getElementById('duration-update')

var update = setInterval(function () {//display duration
    var mins = Math.floor(video.currentTime / 60);
    var secs = Math.floor(video.currentTime % 60);
    var max_min = Math.floor(video.duration / 60);
    var max_sec = Math.floor(video.duration % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    if (max_sec < 10) {
        max_sec = '0' + String(max_sec);
    }
    duration.innerHTML = mins + ':' + secs + '/' + max_min + ':' + max_sec;
}, 10);
//skip video 10 sec backward
back10.addEventListener('click', function (e) {
    if (video.ended) btn.innerHTML = '&#10074;&#10074';
    video.currentTime = video.currentTime - 10;
});
//skip video 10 sec forward
skip10.addEventListener('click', function (e) {
    video.currentTime = video.currentTime + 10;
})
//play-pause function
btn.addEventListener('click', function (e) {
    if (video.paused) {
        btn.innerHTML = '&#10074;&#10074;';
        video.play();
        document.getElementById('controls').classList.remove("controlsJS");
    }
    else {
        btn.innerHTML = '&#9658;';
        video.pause();
        document.getElementById('controls').classList.toggle("controlsJS");
    }
});
//play-pause video on click
video.addEventListener('click', function () {
    if (video.paused) {
        btn.innerHTML = '&#10074;&#10074;';
        video.play();
        document.getElementById('controls').classList.remove("controlsJS");
    }
    else {
        btn.innerHTML = '&#9658;';
        video.pause();
        document.getElementById('controls').classList.toggle("controlsJS");
    }
});
//update pos of bar
video.addEventListener('timeupdate', function () {
    var Pos = video.currentTime / video.duration;
    pbar.style.width = Pos * 100 + "%";
    if (video.ended) {
        btn.innerHTML = '&#10227;';
        document.getElementById('controls').classList.toggle("controlsJS");
    }
});
//play-pause video on pressing spacebar
document.addEventListener('keypress', function (e) {
    if (e.which || e.keyCode == 32) {
        if (video.paused) {
            btn.innerHTML = '&#10074;&#10074;';
            video.play();
            document.getElementById('controls').classList.remove("controlsJS");
        }
        else {
            btn.innerHTML = '&#9658;';
            video.pause();
            document.getElementById('controls').classList.toggle("controlsJS");
        }
    }
})
volicon.addEventListener('click', function () {
    if (volbar.value == 0) {
        volbar.value = 100;
        video.volume = 1;
        volicon.innerHTML = '&#128362;'
    }
    else {
        volbar.value = 0;
        video.volume = 0;
        volicon.innerHTML = '&#128360;'
    }
});


//enabling users to use seek to jump to any part to video
var timeDrag = false;
ppbar.addEventListener('mousedown', function (e) {
    timeDrag = true;
    updatebar(e.pageX)
});
document.addEventListener('mouseup', function (e) {
    if (timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
document.addEventListener('mousemove', function (e) {
    if (timeDrag) {
        updatebar(e.pageX);
    }
});

var updatebar = function (x) {
    var progress = document.getElementById('orange-bar');
    var maxdur = video.duration;
    var position = x - progress.getBoundingClientRect().left;
    var percent = 100 * position / progress.getBoundingClientRect().width;

    //check within range
    if (percent > 100) {
        percent = 100;
    }
    if (percent < 0) {
        percent = 0;
    }

    //update progress bar and video current time
    document.getElementById('orange-juice').style.width = percent + '%';
    video.currentTime = maxdur * percent / 100;
}

var volumeDrag = false;
document.getElementById('hold').addEventListener('mousedown', function (e) {
    volumeDrag = true;
    video.muted = false;
    updateVolume(e.pageX);
})

document.addEventListener('mouseup', function (e) {
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX)
    }
})
document.addEventListener('mousemove', function (e) {
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
})
var updateVolume = function (x, vol) {
    var volume = document.getElementById('hold');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.getBoundingClientRect().left;
        percentage = 100 * position / volume.getBoundingClientRect().width;
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and video volume
    document.getElementById('change').style.width = percentage + '%';
    video.volume = percentage / 100;
};
document.getElementById('fscreen').addEventListener('click', function () {
    document.getElementById('fscreen').classList.toggle('enteredFullScreen')
    if (video.webkitEnterFullscreen) {
        if (document.getElementById('fscreen').classList.contains('enteredFullScreen')) {
            document.getElementById('c-video').webkitRequestFullScreen();
        }
        else {
            document.webkitCancelFullScreen()
        }
    }
    else if (video.mozRequestFullScreen) {
        if (document.getElementById('fscreen').classList.contains('enteredFullScreen')) {
            document.getElementById('c-video').mozRequestFullScreen();
        }
        else {
            document.mozCancelFullScreen();
        }
    }
}, false)

var timer;
var fadeInBuffer = false;
document.getElementById("c-video").addEventListener("mousemove", function () {
    if (!fadeInBuffer) {
        if (timer) {
            clearTimeout(timer)
            timer = 0;
        }
    }
    else {
        document.getElementById('c-video').style.cursor = 'default';
        document.getElementById("controls").style.transform = "translateY(0)";
        fadeInBuffer = false;
    }

    timer = setTimeout(function () {
        document.getElementById("c-video").style.cursor = 'none';
        document.getElementById("controls").style.transform = "translateY(100%) translateY(-5px)";
        fadeInBuffer = true;
    }, 2000)
});
document.getElementById("c-video").style.cursor = "default";
//#####finished