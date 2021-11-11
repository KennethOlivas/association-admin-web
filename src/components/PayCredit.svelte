<script>
	import * as api from '../lib/api';
	import { onMount } from 'svelte';

	import { fade, fly } from 'svelte/transition';
	import Loader from './Loader.svelte';

	export let associate;

	let page = 1;
	// limite de paginacion
	const limit = 12;
	let creditsTransactions = [];

	let promise = Promise.resolve([]);

	onMount(async () => {
		try {
			promise = getCreditTransactions();
		} catch (error) {
			console.log(error);
		}
	});

	const getCreditTransactions = async () => {
		let res;
		const start = +page === 1 ? 0 : (+page - 1) * 12;

		try {
			res = await api
				.get(
					`/credits?associate_credit_account.id_contains=${associate.id}&_sort=quote:ASC&_limit=${limit}&_start=${start}`
				)
				.then((response) => response.json());
			console.log(res);
		} catch (error) {
		} finally {
			creditsTransactions = [];
			creditsTransactions = [...res];
		}
		console.log(creditsTransactions);
	};

	const nextPage = async () => {
		creditsTransactions.length > limit - 1 ? page++ : (page = page);
		await getCreditTransactions();
		loaData();
	};

	const previusPage = async () => {
		page > 1 ? page-- : (page = 1);

		await getCreditTransactions();
	};
</script>

{#await promise}
	<Loader />

	
{/await}
