<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';

	let head = [];
	let body = [];
	head = ['id', 'nombre', 'nacionalidad'];
	let tableControler
	let employees
	let loading = false
	onMount(async () => {
		try {
			await getEmployees()
		} catch (error) {
			
		}
		loading = true
	})
    
	const getEmployees = async() =>{
		let res = await api.get('/employees').then((response) => response.json());
		employees = [];
		employees = [...res];
		console.log(employees);
	}


	const loaData = () => {
		body = [];
		for (const data of employees) {
			body.push([data.id, data.name, data.nationality]);
		}
		
		tableControler.addDataBody(body);
	};

</script>

<h1 class="text-center text-2xl font-bold text-gray-700">Empleados</h1>
<div class="flex items-center justify-end">
	<Modal tilte="Agregar empleado" btnName="Agregar">
		<label for="username" class="label">
			<span class="label-text">Nombre de empleado </span>
		</label>
		<input
			type="text"
			ud="username"
			placeholder="Nombre usuario"
			class="input input-primary input-bordered focus:placeholder-primary"
		/>
		<div class="modal-action">
			<button class="btn btn-primary w-1/2" type="button"><label for="my-modal-2" class="">Agregar</label></button>
			<label for="my-modal-2" class="btn w-1/2">Cancelar</label>
		</div>
	</Modal>
</div>
{#if loading}
	<Table
		bind:this={tableControler}
		{head}
		on:message={loaData}
	
	/>
{:else}
	<Loader />
{/if}
