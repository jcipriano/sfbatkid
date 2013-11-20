function Page3()
{
	this.Label = "COMIC BOOK PAGE 3";
	
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
		mImgBubble8,
		mImgBubble9,
		mImgBubble10,
		mImgBubble11;

	this.Initialize = function()
	{
		mImgPanel1 = this.Preload("images/p3/panel1.png");
		mImgPanel2 = this.Preload("images/p3/panel2.png");
		mImgPanel3 = this.Preload("images/p3/panel3.png");
		mImgPanel4 = this.Preload("images/p3/panel4.png");
		mImgPanel5 = this.Preload("images/p3/panel5.png");
		mImgPanel6 = this.Preload("images/p3/panel6.png");
		mImgPanel7 = this.Preload("images/p3/panel7.png");
		mImgPanel8 = this.Preload("images/p3/panel8.png");
		mImgPanel9 = this.Preload("images/p3/panel9.png");
		mImgBubble1 = this.Preload("images/p3/bubble1.png");
		mImgBubble2 = this.Preload("images/p3/bubble2.png");
		mImgBubble3 = this.Preload("images/p3/bubble3.png");
		mImgBubble4 = this.Preload("images/p3/bubble4.png");
		mImgBubble5 = this.Preload("images/p3/bubble5.png");
		mImgBubble6 = this.Preload("images/p3/bubble6.png");
		mImgBubble7 = this.Preload("images/p3/bubble7.png");
		mImgBubble8 = this.Preload("images/p3/bubble8.png");
		mImgBubble9 = this.Preload("images/p3/bubble9.png");
		//mImgBubble10 = this.Preload("images/p3/bubble10.png");
		mImgBubble11 = this.Preload("images/p3/bubble11.png");
		this.zIndex += 3;
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
		surface.drawImage(mImgPanel1, 16, 247);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.8);
		surface.drawImage(mImgPanel2, 516, 200 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.85, 1.05);
		surface.drawImage(mImgPanel3, 855, 100 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.1, 1.3);
		surface.drawImage(mImgPanel4, 852, 340 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.15, 1.35);
		surface.drawImage(mImgPanel5, 1337, 107 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.7, 1.9);
		surface.drawImage(mImgPanel8, 1890, 199 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.75, 1.95);
		surface.drawImage(mImgPanel9, 1922, 437 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		

		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.4, 1.6);
		surface.drawImage(mImgPanel6, 1761, 275 + (30*Interpolation.easeOutQuad(surface.globalAlpha))-30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.45, 1.65);
		surface.drawImage(mImgPanel7, 1761, 426 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	this.DrawSpeech = function(surface)
	{
		surface.save();
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.5, 0.6);
		surface.drawImage(mImgBubble1, 24, 144 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.6, 0.7);
		surface.drawImage(mImgBubble2, 242, 188 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.8, 0.9);
		surface.drawImage(mImgBubble3, 314, 430 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 0.9, 1.0);
		surface.drawImage(mImgBubble4, 536, 130 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.0, 1.1);
		surface.drawImage(mImgBubble5, 792, -50 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.2, 1.3);
		surface.drawImage(mImgBubble6, 774, 334 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.35, 1.4);
		surface.drawImage(mImgBubble7, 880, 550 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.6, 1.7);
		surface.drawImage(mImgBubble8, 1564, 44 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.5, 1.6);
		surface.drawImage(mImgBubble9, 1200, 306 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		//surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.8, 1.9);
		//surface.drawImage(mImgBubble10, 1836, 128 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.globalAlpha = Interpolation.Normalize(this.Interpolator, 1.9, 2.0);
		surface.drawImage(mImgBubble11, 1842, 578 - (30*Interpolation.easeOutQuad(surface.globalAlpha))+30);
		surface.restore();
	}

	PageBase.call(this); // inherit base
	this.Width = 2250;
	this.Height = 768;

}