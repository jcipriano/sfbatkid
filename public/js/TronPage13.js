function Page13()
{
	this.Label = "COMIC BOOK PAGE 13";

	// local member variables
	var mImgFullTopBg, mImgTopSpotlight, mImgZoomoutBG, mImgFlynnGlow, mImgFight1_BG, mImgFight1_LeftGuard, mImgFight1_RightGuard, mImgFight1_Sam, mImgFight2_BG, mImgFight2_Chase;
	var mImgChatBubble1, mImgChatBubble2, mImgChatBubble3, mImgChatBubble4;
	
	this.SpawnStandalone = function(x, y, url)
	{
		var instance = { "x": x, "y": y, "img": this.Preload(url) };
		return instance;
	}
	
	this.Initialize = function()
	{	
		mImgFullTopBg = this.Preload("slices/page13_top_bg.jpg");
		mImgTopSpotlight = this.Preload("slices/page13_top_1.jpg");
		mImgZoomoutBG = this.Preload("slices/page13_top_zoomout.jpg");
		mImgFlynnGlow = this.Preload("slices/page13_top_flynn_glow.png");
		
		mImgChatBubble1 = this.Preload("slices/bubbles/Page13-Bubble-01.png");
		mImgChatBubble2 = this.Preload("slices/bubbles/page13-bubble-02-filled.png");
		mImgChatBubble3 = this.Preload("slices/bubbles/page13-bubble-03-filled.png");
		mImgChatBubble4 = this.Preload("slices/bubbles/page13-bubble-04-filled.png");
		
		mImgFight1_BG = this.Preload("slices/page13_fight1_bg.jpg");
		mImgFight1_LeftGuard = this.Preload("slices/page13_fight1_left_guard.png");
		mImgFight1_RightGuard = this.Preload("slices/page13_fight1_right_guard.png");
		mImgFight1_Sam = this.Preload("slices/page13_fight1_sam.png");
		
		mImgFight2_BG = this.Preload("slices/page13_fight2_bg.jpg");
		mImgFight2_Chase = this.Preload("slices/page13_fight2_chase.png");
		
		this.zIndex += 3;
	}

	this.Update = function(tick)
	{
	}
	
	// could disable this when off-screen
	this.Draw = function(surface)
	{
		this.DrawSubPanel1(surface);
		this.DrawFightScene2(surface);
		this.DrawFightScene1(surface);
	}
	
	var mFlickerInterval = Math.random();
	var mFlickerTime = 0;
	var mFlickerEnabled = false;
	var mFlickerTimeout = 0;
	var mFlickerNextTime = 0;
	var mFlickerDuration = 0; // in milliseconds
	
	var mFlickerStartup;
	
	this.DrawSubPanel1 = function(surface)
	{
		var bg_interpolation = Interpolation.Normalize(this.Interpolator, 0, .25);
		var fg_interpolation = Interpolation.Normalize(this.Interpolator, .3, .5);
		
		var w = 846;
		var h = 700;
		
		// for bg, sprites, and glow
		var x_bg = 10;
		var y_bg = 10;

		surface.save();
		surface.translate(x_bg, y_bg);
		surface.globalAlpha = 1;
		surface.fillStyle = "#000";
		surface.fillRect(-6, -6, w + 12, h + 12);
		
		// spotlight
		surface.drawImage(mImgTopSpotlight, 0, 0, w, h);
		
		// full background
		var backgroundVisibility = Interpolation.Normalize(this.Interpolator, .5, .8);
		surface.globalAlpha = backgroundVisibility;
		surface.drawImage(mImgFullTopBg, 0, 0, w, h);
		
		var bubble1_scale = 1;
		surface.drawImage(mImgChatBubble1, 180, 200, mImgChatBubble1.width * bubble1_scale, mImgChatBubble1.height * bubble1_scale);
		TextDraw.DrawBubbleNow( "HEY,\nWHERE\nAM I?", 222, 212, 1 );
		
		// neon FLYNN's sign flickering on
		// it should flicker X times, then stay on, then maybe pulsate a tiny amount, then randomly flicker once in a while
		
		var flickerChance = Math.random();
		
		// normalized to [0,1]
		var glowAlpha = (Math.sin(this.LocalTime * 0.005) + 1) / 2;
		// adjust to [0.6,1]
		glowAlpha = .2 * glowAlpha + .8;
		
		// in milliseconds
		if( ! mFlickerEnabled && mFlickerNextTime < this.LocalTime )
		{
			mFlickerDuration = 3 + Math.random() * 10;
			mFlickerEnabled = true;
		}

		if( mFlickerEnabled )
		{
			glowAlpha *= (Math.sin(25 * Math.PI * mFlickerTime / mFlickerDuration) + 1) / 2;
			
			if( mFlickerTime > mFlickerDuration )
			{
				mFlickerEnabled = false;
				mFlickerNextTime = this.LocalTime + 500 + Math.random() * 3500;
				mFlickerTime = 0;
			}
			
			mFlickerTime ++;
		}
		
		surface.globalAlpha = glowAlpha;
		surface.drawImage(mImgFlynnGlow, 88, 202, 102, 162);
		
		this.DrawZoomout(surface, backgroundVisibility);
		
		surface.restore();
		
		Experience.Instance.DrawCallCount += 4;
	}
	
	this.DrawZoomout = function(surface, opacity)
	{
		// draw zoom-out part
		surface.save();
		surface.beginPath();
		surface.rect(399, 374, 402, 282);
		surface.closePath();
		surface.clip();
		
		var left = 393;
		var top = 368;
		var w = 414;
		var h = 292;
		
		var centerX = left + w / 2;
		var centerY = top + h / 2;
		
		var bg_interpolation = Interpolation.Normalize(this.Interpolator, 0, 1);
		var text_interpolation = Interpolation.Normalize(this.Interpolator, 0.75, .85);
		
		var zoomFactor = 1 - bg_interpolation + 1;
		
		// resize parameters
		w *= zoomFactor;
		h *= zoomFactor;
		
		left = centerX - w / 2;
		top = centerY - h / 2;
		
		surface.globalAlpha = opacity;
		surface.drawImage(mImgZoomoutBG, left, top, w, h);
		surface.restore();
		
		TextDraw.DrawNarationNow(
			"THE VEHICLE IS A\n"+
			"RECOGNIZER, SWEEPING\n"+
			"THE CITY IN SEARCH OF\n"+
			"ROGUE PROGRAMS.",
			444, 390, text_interpolation * text_interpolation
		);
		
		TextDraw.DrawNarationNow(
			"A SPOTLIGHT IS PIERCING\n"+
			"THE GLOOM... THE GRID.",
			570, 300, 1
		);
		
		Experience.Instance.DrawCallCount += 1;
	}
	
	this.DrawFightScene1 = function(surface)
	{
		var bg_w = 1051;
		var bg_h = 1006;
		
		var interpolator = Interpolation.Normalize(this.Interpolator, 0.7, 1.4);
	
			
		var scale = 0.5;
		
		var panelOffset = interpolator;
		panelOffset = 900 + panelOffset * -200;
		
		var zoomScale = scale * (1 + interpolator * .3);
		
		surface.save();
		surface.globalAlpha = 1;
		surface.translate(panelOffset, 50);
		
		surface.fillStyle = "#000";
		surface.fillRect(-6, -6, bg_w * scale + 12, bg_h * scale + 12);
		
		surface.beginPath();
		surface.rect(0, 0, bg_w * scale, bg_h * scale);
		surface.closePath();
		surface.clip();
		
		surface.scale(zoomScale, zoomScale);
		
		// draw background
		surface.drawImage(mImgFight1_BG, 0, 0, bg_w, bg_h);
		
		// then sam
		surface.drawImage(mImgFight1_Sam, 400, 350, 396, 361);
		
		// then the two guards
		var guard_interpolator = Interpolation.Normalize(this.Interpolator, 0.8, 1.3);
		var guard1_x = 0 + guard_interpolator * -200;
		surface.drawImage(mImgFight1_LeftGuard, guard1_x, 100, 872, 947);
		
		var guard2_w = 454;
		var guard2_offset = 300;
		var guard2_y = 170;
		var guard2_x = (bg_w - guard2_w + guard2_offset) + (guard_interpolator * -guard2_offset);
		guard2_x = Math.round(guard2_x);
		surface.drawImage(mImgFight1_RightGuard, guard2_x, guard2_y, guard2_w, 850);
		
		surface.restore();
		surface.save();
		surface.globalAlpha = 1;
		surface.translate(panelOffset, 50);
		
		var bubble_scale = 1;
		var bubble_x = 250 + guard_interpolator * -200 * zoomScale;
		var bubble_y = 105 + guard_interpolator * 50 * zoomScale;
		surface.drawImage(mImgChatBubble2, bubble_x, bubble_y, mImgChatBubble2.width * bubble_scale, mImgChatBubble2.height * bubble_scale);
		
		bubble_x = 400 + guard_interpolator * -100 * zoomScale;
		bubble_y = 250 + guard_interpolator * 80 * zoomScale;
		surface.drawImage(mImgChatBubble3, bubble_x, bubble_y, mImgChatBubble3.width * bubble_scale, mImgChatBubble3.height * bubble_scale);
		
		/*
		TextDraw.DrawBubbleNow(
			"This program has no disc.\n" +
			"programs without discs\n" +
			"shall be re-assigned.\n" +
			"Non-productive program\n" +
			"to gaming."
		, bubble_x + 120, bubble_y + 160 );
		*/
		
		surface.restore();
		
		Experience.Instance.DrawCallCount += 6;
	}
	
	this.DrawFightScene2 = function(surface)
	{
		var bg_w = 628;
		var bg_h = 750;
		
		var scale = .6707;
	
		var interpolator = Interpolation.Normalize(this.Interpolator, 0.7, 1.4);
		var guard_interpolator = Interpolation.Normalize(this.Interpolator, 0.9, 1.7);
		
		var panelOffset = interpolator;
		panelOffset = 1470 + panelOffset * -200;
		
		var zoomScale = scale * (1.3 - guard_interpolator * .3);
		
		surface.save();
		surface.globalAlpha = 1;
		surface.translate(panelOffset, 50);
		surface.fillStyle = "#000";
		surface.fillRect(-6, -6, bg_w * scale + 12, bg_h * scale + 12);
		
		surface.beginPath();
		surface.rect(0, 0, bg_w * scale, bg_h * scale);
		surface.closePath();
		surface.clip();
		
		surface.scale(zoomScale, zoomScale);
	
		// draw background
		surface.drawImage(mImgFight2_BG, 0, 0, bg_w, bg_h);
		
		// then the chase
		var guard1_w = 628
		var guard1_offsetX = 300;
		var guard1_offsetY = 50;
		var guard1_x = (bg_w - guard1_w + guard1_offsetX) + (guard_interpolator * -guard1_offsetX);
		var guard1_y = guard1_offsetY * guard_interpolator + 100;
		surface.drawImage(mImgFight2_Chase, guard1_x, guard1_y, 628, 750);
		
		var bubble_scale = 1;
		var bubble_x = guard1_x + 120;
		var bubble_y = guard1_y + 100;
		surface.drawImage(mImgChatBubble4, bubble_x, bubble_y, mImgChatBubble4.width * bubble_scale, mImgChatBubble4.height * bubble_scale);
		
		surface.restore();
		
		surface.save();
		surface.translate(panelOffset, 50);
		
		TextDraw.DrawNarationNow(
			"The Sentry pushes Sam\n"+
			"into the recognizer..."
		, 200, 500, 1);
		
		surface.restore();
		
		Experience.Instance.DrawCallCount += 3;
	}
	
	PageBase.call(this); // inherit base

	this.Width = 1680;
	this.Height = 800;
}