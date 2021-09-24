<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import ModalSearch from '../../components/ModalSearch.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';

	let users = [];
	let loading = false;
	let head = ['id', 'nombre', 'role'];
	let body = [];
	let modalController;
	let modalSearchController;
	let tableControler;
	let notFound = false;

	let search = [];
	let inputSearch;

	let roles = [];

	//datos del usuario
	let username;
	let email;
	let password;
	let role;
	let employee;
	let employeeName

	let addOedit = true;
	$: btnSubmit = addOedit ? 'agregar' : 'editar';
	let id;

	onMount(async () => {
		try {
			await getUsers();
		} catch (error) {
			console.log(error);
		}
		loading = true;
		loaData();
	});

	const getUsers = async () => {
		let res;
		try {
			res = await api.get('/users').then((response) => response.json());
			console.log(res);
		} catch (error) {
		} finally {
			users = [];
			users = [...res];
		}
		
	};

	const loaData = () => {
		body = [];
		for (const data of users) {
			body.push([data.id, data.username, data.role.name]);
		}
		console.log("entre");

		tableControler.addDataBody(body);
	};

	const getRoles = async () => {
		let res;
		try {
			res = await api.get('/users-permissions/roles').then((response) => response.json());
		} catch (error) {
			console.log(error);
		} finally {
			roles = res.roles;
		}
	};

	const post = async () => {
		let data = {
			username: username,
			email: email,
			password: password,
			role: role,
			employee: employee.id
		};

		try {
			await api.post('/users', data);
		} catch (error) {
		} finally {
			await getUsers();
		}
		modalController.closeModal();
	};

	const edit = async () => {
		let data = {
			username: username,
			email: email,
			password: password,
			role: role,
			employee: employee.id
		};

		(async () => {
			try {
				await api.put(`/users/${id}`, data);
			} catch (error) {
			} finally {
				await getUsers();
			}
			modalController.closeModal();
		})();
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
		loaData();
	};

	const setEdit = async (event) => {
		addOedit = false;
		await getRoles();

		id = event.detail.id;
		let data = users.find((e) => e.id === id);
		username = data.username;
		email = data.email;
		role = data.role.id;
		employee = data.employee
		employeeName = data.employee.name
		modalController.openModal();
	};

	const clearData = () => {
		username = '';
		password = '';
		email = '';
		role = 'Elija...';
		id = '';
		addOedit = true;
		employeeName = ""
		employee = ""
	};

	const submit = async () => {
		loading = false;
		if (addOedit) {
			await post();
		} else {
			await edit();
		}

		clearData();
		loading = true;
		loaData();
	};

	const openSearch = () => {
		modalSearchController.openModal();
	};

	const searchEmployee = async (search) => {
		let res;
		try {
			res = await api.get(`/employees/${search}`).then((response) => response.json());
			console.log(res);
			employee = res;
			employeeName = employee.name
			username = employeeName
			email = employee.email
			res.statusCode ? (notFound = true) : (notFound = false);
			res.statusCode ? (console.log("")) : (modalSearchController.closeModal())
		} catch (error) {
			console.log(error);
		}
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
			<div class="flex justify-center items-center">
				<div class="w-1/2 mr-2">
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
				</div>

				<div class="w-1/2 flex justify-center items-center mt-11 ml-2">
					<button class="btn btn-outline w-full" on:click={openSearch} type="button"
						><i class="fas fa-search-plus mr-2 text-xl" />Buscar empleado</button
					>
				</div>
			</div>

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

			<label for="password" class="label mt-2">
				<span class="label-text">Empleado</span>
			</label>
			<input
				bind:value={employeeName}
				required
				disabled
				type="text"
				placeholder="Empleado"
				class="input input-info input-bordered focus:placeholder-info w-full"
			/>

			<div class="modal-action">
				<button class="btn btn-info w-1/2" type="submit">{btnSubmit}</button>
				<label
					for="my-modal-2"
					type="button"
					class="btn btn-error text-white w-1/2"
					on:click={clearData}>Cancelar</label
				>
			</div>
		</form>
	</Modal>
</div>

<ModalSearch bind:this={modalSearchController} tilte="Buscar Empleado">
	<form class="form-control" on:submit|preventDefault={searchEmployee(inputSearch)}>
		<div class="form-control">
			<div class="relative mt-4">
				<input
					bind:value={inputSearch}
					type="text"
					placeholder="Buscar"
					class="w-full pr-16 input input-info input-bordered"
				/>
				<button
					type="submit"
					class="absolute top-0 right-0 rounded-l-none btn btn-primary text-white">buscar</button
				>
			</div>
		</div>
	</form>

	<div class="alert alert-error mt-4 {notFound ? '' : 'hidden'}">
		<div class="flex-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="w-6 h-6 mx-2 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
				/>
			</svg>
			<p>Usuario no encontrado</p>
		</div>
	</div>
</ModalSearch>

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
