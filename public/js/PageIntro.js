function PageIntro()
{
	this.Label = "COMIC BOOK INTRO";
	
	var mImgArrow,
		mImgBadge,
		mImgLogo,
		mImgBlueStripe,
		mImgArrowBG;

	this.Initialize = function()
	{
		mImgArrow = this.Preload("images/intro/arrow.png");
		mImgArrowBG = this.Preload("images/intro/arrowBG.png");
		mImgBadge = this.Preload("images/intro/badge.png");
		mImgLogo = this.Preload("images/intro/logo.png");
		mImgBlueStripe = this.Preload("images/intro/blue_stripe.png");
		this.zIndex += 1;
	}

	this.Update = function(tick)
	{
		//console.log(this.X);
	}
	
	// could disable this when off-screen
	this.Draw = function(surface)
	{
		//console.log('eh');
		surface.drawImage(mImgArrowBG, 0, Comic.Instance.Height-148, Comic.Instance.Width-200, 79);
		surface.drawImage(mImgArrow, Comic.Instance.Width-730, Comic.Instance.Height-150);

		surface.drawImage(mImgLogo, Comic.Instance.TimelineMin + (Comic.Instance.Width/2)-(753/2), 85);

		surface.fillStyle = '#008cd5';
		surface.fillRect(0,18,Comic.Instance.Width,44);
		surface.drawImage(mImgBlueStripe, Comic.Instance.Width-499, 18)
		
		surface.drawImage(mImgBadge, Comic.Instance.TimelineMin + 20, 30);
		
		//surface.drawImage(mImgLogoSmall, Comic.Instance.Width + Comic.Instance.TimelineMin, -10);
	}

	PageBase.call(this); // inherit base
	this.Width = Comic.Instance.TimelineMin + Comic.Instance.Width;
	this.Height = 768;

}