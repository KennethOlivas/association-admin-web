<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import Loader from '../../components/Loader.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	let roles = [];
	let loading = false;
	let head = ['id', 'nombre'];
	let body = [];

	let modalController;
	let tableControler;

	onMount(async () => {
		try {
			await getRole();
		} catch (error) {
			console.log(error);
		}
		loading = true;
	});

	const getRole = async () => {
		try {
			let res = await api.get('/users-permissions/roles').then((response) => response.json());

			roles = [];
			roles = [...res.roles];
			console.log(roles);
			loaData();
		} catch (error) {
			console.log(error);
		}
	};

	const loaData = () => {
		body = [];
		for (const data of roles) {
			body.push([data.id, data.name]);
		}
		tableControler.addDataBody(body);
	};
	
</script>

<h1 class="text-center text-2xl font-bold text-gray-50">Roles</h1>

<div class="flex justify-end mx-2 mb-2">
	<a
		href="https://young-ocean-73880.herokuapp.com/admin/settings/users-permissions/roles"
		target="_blank"
		class="btn btn-info"><i class="fas fa-toolbox mr-2 text-lg"></i>Administrar Roles</a
	>
</div>
{#if loading}
	<Table bind:this={tableControler} {head} on:message={loaData} />
{:else}
	<Loader />
{/if}
