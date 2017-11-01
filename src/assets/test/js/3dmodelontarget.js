var World = {
	loaded: false,
	rotating: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function loadingStep() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
		this.tracker = new AR.ClientTracker("assets/tracker_2.wtc", {
			onLoaded: this.loadingStep
		});

		/*
			Similar to 2D content the 3D model is added to the drawables.cam property of an AR.Trackable2DObject.
		*/
		var trackable = new AR.Trackable2DObject(this.tracker, "*", {
      onImageRecognized: function (target) {
        console.log('found', target);
        var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
        document.getElementById('loadingMessage').innerHTML =
          "<div" + cssDivLeft + ">found</div>";
      },
      onImageLost: function (target) {
        // After onImageLost is called the ImageTarget(target) is destroyed.
        // This means that even if the same target image is recognized again, the ImageTarget is different.
        console.log('lost', target);
        var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
        document.getElementById('loadingMessage').innerHTML =
          "<div" + cssDivLeft + ">lost</div>";
      }
		});
	},

	loadingStep: function loadingStepFn() {
		if (!World.loaded && World.tracker.isLoaded() && World.modelCar.isLoaded()) {
			World.loaded = true;
			var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
			document.getElementById('loadingMessage').innerHTML =
				"<div" + cssDivLeft + ">Scan CarAd ClientTracker Image:</div>";

		}
	}
};

World.init();
