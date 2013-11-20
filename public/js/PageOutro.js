function PageOutro()
{
	this.Label = "COMIC BOOK OUTRO";
	
	var mImgThanks;

	var page = this;

	this.Initialize = function()
	{
		document.getElementById('Canvas').addEventListener("click",this.Donate,false);
		document.getElementById('Canvas').addEventListener("touchstart",this.Donate,false);
		
		mImgThanks = this.Preload("images/outro/thanks.png");
		this.zIndex += 9;
	}

	this.Update = function(tick) {}
	
	this.Draw = function(surface)
	{
		surface.drawImage(mImgThanks, 160, 220);
	}

	//https://wish.org/ways-to-help/giving/donate

	this.Donate = function( event )
	{
		if (!page.Visible) return;
		if (event.pageX < 400) return;

		window.open("https://wish.org/ways-to-help/giving/donate");
	}

	PageBase.call(this);
	this.Width = 900;
	this.Height = 768;

}