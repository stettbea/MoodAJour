<script>
	import EntryCard from '$lib/components/EntryCard.svelte';
	import FilterBar from '$lib/components/FilterBar.svelte';

	let { data } = $props();
</script>

<main class="overview-page">
	<FilterBar
		filters={data.filters}
		categories={data.categories}
		persons={data.persons}
	/>

	<section class="entries-list">
		{#if data.entries.length === 0}
			<p class="empty-state">Keine Einträge gefunden. Entferne die Filter oder füge neue Einträge hinzu.</p>
		{:else}
			{#each data.entries as entry}
				<EntryCard {entry} />
			{/each}
		{/if}
	</section>
</main>

<style>
	.overview-page {
		width: min(100%, 430px);
		margin: 0 auto;
		padding: 20px 0 40px;
	}

	.entries-list {
		display: grid;
		gap: 16px;
	}

	.empty-state {
		padding: 18px;
		background: #f5f0ff;
		border: 1px solid #e9e0ff;
		border-radius: 22px;
		color: #5f4f8a;
		text-align: center;
	}
</style>
