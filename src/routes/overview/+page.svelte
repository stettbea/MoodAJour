<script>
	import EntryCard from '$lib/components/EntryCard.svelte';

	const entries = [
		{
			was: 'Team-Meeting',
			wann: '2026-05-01 10:00',
			kategorie: 'Arbeit',
			stimmung: 6,
			beschreibung: 'Das Meeting lief gut, aber es gab viel Feedback.'
		},
		{
			was: 'Abendessen mit Freunden',
			wann: '2026-05-01 19:30',
			kategorie: 'Freizeit',
			stimmung: 9,
			beschreibung: 'Entspannter Abend mit leckerem Essen und guter Stimmung.'
		}
	];
</script>

<main>
	<h1>Übersicht</h1>
	{#each entries as entry}
		<EntryCard entry={entry} />
	{/each}
</main>
