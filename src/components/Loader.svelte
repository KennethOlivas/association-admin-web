<div class="relative mt-4">

    <div class="loader9"></div>
    <p class="text-center mr-16 text-2xl font-bold loader-text mt-4"></p>
 

</div>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);



/* -------------- loader9 -------------- */

.loader9:before{
   content: "";
   position: absolute;
   top: 0px;
   height: 24px;
   width: 24px;
   border-radius: 12px;
   -webkit-animation: loader9g 3s ease-in-out infinite;
           animation: loader9g 3s ease-in-out infinite;
}

.loader9{
   position: relative;
   width: 24px;
   height: 24px;
   top: 46%;
   left: 46%;
   border-radius: 12px;
   background-color: #fff;
}


.loader9:after{
   content: "";
   position: absolute;
   top: 0px;
   height: 24px;
   width: 24px;
   border-radius: 12px;
   -moz-animation: loader9d 3s ease-in-out infinite;
           animation: loader9d 3s ease-in-out infinite; 
}

@-webkit-keyframes loader9g{
   0%{	left: -50px; background-color: rgba(255, 255, 255, .8); }
   50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
   100%{ left:-59px; background-color: rgba(255, 255, 255, .8); }
}
@keyframes loader9g{
   0%{	left: -50px; background-color: rgba(255, 255, 255, .8); }
   50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
   100%{ left:-50px; background-color: rgba(255, 255, 255, .8); }
}


@-webkit-keyframes loader9d{
   0%{	left: 50px; background-color: rgba(255, 255, 255, .8); }
   50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
   100%{ left:50px; background-color: rgba(255, 255, 255, .8); }
}
@keyframes loader9d{
   0%{	left: 50px; background-color: rgba(255, 255, 255, .8); }
   50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
   100%{ left:50px; background-color: rgba(255, 255, 255, .8); }
}


.loader-text {
  color: #fff;
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