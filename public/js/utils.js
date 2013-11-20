function Dbg() { }
// static public method
Dbg.Print = function(str)
{
	try
	{
		if( window.console && console.log )
		{
			console.log(str);
		}
	}
	catch(err)
	{
		alert("error: " + err);
	}
}
Dbg.PreDraw = function(img)
{
	if( ! Dbg.Surface )
		return;
		
	Dbg.Surface.drawImage(img, -100, 0, 100, 100);
}

function FramerateCounter()
{
	this.mFrames = 0;
	this.mLastFPS = 0;
	this.mLastUpdateTime = 0;

	this.Tick = function()
	{
		this.mFrames ++;
	}
	
	// must be called every second
	// can adjust for inaccuracies in calling intervals
	this.Update = function()
	{
		var newTime = new Date().getTime(); // milliseconds
	
		if(this.mLastUpdateTime == 0 )
		{
			this.mLastUpdateTime = newTime;
			return;
		}
		
		var span = (newTime - this.mLastUpdateTime); // msec span
		
		if( span >= 900 )
		{	// enough time passed to calculate fps
			var seconds = span / 1000.0;
			this.mLastFPS = this.mFrames / seconds;
			this.mFrames = 0;
			this.mLastUpdateTime = newTime;
		}
	}
	
	this.GetFPS = function()
	{
		return this.mLastFPS;
	}
}

function Interpolation() {}

// rips out a part of the interpolation factor, clamps, and renormalizes it
// keeping things linear
Interpolation.Normalize = function(interpolation, min, max)
{
	var range = max - min;
	var piece = (Math.max(min, Math.min(max, interpolation)) - min) / range;
	return piece;
}

// easing
// [0,1] -> non-linear [0,1]

Interpolation.easeInQuad = function(pos)
{
	return Math.pow(pos, 2);
}

Interpolation.easeOutQuad = function(pos)
{
	return -(Math.pow((pos-1), 2) -1);
}

Interpolation.easeInCubic = function(pos)
{
	return Math.pow(pos, 3);
}
Interpolation.easeOutCubic = function(pos)
{
	return (Math.pow((pos-1), 3) +1);
}
Interpolation.easeInExpo = function(pos){
	return (pos==0) ? 0 : Math.pow(2, 10 * (pos - 1));
}
Interpolation.easeOutExpo = function(pos){
	return (pos==1) ? 1 : -Math.pow(2, -10 * pos) + 1;
}