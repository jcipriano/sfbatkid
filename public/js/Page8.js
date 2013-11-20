function Page8()
{
	this.Label = "COMIC BOOK PAGE 8";
	
	var mImgPanel1,
		mImgPanel2,
		mImgPanel3,
		mImgPanel4,
		mImgPanel5,
		mImgPanel6,
		mImgPanel7,
		mImgBubble0,
		mImgBubble1,
		mImgBubble2,
		mImgBubble3,
		mImgBubble4,
		mImgBubble5;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p8/panel1.png");
		mImgPanel2 = this.Preload("images/p8/panel2.png");
		mImgPanel3 = this.Preload("images/p8/panel3.png");
		mImgPanel4 = this.Preload("images/p8/panel4.png");
		mImgPanel5 = this.Preload("images/p8/panel5.png");
		mImgPanel6 = this.Preload("images/p8/panel6.png");
		mImgPanel7 = this.Preload("images/p8/panel7.png");
		mImgBubble0 = this.Preload("images/p8/bubble0.png");
		mImgBubble1 = this.Preload("images/p8/bubble1.png");
		mImgBubble2 = this.Preload("images/p8/bubble2.png");
		mImgBubble3 = this.Preload("images/p8/bubble3.png");
		mImgBubble4 = this.Preload("images/p8/bubble4.png");
		mImgBubble5 = this.Preload("images/p8/bubble5.png");
		this.zIndex += 8;
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
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.1, 0.3);
		surface.drawImage(mImgPanel1, 4, 140 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.9);
		surface.drawImage(mImgPanel2, 519, 33 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.65, 0.95);
		surface.drawImage(mImgPanel3, 519, 397 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 1.0);
		surface.drawImage(mImgPanel4, 950, -40 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.85, 1.05);
		surface.drawImage(mImgPanel5, 950, 380 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.90, 1.30);
		surface.drawImage(mImgPanel6, 1443, -40 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.20, 1.50);
		surface.drawImage(mImgPanel7, 1443, 403 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30); 
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.0);
		surface.drawImage(mImgBubble0, 440, 360 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.25, 1.35);
		surface.drawImage(mImgBubble1, 764, 360 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.35, 1.45);
		surface.drawImage(mImgBubble2, 1216, 302 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble3, 1212, 588 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.75, 1.85);
		surface.drawImage(mImgBubble4, 1592, 150 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 2.0, 2.1);
		surface.drawImage(mImgBubble5, 1842, 406 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2250;
	this.Height = 768;

}