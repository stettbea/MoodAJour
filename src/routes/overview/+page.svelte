<script>
	import EntryCard from '$lib/components/EntryCard.svelte';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import MoodForm from '$lib/components/MoodForm.svelte';
	import WarningBox from '$lib/components/WarningBox.svelte';

	let { data, form } = $props();

	let showCreateModal = $state(false);

	$effect(() => {
		if (form?.success) {
			showCreateModal = false;
		}
	});

	function openModal() {
		showCreateModal = true;
	}

	function closeModal() {
		showCreateModal = false;
	}
</script>

<main class="overview-page">
	<FilterBar
		filters={data.filters}
		categories={data.categories}
		persons={data.persons}
		onAddEntry={openModal}
	/>

	{#if data.entries.length === 0}
		<p class="empty-state">Keine Einträge gefunden. Filter entfernen oder neuen Eintrag erstellen.</p>
	{:else}
		<div class="entries-list">
			{#each data.entries as entry}
				<EntryCard {entry} redirectTo="/overview" />
			{/each}
		</div>
	{/if}
</main>

{#if form?.showWarning}
	<WarningBox isVisible={true} />
{/if}

{#if showCreateModal}
	<div class="modal-overlay" onclick={closeModal}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2>Neuer Eintrag</h2>
				<button type="button" class="close-btn" onclick={closeModal} aria-label="Schliessen">
					&times;
				</button>
			</div>
			<div class="modal-body">
				<MoodForm
					categories={data.categories}
					persons={data.persons}
					usedCategories={data.usedCategories}
					usedPersons={data.usedPersons}
					formAction="?/create"
					buttonText="Eintrag speichern"
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.overview-page {
		padding: 16px 16px 40px;
	}

	.entries-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.empty-state {
		margin: 0;
		padding: 28px 20px;
		background: #f6f1ff;
		border: 1px solid #e6e0f4;
		border-radius: 16px;
		color: #6b5a7a;
		font-size: 0.9rem;
		text-align: center;
		line-height: 1.5;
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 500;
		padding: 16px;
	}

	.modal {
		background: white;
		border-radius: 20px;
		width: 100%;
		max-width: 430px;
		max-height: 92dvh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 20px 0;
		flex-shrink: 0;
	}

	h2 {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 700;
		color: #20182f;
	}

	.close-btn {
		width: 32px;
		height: 32px;
		background: #f0ebfa;
		border: none;
		border-radius: 50%;
		font-size: 1.2rem;
		cursor: pointer;
		color: #6b5a7a;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.close-btn:hover {
		background: #e6ddf7;
	}

	.modal-body {
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
