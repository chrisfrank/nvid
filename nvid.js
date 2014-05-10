function nvid(elems, options) {

  // abort if there are no elements
  if (!elems || !document.addEventListener) {
    return true
  }

  // avoid confusion about where "this" points
  var self = this;

  // make sure elems is an array, even with just one elem
  elems = !!elems.nodeName ? [elems] : elems

  // attach click listeners to an element
  function activate(elem) {
    elem.addEventListener('click', stopClick, false)
    elem.addEventListener('click', replaceLinkWithVideo, false)
  }

  // this one fires every time
  function stopClick(event) {
    event.preventDefault()
  }

  // this one replaces the clicked-on element with a video, and fires just once
  function replaceLinkWithVideo(event){
    event.preventDefault()
    player = getPlayerFromHref(this.href)
    iframe = '<iframe src="' + player + '" frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen style="position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></iframe>'
    this.innerHTML = iframe
    styleVideo(this)
    this.removeEventListener(event.type, arguments.callee)
  }

  // return player URL from a YouTube Permalink
  function getPlayerFromHref(url) {
    var playerURL, regEx, videoID, protocol;
    protocol = location.protocol == "file:" ? "http:" : location.protocol
    playerURL = url
    if (url.match(/youtu/i)){
      regEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      videoID = url.match(regEx)[2]
      playerURL = protocol + "//www.youtube.com/embed/" + videoID  + "?autoplay=1"
    } else if (url.match(/vimeo/i)){
      videoID  = url.match(/vimeo.com\/(\d*)/i)[1]
      playerURL = protocol + "//player.vimeo.com/video/" + videoID + "?autoplay=1"
    }
    return playerURL
  }

  // make the video 16x9 and variable-width
  function styleVideo(video) {
    video.style.display = "block"
    video.style.width = "100%"
    video.style.height = "0"
    video.style.paddingBottom = "56.25%"
    video.style.overFlow = "hidden"
    video.style.position = "relative"
    video.style.background = "black"
  }

  // run activate for each member of elems
  function init(){
    for( var i = 0; i < elems.length; i ++) {
      if (elems[i].nodeName == "A") activate(elems[i])
    }
  }
  init()
  return this
}
