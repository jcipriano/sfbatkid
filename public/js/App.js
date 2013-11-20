var mFpsCounter = new FramerateCounter();

function App()
{
	var mCanvas;
	var mCanvasContext;
	var mSurfaceWidth = 900;
	var mSurfaceHeight = 720;

	this.Start = function()
	{
		mCanvas = document.getElementById("Canvas");
		mCanvasContext = mCanvas.getContext("2d");

		mSurfaceWidth = mCanvas.clientWidth;
		mSurfaceHeight = mCanvas.clientHeight;

		mCanvas.width = mSurfaceWidth;
		mCanvas.height = mSurfaceHeight;

		Dbg.Surface = mCanvasContext;
		Dbg.Canvas = mCanvas;
		Dbg.Print("Started canvas with size: " + mSurfaceWidth + "x" + mSurfaceHeight);

		Comic.Instance.Width = mSurfaceWidth;
		Comic.Instance.Height = mSurfaceHeight;
		Comic.Instance.Start();

		setInterval(Tick,15);
		setInterval(UpdateStats,1000);

		$(window).resize(App.Instance.ResizeCanvas);
	}

	this.ResizeCanvas = function()
	{
		mSurfaceWidth = mCanvas.clientWidth;
		mSurfaceHeight = mCanvas.clientHeight;

		// setting widt/height causes the canvas to clear
		mCanvas.width = mSurfaceWidth;
		mCanvas.height = mSurfaceHeight;

		Dbg.Print("Resized canvas to size: " + mSurfaceWidth + "x" + mSurfaceHeight);

		Comic.Instance.Width = mSurfaceWidth;
		Comic.Instance.Height = mSurfaceHeight;
	}

	var mLastTickMsec = 0;
	var LastNumberOfDrawCalls = 0; // latched counter

	function Tick()
	{
		var curTimeMsec = new Date().getTime();
		var timeSpanMsec = curTimeMsec - mLastTickMsec;
		mLastTickMsec = curTimeMsec;

		if( timeSpanMsec < 500 )
		{	// skip super long frames
			Update(timeSpanMsec);
			Draw(mCanvasContext);
		}

		// not available yet
		//window.msRequestAnimationFrame(Tick);
	}

	function Update(frameTick)
	{
		Comic.Instance.Update(frameTick);
		mFpsCounter.Tick();
	}

	function Draw()
	{
		Comic.Instance.Draw(mCanvasContext, mSurfaceWidth, mSurfaceHeight);
		LastNumberOfDrawCalls = Comic.Instance.DrawCallCount;
	}

	function UpdateStats()
	{
		mFpsCounter.Update();
	}
}