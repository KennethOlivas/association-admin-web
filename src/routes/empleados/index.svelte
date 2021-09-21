<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';

	let head = [];
	let body = [];
	head = ['id', 'nombre', 'nacionalidad', "identificacion"];
	let tableControler
	let employees = []
	let loading = false
	let id 
	let addOedit = true;
	$: btnSubmit = addOedit ? "agregar" : "editar"
	let modalController;


	//variables del api
	let name
	let birthday
	let business_mail
	let email 
	let gender
	let identification
	let marital_status
	let nationality
	let profession



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

	const setEdit = async (event) => {
		addOedit = false
		id = event.detail.id;
		let data = employees.find((e) => e.id === id);
		name = data.name;
		email = data.email;
		
		modalController.openModal();
	};

	const loaData = () => {
		body = [];
		for (const data of employees) {
			body.push([data.id, data.name, data.nationality, data.identification]);
		}
		
		tableControler.addDataBody(body);
	};


	const deleteUser = async (event) => {
		loading = false;

		let id = event.detail.id;

		try {
			await api.DELETE(`/employees/${id}`);
			await getUsers();
		} catch (error) {
			console.log(error);
		}

		loading = true;
	};


	const clearData = () => {
		 name = ""
		 birthday = ""
		 business_mail = ""
		 email = ""
		 gender = ""
		 identification = ""
		 marital_status = ""
		 nationality = ""
		 profession = ""
	};

	const submit = async () => {
		loading = false;
		if (addOedit) {
			await post();
		} else {
			await edit();
		}
		await getUsers();
		clearData()
		loading = true;
	};
	
</script>

<h1 class="text-center text-2xl font-bold text-gray-700">Empleados</h1>
<div class="flex items-center justify-end">
	<Modal tilte="Agregar empleado" btnName="Agregar" bind:this={modalController}
	>
	<form class="form-control" on:submit|preventDefault={submit}>
		<label for="name" class="label">
			<span class="label-text">Nombre de empleado </span>
		</label>
		<input
			bind:value={name}
			type="text"
			required
			placeholder="Nombre del empleado"
			class="input input-primary input-bordered focus:placeholder-primary"
		/>

		<label for="name" class="label">
			<span class="label-text">Correo electronico</span>
		</label>
		<input
			bind:value={email}
			type="email"
			required
			placeholder="Email"
			class="input input-primary input-bordered focus:placeholder-primary"
		/>

		<label for="password" class="label mt-2">
			<span class="label-text">Genero</span>
		</label>
		<select bind:value={gender} class="select select-bordered select-info w-full" required>
			<option disabled="disabled" selected="selected">Elija...</option>
			<option value="Masculino">Masculino</option>
			<option value="Femenino">Femenino</option>
		</select>
		
		<div class="modal-action">
			<button class="btn btn-info w-1/2" type="submit">{btnSubmit}</button>
			<label for="my-modal-2" type="button" class="btn btn-error text-white w-1/2" on:click={clearData}>Cancelar</label>
		</div>
		</form>
	</Modal>
</div>
{#if loading}
	<Table
	bind:this={tableControler}
	{head}
	on:message={loaData}
	on:deleteItem={deleteUser}
	on:editItem={setEdit}
	
	/>
{:else}
	<Loader />
{/if}
