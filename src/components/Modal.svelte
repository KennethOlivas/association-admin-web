
<script >
    export let tilte 
    export let btnName
    let modal = false

    export const openModal = () => {
        modal = true
    }


</script>


<label for="my-modal-2" class="btn my-4 mx-4 modal-button">{btnName}</label>
<input type="checkbox"  bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="form-control">
            <p class="text-2xl text-center font-semibold">{tilte}</p>
			
            <slot></slot>
		</div>
	</div>
</div>