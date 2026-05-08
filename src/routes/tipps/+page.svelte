<script>
	import TipCard from '$lib/components/TipCard.svelte';
	import HelpBox from '$lib/components/HelpBox.svelte';

	const tips = [
		{
			title: 'Atemübung',
			text: 'Atme 4 Sekunden ein, halte kurz die Luft an und atme 6 Sekunden aus. Wiederhole das 5 Mal.'
		},
		{
			title: 'Gedanken notieren',
			text: 'Schreibe in einem Satz auf, was dich gerade belastet. Das hilft, das Erlebnis klarer einzuordnen.'
		},
		{
			title: 'Kurz bewegen',
			text: 'Steh kurz auf, geh ein paar Schritte oder strecke dich. Kleine Bewegung kann Stress reduzieren.'
		}
	];
</script>

<main class="tips-page">
	<div class="page-header">
		<h1>Tipps</h1>
		<p>Kurze Impulse für belastende Situationen</p>
	</div>

	<section class="tips-list">
		{#each tips as tip}
			<TipCard title={tip.title} text={tip.text} />
		{/each}
	</section>

	<p class="disclaimer">Diese Tipps ersetzen keine professionelle Unterstützung.</p>

	<HelpBox />
</main>

<style>
	.tips-page {
		padding: 16px 16px 40px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.page-header {
		margin-bottom: 20px;
	}

	h1 {
		margin: 0 0 6px;
		font-size: 1.4rem;
		font-weight: 700;
		color: #20182f;
	}

	.page-header p {
		margin: 0;
		color: #6b5a7a;
		font-size: 0.9rem;
	}

	.tips-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 24px;
	}

	.disclaimer {
		margin: 0 0 4px;
		color: #9b8bb5;
		font-size: 0.825rem;
		line-height: 1.5;
	}
</style>
