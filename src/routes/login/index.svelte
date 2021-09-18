<script>
	import { goto } from '$app/navigation';
	import Modal from '../../components/Modal.svelte';
	import { urlBase } from '../../lib/api';
	import { handleResponse } from '../../lib/utils';
	import { access_token, user } from '../../store/session';

	let username;
	let password;
	let modal;
	let title;
	let bodyModal;

	const login = async () => {
		let headers = {};
		const body = JSON.stringify({ identifier: username, password });
		headers['Content-Type'] = 'application/json';

		try {
			await fetch(`${urlBase}/auth/local`, {
				method: 'POST',
				body,
				headers
			})
				.then(handleResponse)
				.then((data) => {
					access_token.reset(data.jwt);
					user.reset(data.user);
					goto('/');
				});
		} catch (error) {
			console.log(error.message[0].messages[0].message);
			title = "Error al iniciar sesion"
			bodyModal = error.message[0].messages[0].message
			modal.openModal()
		};
	};

	const handleKeyPress = (e) => {
		if (e.code === 'Enter') {
			login();
		}
	};
</script>

<div class="font-sans">
	<div class="relative min-h-screen flex flex-col justify-center items-center bg-base-200">
		<div class="relative max-w-sm sm:max-w-md md:max-w-lg  mx-8 w-full">
			<div
				class="card bg-primary shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"
			/>
			<div
				class="card bg-green-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"
			/>
			<div class="relative w-full rounded-3xl  px-6 py-4 bg-base-200  shadow-md">
				<label for="" class="block mt-3 text-2xl  text-center font-semibold"> Login </label>
				<form on:keypress={handleKeyPress} class="mt-10">
					<div>
						<input
							bind:value={username}
							type="text"
							placeholder="Nombre de usuario"
							class="mt-1 block w-full input input-primary"
						/>
					</div>

					<div class="mt-7">
						<input
							bind:value={password}
							type="password"
							placeholder="Contraseña"
							class="mt-1 block w-full input input-primary"
						/>
					</div>

					<div class="mt-7">
						<button on:click={login} type="button" class="btn btn-primary w-full"> Login </button>
					</div>

					<div class="mt-7">
						<div class="flex justify-center items-center">
							<label class="mr-2">¿Eres nuevo?</label>
							<a
								href="#"
								class=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
							>
								Crea una cuenta
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<Modal bind:this={modal} tilte={title} >
	<p class="text-center mt-2">{bodyModal}</p>
	<div class="modal-action">
		<label for="my-modal-2" class="btn btn-error text-white w-full">Aceptar</label>
	</div>

</Modal>
