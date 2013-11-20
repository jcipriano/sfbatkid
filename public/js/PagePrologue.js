function PagePrologue()
{
	this.Label = "COMIC BOOK PROLOGUE";
	
	var mImgVideoFrame,
		mImgVideoMask,
		videoElement,
		videoCanvas,
		videoCanvas2d,
		videoPlaying = false,
		videoPaused = false;

	videoElement = document.getElementById('Video');
	videoCanvas = document.createElement('canvas');
	videoCanvas.setAttribute('width',978);
	videoCanvas.setAttribute('height',550);
	videoCanvas2d = videoCanvas.getContext('2d');

	var page = this;

	this.Initialize = function()
	{
		mImgVideoFrame = this.Preload("images/prologue/video.png");
		mImgVideoMask = this.Preload("images/prologue/videoMask.png");

		//document.getElementById('Canvas').addEventListener("click",this.StartVideo,false);
		//document.getElementById('Canvas').addEventListener("touchstart",this.StartVideo,false);
		this.zIndex += 0;
	}

	this.Update = function(tick) {
		//console.log(this.Interpolator);
		
		if (!videoPlaying && this.Interpolator > 0.5) {
			this.StartVideo();
		}
		

		if (!videoPaused && videoPlaying && this.Interpolator > 1.5) {
			videoElement.pause();
			videoPaused = true;
		}

		if (videoPaused && this.Interpolator < 1.5) {
			videoElement.play();
			videoPaused = false;
		}
		
	}
	
	this.Draw = function(surface)
	{
		surface.save();
		//surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.2, 0.6);
		surface.drawImage(mImgVideoFrame, 20, 100 - (60*Interpolation.easeOutQuad(surface.globalAlpha))+60);

		if (videoPlaying && !bowser.mobile && !bowser.safari) {
			videoCanvas2d.save();
			videoCanvas2d.drawImage( videoElement, 0, 0, 978, 550 );
			videoCanvas2d.globalCompositeOperation = 'destination-in';
			videoCanvas2d.drawImage( mImgVideoMask, 0, 0);
			videoCanvas2d.restore();
			surface.drawImage( videoCanvas, 34, 165 - (60*Interpolation.easeOutQuad(surface.globalAlpha))+60 );
		}

		surface.restore();
	}

	this.StartVideo = function( event )
	{
		if (!page.Visible) return;
		if (videoPlaying) return;

		videoPlaying = true;
		videoElement.play();
	}

	this.GetPosition = function(event) {
		if (!page.Visible) return;

		var x,y;
		var element = document.getElementById('Canvas');
		var offsetX = 0, offsetY = 0

		if (element.offsetParent) {
			do {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			} while (element = element.offsetParent);
		}

		x = event.pageX - offsetX;
		y = event.pageY - offsetY;
		console.log( x, y );
	}

	PageBase.call(this); // inherit base
	this.Width = 1024;
	this.Height = 768;

}