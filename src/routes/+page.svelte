<script>
	import MoodForm from '$lib/components/MoodForm.svelte';
	import WarningBox from '$lib/components/WarningBox.svelte';
	import EntryCard from '$lib/components/EntryCard.svelte';

	const sampleEntry = {
		was: 'Tagesausflug',
		wann: '2026-05-02 14:30',
		kategorie: 'Freizeit',
		stimmung: 8,
		beschreibung: 'War ein schöner Spaziergang im Park.'
	};

	const warningEntry = {
		was: 'Stress bei der Arbeit',
		wann: '2026-05-01 09:00',
		kategorie: 'Arbeit',
		stimmung: 3,
		beschreibung: 'Wichtige Präsentation hat mich sehr unter Druck gesetzt.'
	};
</script>

<main>
	<h1>Home</h1>
	<MoodForm buttonText="Hinzufügen" />
	<WarningBox />
	<EntryCard entry={warningEntry} />
	<EntryCard entry={sampleEntry} />
</main>
