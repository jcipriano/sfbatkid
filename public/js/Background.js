function Background()
{
	this.Label = "COMIC BOOK BACKGROUND";	
	var mImgBackground,
		mImgLogo;

	this.Initialize = function()
	{
		mImgBackground = this.Preload("images/bg.jpg");
		mImgLogo = this.Preload("images/logo.png");
	}

	this.Update = function(tick)
	{
		//console.log(Comic.Instance.Timeline)
	}
	
	this.Draw = function(surface)
	{
		//Dbg.Print(this.Label + " // Draw");
		var tHeight = Comic.Instance.Height < this.Height ? 768 : Comic.Instance.Height;
		var tWidth = (tHeight/this.Height)*this.Width;
		var backgroundXPercentage = Comic.Instance.Timeline / Comic.Instance.TimelineMax;
		var backgroundX = Math.floor( backgroundXPercentage * (tWidth-Comic.Instance.Width) );
		//console.log( Comic.Instance.Timeline, Comic.Instance.TimelineMax, Comic.Instance.Width, backgroundXPercentage, (Comic.Instance.TimelineMax-Comic.Instance.Width) );
		
		surface.drawImage(mImgBackground, -backgroundX, 0, tWidth, tHeight);
		//surface.drawImage(mImgLogo, 0, 40 );
	}

	PageBase.call(this); // inherit base
	this.Width = 2392;
	this.Height = 768;
}