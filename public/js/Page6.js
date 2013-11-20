function Page6()
{
	this.Label = "COMIC BOOK PAGE 6";
	
	var mImgPanel1,
		mImgPanel2,
		mImgPanel3,
		mImgPanel4,
		mImgPanel5,
		mImgPanel6,
		mImgBubble1,
		mImgBubble2,
		mImgBubble3;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p6/panel1.png");
		mImgPanel2 = this.Preload("images/p6/panel2.png");
		mImgPanel3 = this.Preload("images/p6/panel3.png");
		mImgPanel4 = this.Preload("images/p6/panel4.png");
		mImgPanel5 = this.Preload("images/p6/panel5.png");
		mImgPanel6 = this.Preload("images/p6/panel6.png");
		mImgBubble1 = this.Preload("images/p6/bubble1.png");
		mImgBubble2 = this.Preload("images/p6/bubble2.png");
		mImgBubble3 = this.Preload("images/p6/bubble3.png");
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
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.3, 0.6);
		surface.drawImage(mImgPanel1, 10, 64 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.65, 0.95);
		surface.drawImage(mImgPanel3, 719, 19 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.3, 1.5);
		surface.drawImage(mImgPanel4, 724, 502 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.35, 1.55);
		surface.drawImage(mImgPanel5, 1039, 532 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.3);
		surface.drawImage(mImgPanel6, 1098, 340 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.8);
		surface.drawImage(mImgPanel2, 423, 417 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.4, 0.5);
		surface.drawImage(mImgBubble1, -180, 5 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.0);
		surface.drawImage(mImgBubble2, 468, 168 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.25, 1.35);
		surface.drawImage(mImgBubble3, 1266, 266 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 1410;
	this.Height = 768;

}