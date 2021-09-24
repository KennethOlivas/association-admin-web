<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';
	import { countryList } from '../../lib/utils';

	let head = [];
	let body = [];
	head = ['id', 'nombre', 'nacionalidad', 'identificacion'];
	let tableControler;
	let employees = [];
	let loading = false;
	let id;
	let addOrEdit = true;
	$: btnSubmit = addOrEdit ? 'agregar' : 'editar';
	let modalController;

	//variables del api
	let name;
	let birthday;
	let business_mail;
	let email;
	let gender;
	let identification;
	let marital_status;
	let nationality;
	let profession;

	onMount(async () => {
		try {
			await getEmployees();
		} catch (error) {

		} finally {
			loading = true;
		}
		
		
	});

	const edit = async () => {
	
		let data = {
			name,
			birthday,
			business_mail,
			email,
			gender,
			identification,
			marital_status,
			nationality,
			profession
		};
		(async () => {
			try {
				await api.put(`/employees/${id}`, data);
			} catch (error) {
			} finally {
				await getEmployees();
			}
			modalController.closeModal();
		})();
	};

	const post = async () => {
		let data = {
			name,
			birthday,
			business_mail,
			email,
			gender,
			identification,
			marital_status,
			nationality,
			profession
		};

		try {
			await api.post('/employees', data);
		} catch (error) {
			console.log(error);
		} finally {
			await getEmployees();
		}
		modalController.closeModal();
	};

	const getEmployees = async () => {
		let res;
		try {
			res = await api.get('/employees').then((response) => response.json());
			console.log(res);
		} catch (error) {
		} finally {
			employees = [];
			employees = [...res];
		}
	
	};

	const setEdit = async (event) => {
		addOrEdit = false;
		id = event.detail.id;
		let data = employees.find((e) => e.id === id);
		name = data.name;
		email = data.email;
		birthday = data.birthday;
		business_mail = data.business_mail;
		gender = data.gender;
		identification = data.identification;
		nationality = data.nationality;
		profession = data.profession;
		modalController.openModal();
	};

	const loaData = () => {
		body = [];
		for (const data of employees) {
			body.push([data.id, data.name, data.nationality, data.identification]);
		}

		tableControler.addDataBody(body);
	};

	const deleteEmployee = async (event) => {
		loading = false;

		let id = event.detail.id;

		try {
			await api.DELETE(`/employees/${id}`);
			await getEmployees();
		} catch (error) {
			console.log(error);
		}

		loading = true;
		loaData();
	};

	const clearData = () => {
		name = '';
		birthday = '';
		business_mail = '';
		email = '';
		gender = 'Elija...';
		identification = '';
		marital_status = '';
		nationality = 'Elija...';
		profession = '';
		addOrEdit = true;
	};

	const submit = async () => {
		loading = false;

		if (addOrEdit) {
			await post();
		} else {
			await edit();
		}

		clearData();

		loading = true;
		loaData();
	};
</script>

<h1 class="text-center text-2xl font-bold text-gray-700">Empleados</h1>
<div class="flex items-center justify-end">
	<Modal tilte="Agregar empleado" btnName="Agregar" icon="fas fa-plus" bind:this={modalController}>
		<form class="form-control " on:submit|preventDefault={submit}>
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

			<div class="w-full flex">
				<div class="w-1/2 mr-2">
					<label for="name" class="label">
						<span class="label-text">Identificacion</span>
					</label>
					<input
						bind:value={identification}
						type="text"
						required
						placeholder=""
						class="input input-primary input-bordered focus:placeholder-primary w-full"
					/>
				</div>

				<div class="w-1/2 ml-2">
					<label for="name" class="label">
						<span class="label-text">Profession</span>
					</label>
					<input
						bind:value={profession}
						type="text"
						required
						placeholder=""
						class="input input-primary input-bordered focus:placeholder-primary w-full"
					/>
				</div>
			</div>

			<label for="name" class="label">
				<span class="label-text">Correo electronico personal</span>
			</label>
			<input
				bind:value={email}
				type="email"
				required
				placeholder="Email"
				class="input input-primary input-bordered focus:placeholder-primary"
			/>

			<label for="name" class="label">
				<span class="label-text">Correo electronico corporativo</span>
			</label>
			<input
				bind:value={business_mail}
				type="email"
				placeholder="Email"
				class="input input-primary input-bordered focus:placeholder-primary"
			/>

			<label for="name" class="label">
				<span class="label-text">Fecha de nacimiento</span>
			</label>
			<input
				bind:value={birthday}
				type="date"
				required
				placeholder=""
				class="input input-primary input-bordered focus:placeholder-primary"
			/>

			<label for="gender" class="label mt-2">
				<span class="label-text">Genero</span>
			</label>
			<select bind:value={gender} class="select select-bordered select-info w-full" required>
				<option disabled="disabled" selected="selected">Elija...</option>
				<option value="Masculino">Masculino</option>
				<option value="Femenino">Femenino</option>
			</select>

			<label for="na" class="label mt-2">
				<span class="label-text">nacionalidad</span>
			</label>
			<select bind:value={nationality} class="select select-bordered select-info w-full" required>
				<option disabled="disabled" selected="selected">Elija...</option>
				{#each countryList as country}
					<option value={country}>{country}</option>
				{/each}
			</select>

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
{#if loading}
	<Table
		bind:this={tableControler}
		{head}
		on:message={loaData}
		on:deleteItem={deleteEmployee}
		on:editItem={setEdit}
	/>
{:else}
	<Loader />
{/if}
