<script>
	import TipCard from '$lib/components/TipCard.svelte';
	import HelpBox from '$lib/components/HelpBox.svelte';

	const tips = [
		{
			title: 'Atemübung',
			text: 'Nimm dir 3 Minuten Zeit und atme ruhig durch die Nase ein und durch den Mund aus.'
		},
		{
			title: 'Kleine Pause',
			text: 'Schreibe dir kurz auf, was dich belastet und was dir gut tun könnte.'
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
