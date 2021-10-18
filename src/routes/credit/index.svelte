<svelte:head>
	<title>Creditos</title>
</svelte:head>
<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	import * as api from '../../lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../components/Loader.svelte';
	import { countryList } from '../../lib/utils';
	import { sleep } from '../../lib/utils';
	import ModalInfo from '../../components/ModalInfo.svelte';
	import { fade, fly } from 'svelte/transition';

    	//Variables de las tabla
	let head = [];
	let body = [];
	head = ['id', 'Socio', 'Credito', 'estado'];
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

	let modalAux = true;

	//Controladores del modal de infromacion
	let modalInfo;
	let dataModalInfo = [];
	let idModalInfo;

	let res = false;
	let titleModalTransction = 'Tipo de transaccion';

	//busqueda
	let searchData;
	let autofocusInput
	let typeSearch = false;
	let resultAcount = [];

	//variables api
	let amount;
	let limit_date;

    let credits = []


	onMount(async () => {
		try {
			await getCredits();
		} catch (error) {
		} finally {
			loading = true;
		}
	});

	const getCredits = async () => {
		let res;
		const start = +page === 1 ? 0 : (+page - 1) * 3;

		try {
			res = await api
				.get(`/credits?_sort=id:DESC&_limit=${limit}&_start=${start}`)
				.then((response) => response.json());
                console.log(res);
		} catch (error) {
		} finally {
			credits = [];
			credits = [...res];
		}
        
	};

    const nextPage = async () => {
		associates.length > limit - 1 ? page++ : (page = page);
		await getTransaction();
		loaData();
	};

	const previusPage = async () => {
		page > 1 ? page-- : (page = 1);

		await getTransaction();
		loaData();
	};

	const loaData = async () => {
		body = [];
		for (const data of credits) {
			body.push([data.id, data.associate.name + " " + data.associate.lastname , data.amount, data.status]);
		}
		await sleep(200);
		tableControler.addDataBody(body);
	};

	const clearData = () => {
		titleModalTransction = 'Tipo de transaccion';
		modalAux = true;
		valance = 0;
	};

	const search = async () => {
		let res;

		if (typeSearch) {
			try {
				res = await api
					.get(`/associates?identification_contains=${searchData}`)
					.then((response) => response.json());
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
			} catch (error) {
			} finally {
				associates = [];
				associates = [...res];
			}
		}

		loaData();
	};

	const toOpenModalInfo = (e) => {
		dataModalInfo = [];
		resultAcount = [];
		let id = e.detail.id;
		let data = associates.find((e) => e.id === id);
		idModalInfo = data.id;
		dataModalInfo = data;
		resultAcount = dataModalInfo.associate_accounts;

		modalInfo.openModal();
	};

	const handleAcount = (acount) => {
		console.log(acount);
		number = acount.number;
		id = acount.id;
		amount = acount.amount;
		console.log(id);
		modalInfo.closeModal();
		modalController.openModal();
	};

	const typeTransction = (value) => {
		type = value;
		modalAux = false;
		type ? (titleModalTransction = 'Deposito') : (titleModalTransction = 'retiro ');
		console.log(modalAux);
	};

	const submit = async () => {
		if (type) {
			amount += valance;
		} else {
			amount -= valance;
		}

		let data = {
			id,
			amount
		};
		(async () => {
			try {
				let response = await api.put(`/associate-accounts/${id}`, data);
				if (response.ok) res = true;
			} catch (error) {
			} finally {
				await getTransaction();
			}
			modalController.closeModal();
		})();

		await sleep(400);
	};

</script>


{#if loading}
	<Table
		bind:this={tableControler}
		{head}
		ifFalse="No Activo"
		ifTrue="Activo"
		hiddenButton={true}
		on:handleTable={toOpenModalInfo}
		on:message={loaData}
		on:nextPage={nextPage}
		on:previusPage={previusPage}
	/>
{:else}
	<Loader />
{/if}

