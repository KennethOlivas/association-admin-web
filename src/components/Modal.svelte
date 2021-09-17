<svelte:options accessors />

<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let tilte;
	export let btnName;
    export let icon
	let modal = false;

	export const openModal = () => {
		modal = true;
	};

    export const closeModal = () => {
        modal = false
    }

    export const clicked = () => {
        dispatch("onClick")
    }

</script>

<label for="my-modal-2" on:click={clicked} class="btn btn-info hover:bg-blue-600 my-4 mx-4 modal-button"
	><i class="{icon} mr-2 text-lg"></i>{btnName}</label
>
<input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="form-control">
			<p class="text-2xl text-center font-semibold">{tilte}</p>

			<slot />
		</div>
	</div>
</div>
