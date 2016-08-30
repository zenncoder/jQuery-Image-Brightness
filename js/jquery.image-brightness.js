// fallback of Object.create for older browsers
if(typeof Object.create !== 'function') {

	// defining the same function
	Object.create = function(obj) {

		// calling constructor, cerating object and returning the instance
		function F() {};
		F.prototype = obj;
		return new F();

	};

}

(function($, window, document, undefined) {

	var Brightness = {

		// initialize
		init: function(options, element) {
			
			var self = this;

			//console.log(self);

			// accept options as object only
			if(typeof(options) == 'object') {

				// check if developer has set the options
				self.options = $.extend({}, $.fn.imageBrightness.options, options);

			} else { self.options = $.fn.imageBrightness.options; /* set default options if options set is not an object */ }

			// filling required info to the object
			self.$element 		= $(element);
			self.imageSource 	= self.$element.attr('src');
			self.imageFileName 	= self.getFilename(false);

			// get the image brightness
			self.calculateBrightness(function(brightness) {

				// deleting the reference image
				$('.jQuery-image-brightness-delete-me').remove();

				var displayValue = self.getDisplayValue(brightness);
				//console.log('DV of image "' + self.imageFileName + '" is: ' + displayValue);

				// update value to the respective image
				self.$element.attr({
					'data-display-reverse': self.options.displayReverseValue,
					'data-display-value': displayValue
				});

				// check if asked for value to append
				if(self.options.appendValue) { // if asked to append value
					
					// check need to append value
					self.appendValue(displayValue);

				}

			});

		},

		// get the display value
		appendValue: function(displayValue) {

			var self = this;

			var tmpElem = $(document.createElement('div')).append(self.$element);
			var tmpVal 	= '<span>'+displayValue+'</span>';
			tmpElem.append(tmpVal);
			$('.image-wrapper').append(tmpElem);

		},

		// get the display value
		getDisplayValue: function(brightness) {

			var self = this, displayValue;

			// check if asked for brightness or opposite value
			if(self.options.displayReverseValue) { // if asked for reverse value
				
				displayValue = 255 - brightness;

			} else { displayValue = brightness; }

			return displayValue;

		},

		// get image file name
		getFilename: function(extension) {

			var self = this;
			//var filename = self.imageSource.replace(/^.*[\\\/]/, '');

			var filename = self.imageSource.replace(/\\/g, '/');
			filename = filename.substring(filename.lastIndexOf('/')+ 1);
			filename = extension ? filename.replace(/[?#].+$/, ''): filename.split('.')[0];

			return filename;

		},

		// // check if image file exist
		// function fileExists(imageUrl) {

		// 	var http = new XMLHttpRequest();
		// 	http.open('HEAD', imageUrl, false);
		// 	http.send();

		// 	return http.status != 404;

		// },

		// function calculates and returns the brightness of an image
		calculateBrightness: function(callback) { // return value ranges between 0 and 255

			var self = this;
			//console.log(self.imageSource);

			// creating alias of the image for reference
			var img = document.createElement('img');

			// append reference image to the body
			$(img).attr({

				'src': self.imageSource,
				'class': 'jQuery-image-brightness-delete-me'

			}).hide();

			document.body.appendChild(img);

			// init var to store sum of the rgb for each pixel
			var colorSum = 0;

			// on image load 
			img.onload = function() {

				//console.log('Image: '+self.imageFileName+' is exist!');

				// create canvas and draw image
				var canvas = document.createElement('canvas');

				// setting up image dimentions to the canvas
				canvas.width  = this.width;
				canvas.height = this.height;

				var ctx = canvas.getContext('2d');

				// drawing image on canvas with position top left
				ctx.drawImage(this, 0, 0);

				// get image data from top left to bottom right
				var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				var data 	  = imageData.data;
				var r, g, b, avg;

				// reading rgb values
				for(var x = 0, len = data.length; x < len; x += 4) {
					
					r = data[x];
					g = data[x + 1];
					b = data[x + 2];

					// round of the number to avoid decimal values
					avg       = Math.floor((r + g + b) / 3);
					colorSum += avg;

				}

				// calculating an average
				var brightness = Math.floor(colorSum / (this.width * this.height));

				callback(brightness); // done reading the image file

			}

			img.onerror = function() {

				//console.log('Image: '+self.imageFileName+' doesn\'t exist!');

			}

		}

	};

	// main function declaration
	$.fn.imageBrightness = function(options) {

		// loop through all elements
		this.each(function() {

			// creating an instance
			var brightness = Object.create(Brightness);

			// initialize the process
			brightness.init(options, this);

		});

		// return the object to continue chaining
		return this;

	};

	// keeping the options beyond the scope of the function to make this available for the developer directly
	$.fn.imageBrightness.options = {

		displayReverseValue: false, // to get contrast value
		appendValue: false // to append the value to the image tag

	};

}) (jQuery, window, document);