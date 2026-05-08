<script>
	import EntryCard from '$lib/components/EntryCard.svelte';
	import FilterBar from '$lib/components/FilterBar.svelte';

	let { data } = $props();
</script>

<main class="overview-page">
	<FilterBar filters={data.filters} categories={data.categories} persons={data.persons} />

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
</style>
