<script>
	import EntryCard from '$lib/components/EntryCard.svelte';

	let { data } = $props();
</script>

<main>
	<h1>Übersicht</h1>
	{#each data.entries as entry}
		<EntryCard {entry} />
	{/each}
</main>
