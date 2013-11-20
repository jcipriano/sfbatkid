function Preloader() {}

Preloader.Init = function() {}

// missing-image substitute for quicker debugging
Preloader.ErrorImage = "";// a datauri base64 encoded png here

Preloader.Open = function(imgUrl)
{
	var img = new Image();
	
	// custom functor for this image
	var functor = function(loadedEvent) { Preloader.OnImageLoaded(img, loadedEvent); };
	var errFunctor = function(errorEvent) { Preloader.OnImageError(img, errorEvent); }
	
	img.onload = functor;
	img.onerror = errFunctor;
	img.ReadyForRendering = false;
	img.src = imgUrl;
	
	return img;
}

// attachable callback
Preloader.OnReady = null;

Preloader.OnImageLoaded = function(img, loadedEvent)
{
	//Dbg.Print("Loaded image: " + img.src);
	Dbg.PreDraw(img);
	img.ReadyForRendering = true;	
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
	img.src = imgUrl;
	
	return img;
}
