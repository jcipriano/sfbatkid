/*
 * this is pretty much backwards from standard inheritance
 * but it helps us wrap draw calls and cut down on repeated code
 */
 
function PageBase()
{
	this.StartTime = 0;
	this.EndTime = 0;
	
	this.zIndex = 0;
	
	this.mSlice = [];
	
	this.X = 0;
	this.Y = 0;
	this.Width = 100;
	this.Height = 100;
	this.OverlapX = 0;
	
	this.Interpolator = 0;
	this.LocalTime = 0;
	this.DisplayDebug = false;

	this.Visible = false;

	var mLoadingProgressSmooth = 0;
	
	// the mouse position is relative to the page (regardless of scrolling!)
	this.HandleContactDown = function(mousePoint)
	{	// if derived class implements this method, call it!
		if( this.OnContactDown )
		{
			this.OnContactDown(mousePoint);
		}
	}
	
	this.Preload = function(src)
	{
		var instance = Preloader.Open(src);
		this.mSlice.push(instance);
		return instance;
	}

	this.Derived_Initialize = this.Initialize;
	this.Initialize = function()
	{
		Dbg.Print("PageBase::Initialize(); label = " + this.Label);
		
		this.Derived_Initialize();
	}
	
	this.Derived_Update = this.Update;
	this.Update = function(frameLengthMsec)
	{
		this.Interpolator = this.GetPanelInterpolationRight(0, this.Width);
		this.LocalTime += frameLengthMsec;
		
		// draw loading indicator
		if( !this.IsLoaded() || mLoadingProgressSmooth < 1 )
		{
			var progress = this.LoadedProgress();
			var normalizedProgress = progress / 100;
			
			if( ! this.HasLoadableContent() )
			{
				mLoadingProgressSmooth = 1;
			} else
			{
				mLoadingProgressSmooth += (normalizedProgress - mLoadingProgressSmooth) * 0.02;
				mLoadingProgressSmooth += 0.03;
				if( mLoadingProgressSmooth > 0.99 )
					mLoadingProgressSmooth = 1;
				
				if( mLoadingProgressSmooth > normalizedProgress && mLoadingProgressSmooth == 1 )
					mLoadingProgressSmooth = 0;
			}
		}
		
		this.Derived_Update(frameLengthMsec);
	}
	
	this.Derived_Draw = this.Draw;
	this.Draw = function(surface)
	{
		surface.save();
		try
		{	// we can restore the drawing context here
			// so if the derived class messes up, this shouldn't destroy the entire Comic
			this.DrawImpl(surface);
		}
		catch(err)
		{
			Dbg.Print("Page " + this.Label + " unhandled inner-draw error: " + err);
			this.Broken = true;
		}
		surface.restore();
	}
	
	this.DrawImpl = function(surface)
	{
		// xform into local space
		// so the page renderer doesn't need to worry about the timeline
		surface.translate(this.X, this.Y);
	
		if( mLoadingProgressSmooth == 1 )
		{
			this.Derived_Draw(surface);
		}
		else
		{
			var progress = this.LoadedProgress();
			var str = Math.round(progress);
			//console.log("Loading... " + str);
		}
	}
	

	
	// [0-1] taking the full size of the panel into account
	// panel start/width are in pixels relative to page
	// 0 = panel's left edge on right-side of screen
	// 1 = panel's left edge hit snap-point
	this.GetPanelInterpolation = function(panelStart, panelWidth)
	{
		var renderPosition = this.X - Comic.Instance.Timeline;
		
		var localTime = this.EndPosition - renderPosition;
		var duration = this.BeginPosition - this.EndPosition;
		var interpolator = 1 + localTime / duration;
		
		return interpolator;
	}
	
	
	// 0 = panel's right edge on right-side of screen
	// 1 = panel's left edge hit snap-point
	this.GetPanelInterpolationRight = function(panelStart, panelWidth)
	{
		var localTime = Comic.Instance.Timeline + Comic.Instance.Width - this.X - panelStart;
		var duration = Comic.Instance.Width - this.Width;
		var interpolator = localTime / Comic.Instance.Width;
		
		// window width - panel left edge = visible panel amount
		// [-1,0] = panel appearing on right side
		// [0,1] = panel completely visible, scrolling across screen
		// [1,2) = panel disappearing on left side
		if( interpolator < 0 )
		{
			interpolator = (Comic.Instance.Width + Comic.Instance.Timeline) / this.Width;
			interpolator = -(1 - interpolator);
			interpolator = 0;
		}
		
		//Dbg.Print("Comic.Instance.Timeline = " + Comic.Instance.Timeline);
		
		return interpolator;
	}
	
	this.IsVisible = function(x, y, w, h)
	{
		// if within bounds or close-enough to be within bounds
		if( (this.X + this.Width) < x || this.X > (x + w) ) {
			this.Visible = false;
			return false;
		}
		
		this.Visible = true;
		return true;
	}

	this.IsVisible2 = function() {
		return this.Visible;
	}
	
	this.DrawDebug = function()
	{
	}
	
	this.IsLoaded = function()
	{
		for( var i = 0; i < this.mSlice.length; i ++ )
			if( ! this.mSlice[i].ReadyForRendering )
				return false;
		
		return true;
	}
	
	this.HasLoadableContent = function()
	{
		return this.mSlice.length > 0;
	}
	
	this.LoadedProgress = function()
	{
		if( ! this.HasLoadableContent() )
			return 1;
	
		var numLoaded = 0;
		for( var i = 0; i < this.mSlice.length; i ++ )
			if( this.mSlice[i].ReadyForRendering )
				numLoaded ++;
		
		return 100.0 * numLoaded / this.mSlice.length;
	}
}