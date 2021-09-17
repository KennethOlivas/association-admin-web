<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from "../../lib/api"
	import { onMount } from 'svelte';
	let roles = [];
	let loading = false;
	let head = ['id', 'nombre', ];

	let modalController;
	let tableControler;

	onMount(async () => {
		try {
			let res = await api.get('/users-permissions/roles').then((response) => response.json());
			
			roles = [...res]
			tableControler.body = roles;
		} catch (error) {
			console.log(error);
		}
		loading = true;
	});

	

	const test = () => {
		console.log(tableControler.body);
	};
</script>

<h1 on:click={test} class="text-center text-2xl font-bold text-gray-50">Roles</h1>

<Modal tilte="Agregar rol" btnName="Agregar rol">
	<label for="username" class="label">
		<span class="label-text">Nombre del </span>
	</label>
	<input
		type="text"
		ud="username"
		placeholder="Nombre usuario"
		class="input input-primary input-bordered focus:placeholder-primary"
	/>
	<div class="modal-action">
		<button class="btn btn-primary w-1/2" type="button"
			><label for="my-modal-2" class="">Agregar</label></button
		>
		<label for="my-modal-2" class="btn w-1/2">Cancelar</label>
	</div>
</Modal>

<Table {head}on:message={(tableControler.body = [...roles])}>
	<button class="btn  btn-ghost btn-circle btn-sm mx-1 "><i class="fas fa-pen" /></button>

	<button class="btn  btn-ghost btn-circle btn-sm mx-1"><i class="fas fa-trash-alt" /></button>
</Table>
