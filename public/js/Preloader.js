var latency = 0;
var lastLatency = 0;
var bSimulateHighLatency = false;
var fSimulateLatencyAmount = 20; // in msec, base latency
var fSimulateLatencyVariance = 10; // in msec, random variance

function Preloader() 
{
}

Preloader.AssetsToLoad = 0;
Preloader.AssetsTotal = 0;

Preloader.Init = function()
{
	this.LoaderLogo = this.Open("images/preloader/logo.png");
	this.LoaderSkyline = this.Open("images/preloader/skyline.gif");
}

// missing-image substitute for quicker debugging
Preloader.ErrorImage = "";// a datauri base64 encoded png here

Preloader.Open = function(imgUrl)
{
	Preloader.AssetsToLoad += 1;
	Preloader.AssetsTotal += 1;

	var img = new Image();
	
	// custom functor for this image
	var functor = function(loadedEvent) { Preloader.OnImageLoaded(img, loadedEvent); };
	var errFunctor = function(errorEvent) { Preloader.OnImageError(img, errorEvent); }
	
	img.onload = functor;
	img.onerror = errFunctor;
	img.ReadyForRendering = false;

	if (bSimulateHighLatency)
	{
		latency = fSimulateLatencyAmount + (Math.random() * fSimulateLatencyVariance);
		lastLatency += latency;
		setTimeout(function() {
			img.src = imgUrl;
		}, lastLatency );
	} else {
		img.src = imgUrl;
	}
	
	return img;
}

// attachable callback
Preloader.OnReady = null;

Preloader.ResetCounter = function () {
	Preloader.AssetsTotal = 0;
	Preloader.AssetsToLoad = 0;
}

Preloader.OnImageLoaded = function(img, loadedEvent)
{
	Dbg.Print("Loaded image: " + img.src + " | Assets remaining: " + (Preloader.AssetsToLoad-1) );
	Dbg.PreDraw(img);
	img.ReadyForRendering = true;

	Preloader.AssetsToLoad -= 1;
		
	if( Preloader.AssetsToLoad <= 0 )
	{
		if( Preloader.OnReady != null ) {
			Preloader.OnReady();
		} else
			Dbg.Print("Preloader.OnReady IS NULL; Not firing callback!");
	}
}

Preloader.GetStatus = function() {
	return (Preloader.AssetsTotal-Preloader.AssetsToLoad)/Preloader.AssetsTotal;
}

Preloader.OnImageError = function(img, errorEvent)
{
	Dbg.Print("Error loading image: " + img.src);
	//img.src = Preloader.ErrorImage;
	img.ReadyForRendering = true;
	img.ErrorLoading = true;
}

function OpenImage(imgUrl)
{
	var img = new Image();
	img.src = imgUrl;
	return img;
}

function OpenImageWithCallback(imgUrl, loadedCallback)
{
	var img = new Image();
	var functor = function() { loadedCallback(img); }
	img.onload = functor;
	img.ReadyForRendering = false;
	
	if(bSimulateHighLatency)
	{
		setTimeout(function() {
			img.src = imgUrl;
		}, fSimulateLatencyAmount + Math.random() * fSimulateLatencyVariance);
	} else
	{
		img.src = imgUrl;
	}
	
	return img;
}