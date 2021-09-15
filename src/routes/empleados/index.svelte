<script>
	import Table from '../../components/Table.svelte';
	import Modal from '../../components/Modal.svelte';
	let head = [];
	let body = [];
	head = ['id', 'nombre', 'apellido'];
	body = ['9', 'kenneth', 'olivas'];

    

</script>

<h1 class="text-center text-2xl font-bold text-gray-700">Empleados</h1>

<Modal tilte="Agregar usuario" btnName="Agregar usuario">
	<label for="username" class="label">
		<span class="label-text">Nombre de empleado </span>
	</label>
	<input
		type="text"
		ud="username"
		placeholder="Nombre usuario"
		class="input input-primary input-bordered focus:placeholder-primary"
	/>
	<div class="modal-action">
		<button class="btn btn-primary w-1/2" type="button"><label for="my-modal-2" class="">Agregar</label></button>
		<label for="my-modal-2" class="btn w-1/2">Cancelar</label>
	</div>
</Modal>

<Table {head} {body}>
	<button class="btn  btn-ghost btn-circle btn-sm mx-1 "><i class="fas fa-pen" /></button>

	<button class="btn  btn-ghost btn-circle btn-sm mx-1"><i class="fas fa-trash-alt" /></button>
</Table>
