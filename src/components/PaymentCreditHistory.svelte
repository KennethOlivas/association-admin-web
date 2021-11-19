<script>
	import * as api from '../lib/api';

	export let associate;
	let plan;

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
		try {
			res = await api
				.get(`/credits?associate_credit_account.id_contains=${associate.id}&_sort=quote:ASC`)
				.then((response) => response.json());
			console.log(res);
		} catch (error) {
		} finally {
			plan = [];
			plan = [...res];
		}
		console.log(plan);
	};


</script>
