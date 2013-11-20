function Comic()
{
	var pages = [];
	var background;

	var mAutopilot = false;
	
	var mLastMouseX = 0;
	var mViewportX = 0;
	var ViewportMax = 0; // stop on the right edge
	var ViewportMin = 0;
	
	var mSnapPosition = 300; // unused
	var mSnapEnabled = false;
	
	var mPanningActive = false;

	var mKeyboardVelocityX = 0;
	var mCurrentVelocityX = 0;
	var mCurrentDirectionX = 0;
	var mCurrentInertiaX = 0;
	var mInertiaMaxTime = 1200; // msec
	var mbProcessInertia = false;
	
	var mViewportTargetX = 0;
	var mLastMotionUpdate = 0;
	
	//var mMouseDragIndicator = Preloader.Open("slices/mouse-drag.png");
	var mMousePointer = { "x": 0, "y": 0 };
	var mMouseDragOpacity = 0;
	var mMouseDragOpacityTarget = 0;

	this.CurrentVelocity = 0;	
	this.Width = 0;
	this.Height = 0;
	this.Timeline = 0;
	this.TimelineMin = 300;
	this.TimelineMax = ViewportMax;
	this.PreloaderReady = false;
	this.Preloaded = false;
	this.preloaderVisible = true;
	this.PreloaderAlmostReady = false;

	this.Attach = function(page)
	{
		ViewportMax += page.Width;
		pages.push(page);
		return page;
	}
	
	this.Start = function()
	{	
		Dbg.Print("Initializing Preloader..");
		Preloader.OnReady = function() { Comic.Instance.StartLoading(); };
		Preloader.Init();
	}
	
	this.StartLoading = function()
	{
		this.PreloaderReady = true;

		Dbg.Print("Loading Comic..");
		Preloader.OnReady = function() { Comic.Instance.HidePreloader(); };
		Preloader.ResetCounter();

		background = new Background();
		background.Initialize();

		this.Attach(new PageIntro());
		if (bowser.mobile != true && bowser.safari != true && bowser.firefox != true) {
			this.Attach(new PagePrologue());
		}
		this.Attach(new Page1());
		this.Attach(new Page2());
		this.Attach(new Page3());
		this.Attach(new Page4());
		this.Attach(new Page5());
		this.Attach(new Page6());
		this.Attach(new Page7());
		this.Attach(new Page8());
		this.Attach(new PageOutro());

		ViewportMax -= this.Width;
		ViewportMax += this.TimelineMin;
		this.TimelineMax = ViewportMax;
		
		// lay everything out one after another
		for( var i = 1; i < pages.length; i ++ )
		{
			pages[i].X = pages[i-1].X + pages[i-1].Width + 5 - pages[i].OverlapX;
			pages[i].zIndex = i;
		}
		
		// initialize all the pages
		for( var i = 0; i < pages.length; i ++ )
		{
			pages[i].Initialize();
		}
		
		// resort draw order based on optionally specified zIndex in Initialize() above
		// sometimes we want a page to draw on top of a page to its right
		pages.sort(function(a,b) { return a.zIndex - b.zIndex; } );
		
		ViewportMin = this.TimelineMin; //1920 - Comic.Instance.Width;
		mViewportTargetX = ViewportMin;

	}

	this.PreloadReady = function() {

		this.Preloaded = true;

		$("Canvas").mousedown(this.OnMouseDown);
		$("Canvas").mouseup(this.OnMouseUp);
		$("Canvas").mousemove(this.OnMouseMove);
		$("Canvas").mouseout(this.OnMouseUp);
		$("Canvas").mouseover(this.OnMouseEnter);
		
		//$("Canvas").touchstart(this.OnTouchStart);
		//$("Canvas").touchmove(this.OnTouchMove);
		//$("Canvas").touchend(this.OnTouchEnd);

		var can = document.getElementById('Canvas');
		can.addEventListener("touchstart", this.OnTouchDown, false);
		can.addEventListener("touchmove", this.OnTouchMove, true);
		can.addEventListener("touchend", this.OnTouchUp, false);
		document.body.addEventListener("touchcancel", this.OnTouchUp, false);

		$(document).keydown(this.OnKeyDown);
		$(document).mousedown(this.PreventSelection);
		
		//console.log("Viewport Min/Max: " + ViewportMin + "/" + ViewportMax);
		
		$(document).focus();
	}

	this.Update = function(frameLength)
	{
		var frameTick = frameLength / 60;
		
		if( mKeyboardVelocityX != 0 )
		{
			mViewportX += mKeyboardVelocityX * frameLength;
			mViewportX = Math.min(ViewportMax, mViewportX);
			
			mViewportTargetX = mViewportX;
			mKeyboardVelocityX *= .94;
			if( Math.abs(mKeyboardVelocityX) < 0.001 )
			{
				mKeyboardVelocityX = 0;
			}
		}

		if( mAutopilot && !mPanningActive && !mbProcessInertia )
		{
			mViewportTargetX += 5 * frameTick;
		}
		
		// pre-cap target viewport
		mViewportTargetX = Math.min(ViewportMax, Math.max(ViewportMin, mViewportTargetX));
		
		if( mPanningActive ) // builds current velocity
		{	// measure total user-input delta
			// we do this here because the MouseMove() can get called many times more often than Update()
			// particularly on systems with oversampled mice (eg: gaming rigs)
			
			var dX = mViewportTargetX - mLastX;
			mLastX = mViewportTargetX;
			
			// we track this for inertia's sake
			var velocity = Math.abs(dX);
			mCurrentVelocityX += (velocity - mCurrentVelocityX) * .3;
			mCurrentDirectionX = dX < 0 ? -1 : 1;
		}
		else
		if( mbProcessInertia ) // decreases current velocity
		{	// apply simple inertia
		
			mViewportTargetX += mCurrentVelocityX * mCurrentDirectionX;
			mCurrentVelocityX *= .9;
			
			if( mViewportTargetX < ViewportMin || mViewportTargetX > ViewportMax )
			{	// precap and cut inertia short because we hit a wall
				mCurrentVelocityX = 0;
				mbProcessInertia = 0;
			}
			
			if( mCurrentVelocityX < 0.01 )
			{	// end inertia
				mbProcessInertia = false;
				mCurrentVelocityX = 0;
			}
		}
		
		// at this point the current velocity has been computed and is ready for use
		this.CurrentVelocity = mCurrentVelocityX / frameLength;
		
		// catch up the viewport to the virtual viewport
		// this allows us to add smoothing really simply and consistently
		var smoothingFactor = 0.12; // [0.05,1] is a sensible range
		var speed = (mViewportTargetX - mViewportX) * smoothingFactor;
		mViewportX += speed;

		// this is the only viewport variable used by the draw system, and we round it for better rendering
		//mRoundedViewportX = Math.round(-mViewportX);
		mRoundedViewportX = -mViewportX;
		
		// export the viewport translation and use it as a master timeline for all animations
		// we can offset it in any way necessary here
		Comic.Instance.Timeline = mViewportX;
		
		if (background)
			background.Update(frameLength);

		// update all of the visible pages
		for( var i = 0; i < pages.length; i ++ )
		{
			// degrade in case of unhandled errors by dropping broken pages
			if( pages[i].Broken )
				continue;
		
			try
			{
				// update page with latest timeline info
				pages[i].Update(frameLength);
			}
			catch( err )
			{	// if a page commits an error, remove it from circulation
				pages[i].Broken = true;
				Dbg.Print("Page " + pages[i].Label + " unhandled error in Update(): " + err);
			}
		}
		
		// the drag-indicator helper
		mMouseDragOpacity += (mMouseDragOpacityTarget - mMouseDragOpacity) * .1;
	}
	
	// used to remove tiny movement and to align pixels to avoid sub-pixel rendering gaps
	var mRoundedViewportX = 0;

	this.Draw = function(surface, surfaceWidth, surfaceHeight)
	{
		this.DrawCallCount = 0;
		
		if (!this.PreloadReady) return;

		if (this.Preloaded || this.PreloaderAlmostReady) {
			this.DrawPages(surface, surfaceWidth, surfaceHeight);
		}

		if (!this.Preloaded) {
			this.DrawPreloader(surface, surfaceWidth, surfaceHeight);
		}
	}

	this.DrawPreloader = function(surface, surfaceWidth, surfaceHeight)
	{
		var alphaModifier = 1;
		var dT = 0;
		if (this.PreloaderAlmostReady) {
			dT = new Date().getTime() - startPreloadFade;
			alphaModifier = 1-(dT/1000);
			if (alphaModifier <= 0) {
				this.PreloaderReady = true;
				this.PreloadReady();
				return;
			}
			alphaModifier = alphaModifier <= 0 ? 0.1 : alphaModifier;
		}

		surface.save();
		surface.fillStyle = '#000';
		surface.globalAlpha = alphaModifier;
		surface.fillRect( 0, 0, Comic.Instance.Width, Comic.Instance.Height );

		var status = Preloader.GetStatus();
			status = status == NaN ? 1 : status;
			status = status >= 0 ? status : 0;

		var aspectMultiplier = Comic.Instance.Width/1210;
		var skylineWidth = 1210 * aspectMultiplier;
		var skylineHeight = 176 * aspectMultiplier;
		var skylineX = 0;
		var skylineY = Comic.Instance.Height-skylineHeight + (Interpolation.easeInQuad(dT/1000) * 176);

		//console.log( Preloader.LoaderSkyline, 0, skylineY, 0, 0, status*skylineWidth, skylineHeight, skylineWidth, skylineHeight );
		surface.globalAlpha = alphaModifier <= 0.5 ? 0.1 : alphaModifier-0.5;
		surface.drawImage( Preloader.LoaderSkyline, 0, skylineY, skylineWidth, skylineHeight );
		surface.globalAlpha = alphaModifier <= 0.1 ? 0.1 : alphaModifier;
		surface.drawImage( Preloader.LoaderSkyline, 0, 0, status*1210, 176, 0, skylineY, status*skylineWidth, skylineHeight);//, 0, 0, status*skylineWidth, skylineHeight, skylineWidth, skylineHeight );
		//surface.drawImage( Preloader.LoaderLogo, status*Comic.Instance.Width-48, Comic.Instance.Height/2-25 );
		surface.drawImage( Preloader.LoaderLogo, Comic.Instance.Width/2-48, Comic.Instance.Height/2-25 );

		surface.fillStyle = '#fff';
		//surface.fillRect( status*Comic.Instance.Width, Comic.Instance.Height/2, 1, Comic.Instance.Height/2 );

		surface.restore();		
		surface.globalAlpha = 1;
	}

	var startPreloadFade = 0;
	this.HidePreloader = function() {
		this.PreloaderAlmostReady = true;
		startPreloadFade = new Date().getTime();
	}

	this.DrawPages = function(surface, surfaceWidth, surfaceHeight)
	{
		surface.clearRect(0, 0, surfaceWidth, surfaceHeight);
		surface.save();

		background.Draw(surface);
		
		surface.translate(mRoundedViewportX, 20);

		for( var i = 0; i < pages.length; i ++ ) {
			var panel = pages[i];
			
			if( pages[i].Broken )
				continue;
			
			try {
				if( panel.IsVisible(mViewportX, 0, this.Width, this.Height) ) {
					panel.Draw(surface);
				} else {
					panel.Visible = false;
				}
			} catch( err ) {
				pages[i].Broken = true;
				Dbg.Print("Page " + pages[i].Label + " unhandled error in Draw(): " + err);
			}
		}

		surface.restore();		
		/*
		surface.globalAlpha = mMouseDragOpacity;
		if( mMouseDragIndicator.ReadyForRendering )
			surface.drawImage(mMouseDragIndicator, mMousePointer.x - 37, mMousePointer.y + 35, mMouseDragIndicator.width, mMouseDragIndicator.height );
		*/
		surface.globalAlpha = 1;
	}

	// we want to us the mouse cursor for dragging, selection can screw that up
	this.PreventSelection = function(mouseEvent)
	{
		mouseEvent.preventDefault();
	}
	

	this.OnKeyDown = function(keyEvent)
	{
		var KeySensitivity = 1;
		
		if( keyEvent.keyCode == 39 )
		{	// right key
		
			mKeyboardVelocityX += KeySensitivity;
		
			keyEvent.preventDefault();
		}
		
		if( keyEvent.keyCode == 37 )
		{	// left key
		
			mKeyboardVelocityX -= KeySensitivity;
		
			keyEvent.preventDefault();
		}
		
		if( keyEvent.keyCode == 32 )
		{	// space-bar auto-move toggle
			mAutopilot = !mAutopilot;
		}
		
		if( keyEvent.keyCode == 68 )
		{	// toggle drawing debug-info
			//mDrawDebugInfo = !mDrawDebugInfo;
		}
	}
	
	var mDrawDebugInfo = false;

	this.GetMousePosition = function()
	{
		return mMousePointer;
	}
	
	this.OnMouseDown = function(mouseEvent)
	{
		mLastMouseX = mouseEvent.pageX;
		mCurrentInertiaX = 0;
		mCurrentVelocityX = 0;
		mLastMotionUpdate = 0;//new Date().getTime();
		
		mKeyboardVelocityX = 0; // mouse down resets any keyboard motion
		
		mouseEvent.preventDefault();
		
		mMousePointer.x = mouseEvent.offsetX;
		mMousePointer.y = mouseEvent.offsetY;
		
		mLastX = mViewportTargetX;
		
		var mouseDownHandled = false;
		if( ! mouseDownHandled )
		{
			mPanningActive = true;
			mMouseDragOpacityTarget = 1;
		}
	}
	
	this.OnMouseMove = function(mouseEvent)
	{
		if( mPanningActive )
		{
			// the granularity of JS timers in IE9 is around 16msec
			// which means if we are getting 60+ mouse-move updates per second
			// once in a while we will get a near-zero timespan
			// which throws any velocity/inertia computation out the window
			var timeNow = new Date().getTime();
			//var deltaTime = timeNow - mLastMotionUpdate;
			
			mMouseDragOpacityTarget = 1;
			
			// apply camera panning
			var newX = mouseEvent.pageX;
			var deltaX = newX - mLastMouseX;
			
			mLastMouseX = newX;
			mLastMotionUpdate = timeNow;
			
			mMousePointer.x = mouseEvent.offsetX;
			mMousePointer.y = mouseEvent.offsetY;

			mViewportTargetX -= deltaX;
		}
	}
	
	this.OnMouseLost = function(mouseEvent)
	{
		this.OnMouseUp(mouseEvent);
	}
	
	this.OnMouseEnter = function(mouseEvent)
	{
	}
	
	this.OnMouseUp = function(mouseEvent)
	{
		if( mPanningActive )
		{
			mPanningActive = false;
			mCurrentInertiaX = Math.abs(mCurrentVelocityX);
			mInertiaMaxTime = 300 + mCurrentInertiaX * 500;
			mbProcessInertia = true;
			
			// decrease velocity; duration of last mousemove to this mouseup event
			// indicates a hold gesture
			var timeNow = new Date().getTime();
			var deltaTime = timeNow - mLastMotionUpdate;
			deltaTime = Math.max(10, deltaTime); // low-timer granularity compensation
			mLastMotionUpdate = 0;
			
			// 100msec is a full hold gesture that complete zeroes out the velocity to be used as inertia
			mCurrentVelocityX *= 1 - Math.min(1, Math.max(0, deltaTime / 100));
		}
		
		mLastX = 0;
		mMouseDragOpacityTarget = 0;
	}
	
	var mLastX = 0;
	var mLastTime = 0;


	this.OnTouchDown = function(touchEvent)
	{
		mLastMouseX = touchEvent.pageX;
		mCurrentInertiaX = 0;
		mCurrentVelocityX = 0;
		mLastMotionUpdate = 0;//new Date().getTime();
		
		mKeyboardVelocityX = 0; // mouse down resets any keyboard motion
		
		touchEvent.preventDefault();
		
		mMousePointer.x = touchEvent.offsetX;
		mMousePointer.y = touchEvent.offsetY;
		
		mLastX = mViewportTargetX;
		
		var mouseDownHandled = false;
		if( ! mouseDownHandled )
		{
			mPanningActive = true;
			mMouseDragOpacityTarget = 1;
		}
	}
	
	this.OnTouchMove = function(touchEvent)
	{
		if( mPanningActive )
		{
			// the granularity of JS timers in IE9 is around 16msec
			// which means if we are getting 60+ mouse-move updates per second
			// once in a while we will get a near-zero timespan
			// which throws any velocity/inertia computation out the window
			var timeNow = new Date().getTime();
			//var deltaTime = timeNow - mLastMotionUpdate;
			
			mMouseDragOpacityTarget = 1;
			
			// apply camera panning
			var newX = touchEvent.pageX;
			var deltaX = newX - mLastMouseX;
			
			mLastMouseX = newX;
			mLastMotionUpdate = timeNow;
			
			mMousePointer.x = touchEvent.offsetX;
			mMousePointer.y = touchEvent.offsetY;

			mViewportTargetX -= deltaX;
		}
	}
	
	this.OnTouchUp = function(touchEvent)
	{
		if( mPanningActive )
		{
			mPanningActive = false;
			mCurrentInertiaX = Math.abs(mCurrentVelocityX);
			mInertiaMaxTime = 300 + mCurrentInertiaX * 500;
			mbProcessInertia = true;
			
			// decrease velocity; duration of last mousemove to this mouseup event
			// indicates a hold gesture
			var timeNow = new Date().getTime();
			var deltaTime = timeNow - mLastMotionUpdate;
			deltaTime = Math.max(10, deltaTime); // low-timer granularity compensation
			mLastMotionUpdate = 0;
			
			// 100msec is a full hold gesture that complete zeroes out the velocity to be used as inertia
			mCurrentVelocityX *= 1 - Math.min(1, Math.max(0, deltaTime / 100));
		}
		
		mLastX = 0;
		mMouseDragOpacityTarget = 0;
	}

}

Comic.Instance = new Comic();