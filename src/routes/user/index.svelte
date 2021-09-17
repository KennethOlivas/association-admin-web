<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/loader.svelte';
	import { prevent_default } from 'svelte/internal';

	let users = [];
	let loading = false;
	let head = ['id', 'nombre', 'role'];
	let body = [];
	let modalController;
	let tableControler;

	let roles;

	//datos del usuario
	let username;
	let email;
	let password;

	onMount(async () => {
		try {
			let res = await api.get('/users').then((response) => response.json());
			users = [...res];
		} catch (error) {
			console.log(error);
		}
		loading = true;
	});

	const loaData = () => {
		body = []
		for (const data of users) {
			body.push([data.id, data.username, data.role.name]);
		}
		console.log("entre");
		tableControler.addDataBody(body);
	};

	const test = async () => {
		try {
			roles = await api.get('/users-permissions/roles').then((response) => response.json());
		} catch (error) {
			console.log(error);
		}
	};

	const post = async () => {
		loading = false;
		let data = {
			username: username,
			email: email,
			password: password
		};

		try {
			await api.post('/users', data);
			let res = await api.get('/users').then((response) => response.json());
			users = []
			users = [...res];
	
		} catch (error) {}
		modalController.closeModal();
		loading = true;
	};


	const deleteUser = async (event) => {
		console.log(event.detail);
		let id = event.detail.id
		console.log(id);
		await api.DELETE("/users",id)


	}

</script>

<h1 on:click={loaData} class="text-center text-2xl font-bold ">Usuarios</h1>

<div class="flex items-center justify-end">
	<Modal
		bind:this={modalController}
		on:onClick={test}
		tilte="Agregar usuario"
		btnName="Agregar"
		icon="fas fa-user-plus"
	>
		<form class="form-control" on:submit|preventDefault={post}>
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
			<input
				bind:value={password}
				required
				type="password"
				ud="password"
				placeholder="Contranea"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>

			<div class="modal-action">
				<button class="btn btn-info w-1/2" type="submit">Agregar</button>
				<label for="my-modal-2" class="btn btn-error text-white w-1/2">Cancelar</label>
			</div>
		</form>
	</Modal>
</div>

{#if loading}
	<Table bind:this={tableControler} {head} on:message={loaData} on:deleteItem={deleteUser}>

	</Table>
{:else}
	<Loader />
{/if}
