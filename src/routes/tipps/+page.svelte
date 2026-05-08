<script>
	import TipCard from '$lib/components/TipCard.svelte';
	import HelpBox from '$lib/components/HelpBox.svelte';

	const tips = [
		{
			icon: '🌬️',
			title: 'Atemübung',
			text: 'Atme 4 Sekunden ein, halte kurz inne und atme langsam wieder aus.',
			category: 'Atmung',
			color: '#e8f4fd'
		},
		{
			icon: '✏️',
			title: 'Gedanken aufschreiben',
			text: 'Schreibe deine Gedanken kurz auf, um sie aus dem Kopf zu bekommen.',
			category: 'Gedanken',
			color: '#fef9e7'
		},
		{
			icon: '☕',
			title: 'Kurze Pause',
			text: 'Lege das Handy kurz weg, strecke dich und gönne dir einen Moment Ruhe.',
			category: 'Bewegung',
			color: '#fdf2e9'
		},
		{
			icon: '💬',
			title: 'Mit jemandem sprechen',
			text: 'Schreibe oder rufe eine Person an, der du vertraust. Manchmal hilft schon ein kurzes Gespräch.',
			category: 'Sozial',
			color: '#e8f8f5'
		},
		{
			icon: '🌿',
			title: 'Kurz rausgehen',
			text: 'Öffne das Fenster oder gehe kurz an die frische Luft. Neue Umgebung kann Gedanken beruhigen.',
			category: 'Bewegung',
			color: '#e9f7ef'
		},
		{
			icon: '🎵',
			title: 'Musik hören',
			text: 'Höre einen Song, der dich beruhigt oder gute Erinnerungen auslöst.',
			category: 'Ablenkung',
			color: '#f5eef8'
		},
		{
			icon: '👁️',
			title: '5 Dinge wahrnehmen',
			text: 'Nenne 5 Dinge, die du sehen kannst, 4 die du fühlen kannst und 3 die du hören kannst.',
			category: 'Gedanken',
			color: '#e8f4fd'
		},
		{
			icon: '🔢',
			title: 'Rückwärts zählen',
			text: 'Zähle von 100 in 3er-Schritten rückwärts. Das hilft, den Fokus auf den Moment zu lenken.',
			category: 'Gedanken',
			color: '#eaf2fb'
		}
	];

	const categories = ['Alle', 'Atmung', 'Gedanken', 'Bewegung', 'Sozial', 'Ablenkung'];

	let selectedCategory = $state('Alle');
	let randomTip = $state(null);

	const filteredTips = $derived(
		selectedCategory === 'Alle' ? tips : tips.filter((t) => t.category === selectedCategory)
	);

	function showRandomTip() {
		const pool = filteredTips.length > 0 ? filteredTips : tips;
		const next = pool.filter((t) => t !== randomTip);
		const source = next.length > 0 ? next : pool;
		randomTip = source[Math.floor(Math.random() * source.length)];
	}

	function dismissRandom() {
		randomTip = null;
	}
</script>

<main class="tips-page">
	<div class="page-header">
		<div>
			<h1>Tipps</h1>
			<p>Impulse für belastende Momente</p>
		</div>
		<button type="button" class="btn-random" onclick={showRandomTip}>
			🎲 Zufällig
		</button>
	</div>

	{#if randomTip}
		<div class="random-section">
			<div class="random-label">
				<span>Zufälliger Tipp</span>
				<button type="button" class="dismiss-btn" onclick={dismissRandom} aria-label="Schliessen">
					&times;
				</button>
			</div>
			<TipCard
				icon={randomTip.icon}
				title={randomTip.title}
				text={randomTip.text}
				color={randomTip.color}
				featured={true}
			/>
		</div>
	{/if}

	<div class="category-filter" role="group" aria-label="Kategorien filtern">
		{#each categories as cat}
			<button
				type="button"
				class="chip"
				class:active={selectedCategory === cat}
				onclick={() => { selectedCategory = cat; randomTip = null; }}
			>
				{cat}
			</button>
		{/each}
	</div>

	<section class="tips-list">
		{#each filteredTips as tip (tip.title)}
			<TipCard icon={tip.icon} title={tip.title} text={tip.text} color={tip.color} />
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
		gap: 16px;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}

	h1 {
		margin: 0 0 4px;
		font-size: 1.4rem;
		font-weight: 700;
		color: #20182f;
	}

	.page-header p {
		margin: 0;
		color: #6b5a7a;
		font-size: 0.875rem;
	}

	.btn-random {
		flex-shrink: 0;
		min-height: 38px;
		padding: 0 14px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.875rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s;
	}

	.btn-random:hover {
		background: #6940b4;
	}

	/* Zufälliger Tipp */
	.random-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.random-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.random-label span {
		font-size: 0.8rem;
		font-weight: 700;
		color: #7d4ec9;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.dismiss-btn {
		width: 28px;
		height: 28px;
		background: #f0ebfa;
		border: none;
		border-radius: 50%;
		font-size: 1rem;
		cursor: pointer;
		color: #6b5a7a;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Kategorie-Filter */
	.category-filter {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 2px;
		scrollbar-width: none;
	}

	.category-filter::-webkit-scrollbar {
		display: none;
	}

	.chip {
		flex-shrink: 0;
		min-height: 34px;
		padding: 0 14px;
		border: 1.5px solid #e6e0f4;
		background: white;
		color: #4c407d;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s;
		white-space: nowrap;
	}

	.chip.active {
		background: #7d4ec9;
		border-color: #7d4ec9;
		color: white;
	}

	.chip:hover:not(.active) {
		background: #f3ebfb;
		border-color: #d4c5f0;
	}

	/* Tipps-Liste */
	.tips-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.disclaimer {
		margin: 4px 0 0;
		color: #9b8bb5;
		font-size: 0.8rem;
		line-height: 1.5;
	}
</style>
