<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';


	let users = [];
	let loading = false;
	let head = ['id', 'nombre', 'role'];
	let body = [];
	let modalController;
	let tableControler;


	let roles = [];

	//datos del usuario
	let username;
	let email;
	let password;
	let role;
	
	let addOedit = true;
	$: btnSubmit = addOedit ? "agregar" : "editar"
	let id 
	

	onMount(async () => {
		try {
			await getUsers();
		} catch (error) {
			console.log(error);
		}
		loading = true
	});

	const getUsers = async () => {
		let res = await api.get('/users').then((response) => response.json());
		users = [];
		users = [...res];
	};

	const loaData = () => {
		body = [];
		for (const data of users) {
			body.push([data.id, data.username, data.role.name]);
		}
		
		tableControler.addDataBody(body);
	};

	const getRoles = async () => {
		try {
			let res = await api.get('/users-permissions/roles').then((response) => response.json());
			roles = res.roles;
			console.log(roles);
		} catch (error) {
			console.log(error);
		}
	};

	const post = async () => {
		
		let data = {
			username: username,
			email: email,
			password: password,
			role: role
		};

		try {
			await api.post('/users', data);
			
		} catch (error) {}
		modalController.closeModal();
	
	};


	const edit = async () => {
		
		let data = {
			username: username,
			email: email,
			password: password,
			role: role
		};
	
		(async () => {
		try {
			await api.put(`/users/${id}`, data);
			
			
		} catch (error) {}
		modalController.closeModal();
		})()
		
	
	};

	const deleteUser = async (event) => {
		loading = false;

		let id = event.detail.id;

		try {
			await api.DELETE(`/users/${id}`);
			await getUsers();
		} catch (error) {
			console.log(error);
		}

		loading = true;
	};

	const setEdit = async (event) => {
		addOedit = false
		await getRoles();

		id = event.detail.id;
		let data = users.find((e) => e.id === id);
		username = data.username;
		email = data.email;
		role = data.role.id;
		modalController.openModal();
	};

	const clearData = () => {
		username = '';
		password = '';
		email = '';
		role = 'Elija...';
		id = ""
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

<h1 on:click={loaData} class="text-center text-2xl font-bold ">Usuarios</h1>

<div class="flex items-center justify-end">
	<Modal
		bind:this={modalController}
		on:onClick={getRoles}
		tilte="Agregar usuario"
		btnName="Agregar"
		icon="fas fa-user-plus"
	>
		<form class="form-control" on:submit|preventDefault={submit}>
			<label for="username" class="label mt-2">
				<span class="label-text">Nombre de usuario </span>
			</label>
			<input
				bind:value={username}
				required
				type="text"
				ud="username"
				placeholder="Nombre usuario"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>

			<label for="password" class="label mt-2">
				<span class="label-text">Correo electronico</span>
			</label>
			<input
				bind:value={email}
				required
				type="email"
				ud="email"
				placeholder="Correo electronico"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>

			<label for="password" class="label mt-2">
				<span class="label-text">Contraseña </span>
			</label>
			{#if addOedit}
			<input
				bind:value={password}
				required
				type="password"
				ud="password"
				placeholder="Contranea"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>
			{:else}
			<input
				bind:value={password}
				
				type="password"
				ud="password"
				placeholder="Contranea"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>
			{/if}

			<label for="password" class="label mt-2">
				<span class="label-text">Roles</span>
			</label>
			<select bind:value={role} class="select select-bordered select-info w-full" required>
				<option disabled="disabled" selected="selected">Elija...</option>
				{#each roles as rol}
					<option value={rol.id}>{rol.name}</option>
				{/each}
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
