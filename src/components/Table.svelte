<svelte:options accessors />

<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { onMount } from 'svelte';
	import {fly} from "svelte/transition"

	const dispatch = createEventDispatcher();
	export let head = [];
	export let body = [];


	onMount(() => {
		dispatch('message');
	});




	export const addDataBody = (data) => {
		body = data;
	};

	export const reload = (data) => {
		body = data;
	};

	const deleteItem = (id) => {
		dispatch("deleteItem",{
			id: id
		})
	
	}

	const editItem = (id) => {
		dispatch("editItem",{
			id: id
		})
	
	}

</script>

<div class="overflow-hidden mx-4">
	<table class="table w-full table-zebra ">
		<thead  transition:fly="{{ y: 200, duration: 400 }}">
			<tr>
				{#each head as header}
					<th>{header}</th>
				{/each}
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each body as bodyTable}
				<tr class="group" >
					{#each bodyTable as data}
						<th  transition:fly="{{ y: 200, duration: 400 }}"
							class="group-hover:bg-primary  opacity-100 group-hover:bg-opacity-60 transition duration-200 capitalize cursor-pointer"
							>{data}
						</th>
					{/each}
					<th  transition:fly="{{ y: 200, duration: 400 }}"
						class="group-hover:bg-primary opacity-100 group-hover:bg-opacity-60 transition duration-200 cursor-pointer"
					>
						<button class="btn  btn-ghost btn-circle btn-sm mx-1 " on:click={editItem(bodyTable[0])}
							><i class="fas fa-pen" />
						</button>

						<button class="btn  btn-ghost btn-circle btn-sm mx-1" on:click={deleteItem(bodyTable[0])}
							><i class="fas fa-trash-alt"/></button
						></th
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
