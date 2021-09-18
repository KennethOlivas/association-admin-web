<div class="relative mt-4 text-primary">
	<div class="loader9 bg" />
	<p class="text-center mr-16 text-2xl font-bold loader-text mt-4" />

</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Lato:300);

	.loader9 {
		position: relative;
		width: 24px;
		height: 24px;
		top: 46%;
		left: 46%;
		border-radius: 12px;
		background-color: #570df8;
	}

	.loader9:before {
		content: '';
		position: absolute;
		top: 0px;
		height: 24px;
		width: 24px;
		border-radius: 12px;
		-webkit-animation: loader9g 3s ease-in-out infinite;
		animation: loader9g 3s ease-in-out infinite;
	}

	.loader9:after {
		content: '';
		position: absolute;
		top: 0px;
		height: 24px;
		width: 24px;
		border-radius: 12px;
		-moz-animation: loader9d 3s ease-in-out infinite;
		animation: loader9d 3s ease-in-out infinite;
	}

	@-webkit-keyframes loader9g {
		0% {
			left: -50px;
			background-color: rgba(48, 72, 180, 0.753);
		}
		50% {
			left: 0px;
			background-color: rgba(4, 13, 196, 0.1);
		}
		100% {
			left: -59px;
			background-color: rgba(69, 76, 172, 0.432);
		}
	}
	@keyframes loader9g {
		0% {
			left: -50px;
			background-color: rgba(48, 72, 180, 0.753);
		}
		50% {
			left: 0px;
			background-color: rgba(39, 10, 168, 0.1);
		}
		100% {
			left: -50px;
			background-color: rgba(69, 76, 172, 0.432);
		}
	}

	@-webkit-keyframes loader9d {
		0% {
			left: 50px;
			background-color: rgba(48, 72, 180, 0.753);
		}
		50% {
			left: 0px;
			background-color: rgba(39, 10, 168, 0.1);
		}
		100% {
			left: 50px;
			background-color: rgba(69, 76, 172, 0.432);
		}
	}
	@keyframes loader9d {
		0% {
			left: 50px;
			background-color: rgba(48, 72, 180, 0.753);
		}
		50% {
			left: 0px;
			background-color: rgba(39, 10, 168, 0.1);
		}
		100% {
			left: 50px;
			background-color: rgba(69, 76, 172, 0.432);
		}
	}

	.loader-text {
		color: rgb(11, 8, 53);
		font-family: arial, sans-serif;
	}

	.loader-text:after {
		content: 'Loading';
		animation: load 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes load {
		0% {
			content: 'Cargando';
		}
		33% {
			content: 'Cargando.';
		}
		67% {
			content: 'Cargando..';
		}
		100% {
			content: 'Cargando...';
		}
	}
</style>
