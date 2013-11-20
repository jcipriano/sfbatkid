function Page7()
{
	this.Label = "COMIC BOOK PAGE 7";
	
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
		mImgBubble9,
		mImgBubble10,
		mImgBubble11,
		mImgBubble12;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p7/panel1.png");
		mImgPanel2 = this.Preload("images/p7/panel2.png");
		mImgPanel3 = this.Preload("images/p7/panel3.png");
		mImgPanel4 = this.Preload("images/p7/panel4.png");
		mImgPanel5 = this.Preload("images/p7/panel5.png");
		mImgPanel6 = this.Preload("images/p7/panel6.png");
		mImgPanel7 = this.Preload("images/p7/panel7.png");
		mImgPanel8 = this.Preload("images/p7/panel8.png");
		mImgPanel9 = this.Preload("images/p7/panel9.png");
		mImgPanel10 = this.Preload("images/p7/panel10.png");
		mImgPanel11 = this.Preload("images/p7/panel11.png");
		mImgBubble1 = this.Preload("images/p7/bubble1.png");
		mImgBubble2 = this.Preload("images/p7/bubble2.png");
		mImgBubble3 = this.Preload("images/p7/bubble3.png");
		mImgBubble4 = this.Preload("images/p7/bubble4.png");
		mImgBubble5 = this.Preload("images/p7/bubble5.png");
		mImgBubble6 = this.Preload("images/p7/bubble6.png");
		mImgBubble7 = this.Preload("images/p7/bubble7.png");
		mImgBubble8 = this.Preload("images/p7/bubble8.png");
		mImgBubble9 = this.Preload("images/p7/bubble9.png");
		mImgBubble10 = this.Preload("images/p7/bubble10.png");
		mImgBubble11 = this.Preload("images/p7/bubble11.png");
		mImgBubble12 = this.Preload("images/p7/bubble12.png");
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
		surface.drawImage(mImgPanel1, 0, 165 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.65, 0.95);
		surface.drawImage(mImgPanel3, 503, 134 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.9);
		surface.drawImage(mImgPanel2, 415, 503 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.85, 1.05);
		surface.drawImage(mImgPanel5, 835, 217 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 1.0);
		surface.drawImage(mImgPanel4, 750, 110 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.90, 1.10);
		surface.drawImage(mImgPanel6, 832, 449 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.7);
		surface.drawImage(mImgPanel10, 1868, 140 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.20, 1.40);
		surface.drawImage(mImgPanel7, 1123, 130 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30); 
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.30, 1.50);
		surface.drawImage(mImgPanel9, 1603, 217 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.40, 1.50);
		surface.drawImage(mImgPanel8, 1612, 455 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.8);
		surface.drawImage(mImgPanel11, 2050, 420 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.3, 0.4);
		surface.drawImage(mImgBubble1, 34, 612 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.7);
		surface.drawImage(mImgBubble2, 194, 150 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 0.9);
		surface.drawImage(mImgBubble3, 422, 38 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.0);
		surface.drawImage(mImgBubble4, 512, 316 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.0, 1.1);
		surface.drawImage(mImgBubble5, 844, 14 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.2);
		surface.drawImage(mImgBubble6, 975, 106 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.3, 1.4);
		surface.drawImage(mImgBubble7, 996, 394 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.35, 1.45);
		surface.drawImage(mImgBubble8, 1350, 84 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble9, 1530, 386 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble10, 1777, 408 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.7);
		surface.drawImage(mImgBubble11, 1774, 90 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.75, 1.85);
		surface.drawImage(mImgBubble12, 1906, 310 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2205;
	this.Height = 768;

}