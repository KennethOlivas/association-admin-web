<script>
	export let head = [];
	export let body = [];
	head = ['id', 'nombre', 'apellido'];
	body = ['9', 'kenneth', 'olivas'];

</script>

<div class="overflow-x-auto mx-4">
	<table class="table w-full table-zebra">
		<thead>
			<tr>
				{#each head as header}
					<th>{header}</th>
				{/each}
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				{#each body as bodyTable}
					<th class="capitalize">{bodyTable}</th>
				{/each}
				<th><slot /></th>
			</tr>
		</tbody>
	</table>
</div>
