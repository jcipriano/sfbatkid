function Page2()
{
	this.Label = "COMIC BOOK PAGE 2";
	
	var mImgPanel1,
		mImgPanel2,
		mImgPanel3,
		mImgPanel4,
		mImgPanel5,
		mImgPanel6,
		mImgPanel7,
		mImgPanel8,
		mImgPanel9,
		mImgBubble1,
		mImgBubble2,
		mImgBubble3,
		mImgBubble4,
		mImgBubble5,
		mImgBubble6,
		mImgBubble7,
		mImgBubble8;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p2/panel1.png");
		mImgPanel2 = this.Preload("images/p2/panel2.png");
		mImgPanel3 = this.Preload("images/p2/panel3.png");
		mImgPanel4 = this.Preload("images/p2/panel4.png");
		mImgPanel5 = this.Preload("images/p2/panel5.png");
		mImgPanel6 = this.Preload("images/p2/panel6.png");
		mImgPanel7 = this.Preload("images/p2/panel7.png");
		mImgPanel8 = this.Preload("images/p2/panel8.png");
		mImgPanel9 = this.Preload("images/p2/panel9.png");
		mImgBubble1 = this.Preload("images/p2/bubble1.png");
		mImgBubble2 = this.Preload("images/p2/bubble2.png");
		mImgBubble3 = this.Preload("images/p2/bubble3.png");
		mImgBubble4 = this.Preload("images/p2/bubble4.png");
		mImgBubble5 = this.Preload("images/p2/bubble5.png");
		mImgBubble6 = this.Preload("images/p2/bubble6.png");
		mImgBubble7 = this.Preload("images/p2/bubble7.png");
		mImgBubble8 = this.Preload("images/p2/bubble8.png");

		this.zIndex += 2;
	}

	this.Update = function(tick) {
		//console.log(this.LocalTime);
	}
	
	this.Draw = function(surface)
	{	
		this.DrawPanels(surface);
		this.DrawSpeech(surface);
	}

	this.DrawPanels = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.3, 0.5);
		surface.drawImage(mImgPanel1, 25, 107 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.5, 0.8);
		surface.drawImage(mImgPanel2, 279, 147 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.1);
		surface.drawImage(mImgPanel3, 770, 114 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.3);
		surface.drawImage(mImgPanel4, 1100, 132 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.15, 1.35);
		surface.drawImage(mImgPanel5, 1080, 370 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.6);
		surface.drawImage(mImgPanel6, 1400, 110 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.55, 1.65);
		surface.drawImage(mImgPanel7, 1345, 595 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30); 
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.7);
		surface.drawImage(mImgPanel8, 1730, 273 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.65, 1.75);
		surface.drawImage(mImgPanel9, 1810, 442 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 0.9);
		surface.drawImage(mImgBubble1, 314, 12 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.0);
		surface.drawImage(mImgBubble2, 536, 102 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.0, 1.1);
		surface.drawImage(mImgBubble3, 760, 130);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.2);
		surface.drawImage(mImgBubble4, 894, 64);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.0, 1.1);
		surface.drawImage(mImgBubble5, 752, 306 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.5);
		surface.drawImage(mImgBubble6, 966, 246 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble7, 1275, 290 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.7, 1.8);
		surface.drawImage(mImgBubble8, 1502, 36 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2050;
	this.Height = 768;

}