<script>
	let searchData;
	let typeSearch;

	const search = () => {};
</script>

<div class="">
	<p class="text-xl text-center font-semibold">Buscar Fiador</p>
    <div class="flex items-center justify-between">
        <select bind:value={typeSearch} class="select select-info mr-2">
            <option value={false}>Nombre</option>
            <option value={true}>Cedula</option>
        </select>
        <input
            on:keyup={search}
            bind:value={searchData}
            type="text"
            required
            placeholder="Buscar Socio..."
            class="input input-primary input-bordered focus:placeholder-primary w-full my-4"
        />
    </div>
    

</div>
