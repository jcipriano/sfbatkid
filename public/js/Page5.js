function Page5()
{
	this.Label = "COMIC BOOK PAGE 5";
	
	var mImgPanel1,
		mImgPanel2,
		mImgPanel3,
		mImgPanel4,
		mImgPanel5,
		mImgPanel6,
		mImgPanel7,
		mImgPanel8,
		mImgPanel9,
		mImgPanel10,
		mImgPanel11,
		mImgBubble1,
		mImgBubble2,
		mImgBubble3,
		mImgBubble4,
		mImgBubble5,
		mImgBubble6,
		mImgBubble7,
		mImgBubble8,
		mImgBubble9;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p5/panel1.png");
		mImgPanel2 = this.Preload("images/p5/panel2.png");
		mImgPanel3 = this.Preload("images/p5/panel3.png");
		mImgPanel4 = this.Preload("images/p5/panel4.png");
		mImgPanel5 = this.Preload("images/p5/panel5.png");
		mImgPanel6 = this.Preload("images/p5/panel6.png");
		mImgPanel7 = this.Preload("images/p5/panel7.png");
		mImgPanel8 = this.Preload("images/p5/panel8.png");
		mImgPanel9 = this.Preload("images/p5/panel9.png");
		mImgPanel10 = this.Preload("images/p5/panel10.png");
		mImgPanel11 = this.Preload("images/p5/panel11.png");
		mImgBubble1 = this.Preload("images/p5/bubble1.png");
		//mImgBubble2 = this.Preload("images/p5/bubble2.png");
		mImgBubble3 = this.Preload("images/p5/bubble3.png");
		mImgBubble4 = this.Preload("images/p5/bubble4.png");
		mImgBubble5 = this.Preload("images/p5/bubble5.png");
		mImgBubble6 = this.Preload("images/p5/bubble6.png");
		mImgBubble7 = this.Preload("images/p5/bubble7.png");
		mImgBubble8 = this.Preload("images/p5/bubble8.png");
		mImgBubble9 = this.Preload("images/p5/bubble9.png");
		this.zIndex += 4;
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
		surface.drawImage(mImgPanel1, 4, 140 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.9);
		surface.drawImage(mImgPanel2, 520, 30 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.65, 0.95);
		surface.drawImage(mImgPanel3, 520, 395 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 1.0);
		surface.drawImage(mImgPanel4, 950, 5 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.85, 1.05);
		surface.drawImage(mImgPanel5, 950, 245 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.90, 1.30);
		surface.drawImage(mImgPanel6, 950, 523 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.20, 1.50);
		surface.drawImage(mImgPanel7, 1368, -40 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30); 
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.30, 1.60);
		surface.drawImage(mImgPanel9, 1365, 395 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.40, 1.70);
		surface.drawImage(mImgPanel8, 1304, 290 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.8);
		surface.drawImage(mImgPanel10, 1840, 118 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.55, 1.85);
		surface.drawImage(mImgPanel11, 1840, 372 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.4, 0.5);
		surface.drawImage(mImgBubble1, 236, 98 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		//surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.0, 1.1);
		//surface.drawImage(mImgBubble2, 840, 18 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.2);
		surface.drawImage(mImgBubble3, 1154, 0 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.2, 1.3);
		surface.drawImage(mImgBubble4, 964, 354 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.5);
		surface.drawImage(mImgBubble5, 1384, 8 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.45, 1.55);
		surface.drawImage(mImgBubble6, 1290, 556 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.65);
		surface.drawImage(mImgBubble7, 1644, 362 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 2.0, 2.1);
		surface.drawImage(mImgBubble9, 1780, 20 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2250;
	this.Height = 768;

}