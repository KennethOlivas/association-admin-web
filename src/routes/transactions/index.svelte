<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';
	import { countryList } from '../../lib/utils';
	import { sleep } from '../../lib/utils';
	import ModalInfo from '../../components/ModalInfo.svelte';
	import { fade } from 'svelte/transition';

	//Variables de las tabla
	let head = [];
	let body = [];
	head = ['id', 'nombre', 'identificacion', 'estado'];
	let tableControler;
	//Variables
	let associates = [];
	let loading = false;
	let id;
	let addOrEdit = true;
	$: btnSubmit = addOrEdit ? 'agregar' : 'editar';
	let modalController;
	let page = 1;
	// limite de paginacion
	const limit = 8;

	//Controladores del modal de infromacion
	let modalInfo;
	let dataModalInfo = [];
	let idModalInfo;

	//variables del api
	let name;
	let lastname;
	let birthday;
	let gender;
	let identification;
	let profession;
	let academy_level;
	let observation;

	//busqueda
	let searchData;
	let typeSearch = false;
	let resultAcount = [];

	onMount(async () => {
		try {
			await getAssociates();
		} catch (error) {
		} finally {
			loading = true;
		}
	});

	const edit = async () => {
		let data = {
			name,
			birthday,
			lastname,
			gender,
			identification,
			academy_level,
			observation,
			profession
		};
		(async () => {
			try {
				await api.put(`/associates/${id}`, data);
			} catch (error) {
			} finally {
				await getAssociates();
			}
			modalController.closeModal();
		})();
	};

	const getAssociates = async () => {
		let res;
		const start = +page === 1 ? 0 : (+page - 1) * 3;

		try {
			res = await api
				.get(`/associates?_sort=id:DESC&_limit=${limit}&_start=${start}`)
				.then((response) => response.json());
		} catch (error) {
		} finally {
			associates = [];
			associates = [...res];
			console.log(associates);
		}
	};

	const nextPage = async () => {
		associates.length > limit - 1 ? page++ : (page = page);
		await getAssociates();
		loaData();
	};

	const previusPage = async () => {
		page > 1 ? page-- : (page = 1);

		console.log(page);
		await getAssociates();
		loaData();
	};

	const setEdit = async (event) => {
		addOrEdit = false;
		id = event.detail.id;
		let data = associates.find((e) => e.id === id);
		name = data.name;
		birthday = data.birthday;
		gender = data.gender;
		identification = data.identification;
		lastname = data.lastname;
		academy_level = data.academy_level;
		observation = data.observation;
		profession = data.profession;
		modalController.openModal();
	};

	const loaData = async () => {
		body = [];
		for (const data of associates) {
			body.push([data.id, data.name + ' ' + data.lastname, data.identification, data.status]);
		}
		await sleep(200);
		tableControler.addDataBody(body);
	};

	const clearData = () => {
		name = '';
		birthday = '';
		gender = '';
		identification = '';
		profession = '';
		academy_level = '';
		lastname = '';
		addOrEdit = true;
	};

	const search = async () => {
		let res;

		if (typeSearch) {
			try {
				res = await api
					.get(`/associates?identification_contains=${searchData}`)
					.then((response) => response.json());
				console.log(res);
			} catch (error) {
			} finally {
				associates = [];
				associates = [...res];
			}
		} else {
			try {
				res = await api
					.get(`/associates?name_contains=${searchData}`)
					.then((response) => response.json());
				console.log(res);
			} catch (error) {
			} finally {
				associates = [];
				associates = [...res];
			}
		}

		console.log(searchData);
		loaData();
	};

	const toOpenModalInfo = (e) => {
		dataModalInfo = [];
		resultAcount = [];
		let id = e.detail.id;
		let data = associates.find((e) => e.id === id);
		idModalInfo = data.id;
		dataModalInfo = data;
		if (dataModalInfo.Associate_accounts > 0) {
			resultAcount = dataModalInfo.Associate_accounts;
		}

		console.log(dataModalInfo);
		modalInfo.openModal();
	};

	const changeStatus = async (id) => {
		let data = {
			status: true
		};
		let res;
		try {
			res = await api.put(`/associates/${id}`, data).then((response) => response.json());
			console.log(res);
		} catch (error) {
			console.log(error);
		} finally {
			await getAssociates();
		}

		modalInfo.closeModal();
		loaData();
	};
</script>

<svelte:head>
	<title>Socios</title>
</svelte:head>

<div>
	<ModalInfo bind:this={modalInfo} title={dataModalInfo.name + ' ' + dataModalInfo.lastname + "   //  "  + dataModalInfo.identification}>
		<div class="overflow-x-auto mt-4">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Numero de cuenta</th>
						<th>Monto</th>
						<th>Algo mas</th>
					</tr>
				</thead>
				<tbody>
					{#each resultAcount as data}
						<tr class="hover cursor-pointer rounded-box" transition:fade={{ duration: 400 }}>
							<th>{data.number}</th>
							<td>{data.amount}</td>
							<td>??</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</ModalInfo>
</div>

<h1 class="text-center text-2xl font-bold text-gray-700" transition:fade={{ duration: 100 }}>
	Transacciones
</h1>
<div class="flex items-center justify-between" transition:fade={{ duration: 100 }}>
	<select bind:value={typeSearch} class="select select-info mx-2">
		<option value={false}>Nombre</option>
		<option value={true}>Cedula</option>
	</select>
	<input
		on:keyup={search}
		bind:value={searchData}
		type="text"
		required
		placeholder="Buscar Socio..."
		class="input input-primary input-bordered focus:placeholder-primary w-full my-4 mr-4"
	/>
</div>
{#if loading}
	<Table
		bind:this={tableControler}
		{head}
		ifFalse="No verificado"
		ifTrue="Verificado"
		hiddenButton={true}
		on:handleTable={toOpenModalInfo}
		on:message={loaData}
		on:nextPage={nextPage}
		on:previusPage={previusPage}
	/>
{:else}
	<Loader />
{/if}
