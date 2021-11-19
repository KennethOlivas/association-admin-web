<script>
	import * as api from '../lib/api';
	import { onMount } from 'svelte';
	import moment from 'moment';

	import { fade, fly } from 'svelte/transition';
	import Loader from './Loader.svelte';

	export let associate;

	let page = 1;
	// limite de paginacion
	const limit = 12;
	let creditsTransactions = [];

	let promise = Promise.resolve([]);

	//variables api
	let quote;
	let payment_date;
	let principal;
	let payment_deadline;
	let interest;
	let total = 0;
	let late_fee = 0;
	let remaining_balance;
	let late_date_days = '';
	let late_fee_percentaje = '';
	let aux

	let payments = [];

	onMount(async () => {
		if (payments.length === 0) {
			quote = 1;
			try {
				promise = getCreditTransactions();
			} catch (error) {
				console.log(error);
			}
		}
	});

	const getCreditTransactions = async () => {
		let res;

		try {
			res = await api
				.get(`/credits?associate_credit_account.id_contains=${associate.id}&_sort=quote:ASC`)
				.then((response) => response.json());
		} catch (error) {
			console.log(error);
		} finally {
			creditsTransactions = [];
			creditsTransactions = [...res];
			principal = creditsTransactions[0].principal;
			payment_deadline = creditsTransactions[quote - 1].limit_date;
			remaining_balance = creditsTransactions[0].remaining_balance + creditsTransactions[0].total
			aux = remaining_balance
		}

		if (payments.length === 0) {
			interest = creditsTransactions[0].interest;
		}
	};

	let data = {
		quote: 1,
		principal: 0,
		interest: 0,
		total: 0
	};

	const calculate = () => {
		late_fee = 0;
		let future = moment(payment_date);
		let start = moment(payment_deadline);
		let d = future.diff(start, 'days'); // 9
		console.log(d);

		if (d >= 0) {
			late_date_days = d;
		} else {
			advanceDay = late_date_days * -1;
			late_date_days = 0;
		}
		lateFeeCalculator();
	
	};

	const lateFeeCalculator = () => {
		late_fee = 0;
		if (late_date_days === 0 || late_fee_percentaje === '') {
			calculateTotal();
			return;
		}
		late_fee = (principal * (late_fee_percentaje / 100)) / 360;
		late_fee = (late_fee * late_date_days).toFixed(2);
		late_fee = parseFloat(late_fee);
		calculateTotal()
	};

	const calculateTotal = () => {
		total = 0;
		total = (late_fee + interest + principal).toFixed(2);
		total = parseFloat(total);
		remaining_balance = aux
		remaining_balance -= (interest + principal).toFixed(2);
		remaining_balance = parseFloat(remaining_balance)
	};
</script>

{#await promise}
	<Loader />
{:then}
	<div>
		<div class="overflow-x-auto overflow--auto mt-8">
			<p class="text-neutral text-2xl font-semibold cursor-default">
				{associate.associate.name}
				{associate.associate.lastname}
			</p>

			<to class="flex my-5 space-x-8">
				<div>
					<strong>Fecha de pago: </strong>
					<input
						bind:value={payment_date}
						on:change={calculate}
						type="date"
						required
						placeholder="test"
						class="input input-ghost focus:placeholder-neutral hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
					/>
				</div>

				<div class="flex mt-3">
					<strong class="mr-2">Dias de mora: </strong>
					<p>{late_date_days}</p>
				</div>

				{#if late_date_days > 0}
					<div>
						<strong>Interes por mora: </strong>
						<input
							bind:value={late_fee_percentaje}
							on:change={lateFeeCalculator}
							type="number"
							required
							placeholder="%"
							class="mx-0 input input-ghost focus:placeholder-neutral hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
						/>
					</div>
				{/if}
			</to>
			{#if payment_date}
				<table class="table w-full table-compact" in:fly={{ y: 200, duration: 400 }}>
					<thead>
						<tr>
							<th>cuota</th>
							<th>Principal</th>
							<th>interes</th>
							<th>Mora</th>
							<th>total</th>
							<th>restante</th>
							<th>Fecha de pago quota (plan)</th>
						</tr>
					</thead>
					<tbody>
						<tr class="cursor-default">
							<th>{quote}</th>
							<td>{principal}</td>
							<td>{interest}</td>
							<td>{late_fee}</td>
							<td>{total}</td>
							<td>{remaining_balance}</td>
							<td>{payment_deadline}</td>
						</tr>
					</tbody>
				</table>
			{/if}
		</div>
	</div>
{/await}
