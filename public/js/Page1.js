function Page1()
{
	this.Label = "COMIC BOOK PAGE 1";
	
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
		mImgPanel1 = this.Preload("images/p1/panel1.png");
		mImgPanel2 = this.Preload("images/p1/panel2.png");
		mImgPanel3 = this.Preload("images/p1/panel3.png");
		mImgPanel4 = this.Preload("images/p1/panel4.png");
		mImgPanel5 = this.Preload("images/p1/panel5.png");
		mImgPanel6 = this.Preload("images/p1/panel6.png");
		mImgPanel7 = this.Preload("images/p1/panel7.png");
		mImgPanel8 = this.Preload("images/p1/panel8.png");
		mImgPanel9 = this.Preload("images/p1/panel9.png");

		mImgPanel10 = this.Preload("images/p1/panel10.png");
		mImgBubble1 = this.Preload("images/p1/bubble1.png");
		mImgBubble2 = this.Preload("images/p1/bubble2.png");
		//mImgBubble3 = this.Preload("images/p1/bubble3.png");
		mImgBubble4 = this.Preload("images/p1/bubble4.png");
		mImgBubble5 = this.Preload("images/p1/bubble5.png");
		mImgBubble9 = this.Preload("images/p1/bubble9.png");
		this.zIndex += 1;
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
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.2, 0.5);
		surface.drawImage(mImgPanel1, 25, 140 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.5, 0.8);
		surface.drawImage(mImgPanel2, 535, 31 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.55, 0.85);
		surface.drawImage(mImgPanel3, 535, 394 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 1.3);
		surface.drawImage(mImgPanel4, 955, 92 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.15, 1.35);
		surface.drawImage(mImgPanel5, 872, 500 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.6);
		surface.drawImage(mImgPanel6, 1368, 33 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.45, 1.65);
		surface.drawImage(mImgPanel7, 1368, 287 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.8);
		surface.drawImage(mImgPanel8, 1795, -20 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.65, 1.85);
		surface.drawImage(mImgPanel9, 1795, 338 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.8, 2.0);
		surface.drawImage(mImgPanel10, 2000, 550 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.7);
		surface.drawImage(mImgBubble9, 420, 150 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.2);
		surface.drawImage(mImgBubble1, 824, -40 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.3, 1.4);
		surface.drawImage(mImgBubble2, 1214, 36 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		//surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.5);
		//surface.drawImage(mImgBubble3, 1238, 430 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.7);
		surface.drawImage(mImgBubble4, 1604, 136 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.9, 2.0);
		surface.drawImage(mImgBubble5, 2000, 370 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2245;
	this.Height = 768;

}