$(document).ready(function() {

	var width = $(window).width();
	var height = $(window).height();

	function resize() {
		width = $(window).width();
		height = $(window).height();
	}; 

	$(window).resize( resize );


});


function Comic()
{
	var pages = [];
	
	this.Width = 0;
	this.Height = 0;
	this.Timeline = 0;
	
	this.Attach = function(page)
	{
		pages.push(page);
		return page;
	}
	
	this.Start = function()
	{
		console.log("Loading Comic..");

		this.Attach(new Page1());
		this.Attach(new Page2());
		
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
		
		$(document).keydown(this.OnKeyDown);
		$(document).mousedown(this.PreventSelection);
		
		ViewportMin = 1920 - Comic.Instance.Width;
		mViewportTargetX = ViewportMin;
		
		console.log("Viewport Min/Max: " + ViewportMin + "/" + ViewportMax);
		
		Comic.Instance.StartX = mViewportTargetX;
		
		$(document).focus();
	}
}

Comic.Instance = new Comic();

/*
	// we want to us the mouse cursor for dragging, selection can screw that up
	this.PreventSelection = function(mouseEvent)
	{
		mouseEvent.preventDefault();
	}
	
	var mPanningActive = false;

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
			mDrawDebugInfo = !mDrawDebugInfo;
		}
	}
	
	var mDrawDebugInfo = false;
	
	var mAutopilot = false;
	
	var mLastMouseX = 0;
	var mViewportX = 0;
	var ViewportMax = 18764; // stop on the right edge
	var ViewportMin = 0;
	
	var mSnapPosition = 300; // unused
	var mSnapEnabled = false;
	
	var mKeyboardVelocityX = 0;
	var mCurrentVelocityX = 0;
	var mCurrentDirectionX = 0;
	var mCurrentInertiaX = 0;
	var mInertiaMaxTime = 1200; // msec
	//var mInertiaTime = 0;
	var mbProcessInertia = false;
	
	var mViewportTargetX = 0;
	var mLastMotionUpdate = 0;
	
	this.Timeline = 0;
	this.CurrentVelocity = 0;
	
	var mMouseDragIndicator = Preloader.Open("slices/mouse-drag.png");
	
	var mMousePointer = { "x": 0, "y": 0 };
	var mMouseDragOpacity = 0;
	var mMouseDragOpacityTarget = 0;
	
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
}

Comic.Instance = new Comic();
*/