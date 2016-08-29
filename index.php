<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jQuery - Image Brightness</title>
	
	<script src="js/jquery-1.9.1.js" ></script>
	<script src="js/jquery.image-brightness.js" ></script>

	<style>
	body, img {
		margin: 0;
		padding: 0;
	}
	body {
		background: #61b6c1;
	}
	.container {
		width: 900px;
		margin: 0 auto;
		position: relative;
	}
	.image-wrapper img {
		width: 300px;
		display: block;
		float: left;
	}
	.image-wrapper div {
		height: 245px;
		float: left;
		font-family: arial;
		margin-bottom: 20px;
	}
	.image-wrapper span {
		text-align: center;
		background: #61b6c1;
		display: block;
	}
	.image-wrapper {
		width: 900px;
		position: absolute;
		left: 50%;
		margin: 0 0 0 -450px;
	}
	</style>
</head>
<body>

	<div class="container">
		<div class="image-wrapper">
			<img id="test" src="images/image-000000.jpg" alt="image">
			<img src="images/image-1A1A1A.jpg" alt="image">
			<img src="images/image-343434.jpg" alt="image">
			<img src="images/image-828282.jpg" alt="image">
			<img src="images/image-E5E5E5.jpg" alt="image">
			<img src="images/image-FFFFFF.jpg" alt="image">
		</div>
	</div>

	<script>
	$(document).ready(function() {

		//$('.image-wrapper img').imageBrightness();
		//$('img#test').imageBrightness();
		
		$('.image-wrapper img').imageBrightness({
			displayReverseValue: true,
			appendValue: true
		});

	});
	</script>

</body>
</html>