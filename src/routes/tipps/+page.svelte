<script>
	import TipCard from '$lib/components/TipCard.svelte';
	import HelpBox from '$lib/components/HelpBox.svelte';

	const tips = [
		{
			title: 'Atemübung',
			text: 'Atme 4 Sekunden ein, halte kurz die Luft an und atme 6 Sekunden aus. Wiederhole das 5 Mal.',
			icon: '🌬️'
		},
		{
			title: 'Gedanken notieren',
			text: 'Schreibe in einem Satz auf, was dich gerade belastet. Das hilft, das Erlebnis klarer einzuordnen.',
			icon: '✍️'
		},
		{
			title: 'Kurz bewegen',
			text: 'Steh kurz auf, geh ein paar Schritte oder strecke dich. Kleine Bewegung kann Stress reduzieren.',
			icon: '🚶'
		}
	];
</script>

<main>
	<h1>Tipps</h1>
	{#each tips as tip}
		<TipCard title={tip.title} text={tip.text} />
	{/each}
	<HelpBox />
</main>
