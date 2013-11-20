function Page4()
{
	this.Label = "COMIC BOOK PAGE 4";
	
	var mImgPanel1,
		mImgPanel2,
		mImgPanel3,
		mImgPanel4,
		mImgPanel5,
		mImgPanel6,
		mImgPanel7,
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
		mImgPanel1 = this.Preload("images/p4/panel1.png");
		mImgPanel2 = this.Preload("images/p4/panel2.png");
		mImgPanel3 = this.Preload("images/p4/panel3.png");
		mImgPanel4 = this.Preload("images/p4/panel4.png");
		mImgPanel5 = this.Preload("images/p4/panel5.png");
		mImgPanel6 = this.Preload("images/p4/panel6.png");
		mImgPanel7 = this.Preload("images/p4/panel7.png");

		mImgBubble1 = this.Preload("images/p4/bubble1.png");
		mImgBubble2 = this.Preload("images/p4/bubble2.png");
		mImgBubble3 = this.Preload("images/p4/bubble3.png");
		mImgBubble4 = this.Preload("images/p4/bubble4.png");
		mImgBubble5 = this.Preload("images/p4/bubble5.png");
		mImgBubble6 = this.Preload("images/p4/bubble6.png");
		mImgBubble7 = this.Preload("images/p4/bubble7.png");
		mImgBubble8 = this.Preload("images/p4/bubble8.png");
		this.zIndex += 6;
	}

	this.Update = function(tick) {}
	
	this.Draw = function(surface)
	{
		this.DrawPanels(surface);
		this.DrawSpeech(surface);
	}

	this.DrawPanels = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.9);
		surface.drawImage(mImgPanel2, 194, 136 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.3, 0.6);
		surface.drawImage(mImgPanel1, 5, 372 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.85, 1.05);
		surface.drawImage(mImgPanel3, 690, 95 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.3);
		surface.drawImage(mImgPanel4, 913, 295 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.3, 1.4);
		surface.drawImage(mImgPanel5, 1250, 340 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.45, 1.65);
		surface.drawImage(mImgPanel6, 1655, 220 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.65, 1.85);
		surface.drawImage(mImgPanel7, 1826, 70 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30); 
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.4, 0.5);
		surface.drawImage(mImgBubble1, -44, 552 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.7, 0.8);
		surface.drawImage(mImgBubble2, 314, 12 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 0.9);
		surface.drawImage(mImgBubble3, 542, 348 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.2);
		surface.drawImage(mImgBubble4, 812, -20 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.5);
		surface.drawImage(mImgBubble5, 950, 108 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.25, 1.35);
		surface.drawImage(mImgBubble6, 1210, 230 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble7, 1490, 508 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.9, 2.0);
		surface.drawImage(mImgBubble8, 2022, 20 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2200;
	this.Height = 768;

}