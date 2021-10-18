<svelte:head>
	<title>Young Ocean</title>
</svelte:head>


<script>
	import Loader from '../components/Loader.svelte';
	import { user } from '../store/session';
	import { onMount } from 'svelte';
    
    onMount( () => {
    
        console.log($user);
    })

    
</script>


<style>

</style>
<div
	class="hero"
	style="background-image: url(https://static.vecteezy.com/system/resources/previews/002/380/203/non_2x/isometric-people-working-with-technology-illustration-free-vector.jpg);"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="text-center hero-content text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">{$user.username}</h1>
			<p class="mb-5">
                Bienvenido
			</p>
		</div>
	</div>
</div>

<p>Toy aburrido</p>
