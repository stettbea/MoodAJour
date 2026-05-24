<script>
	import TipCard from '$lib/components/TipCard.svelte';
	import HelpBox from '$lib/components/HelpBox.svelte';
	import { enhance } from '$app/forms';
	import { tips } from '$lib/tips.js';

	let { data, form } = $props();

	const categories = ['Alle', 'Atmung', 'Gedanken', 'Bewegung', 'Sozial', 'Ablenkung'];

	let selectedCategory = $state('Alle');
	let randomTip = $state(null);
	let selectedTips = $state(new Set(data.usedTips ?? []));

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

	function toggleTip(title) {
		const next = new Set(selectedTips);
		if (next.has(title)) next.delete(title);
		else next.add(title);
		selectedTips = next;
	}
</script>

<main class="tips-page">
	<div class="page-header">
		<div>
			<h1>Tipps</h1>
			<p>Impulse für belastende Momente</p>
		</div>
		{#if !data.entryId}
			<button type="button" class="btn-random" onclick={showRandomTip}>
				🎲 Zufällig
			</button>
		{/if}
	</div>

	{#if data.entryId}
		<div class="assign-banner">
			<div class="assign-banner-text">
				<span class="assign-title">Welche Tipps hast du ausprobiert?</span>
				<span class="assign-sub">Wähle die Tipps aus, die dir geholfen haben – sie werden an deinen Eintrag gespeichert.</span>
			</div>
		</div>

		{#if form?.success}
			<div class="alert-success">Tipps wurden gespeichert. ✓</div>
		{/if}
	{/if}

	{#if randomTip && !data.entryId}
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

	{#if data.entryId}
		<form method="POST" action="?/saveTips" use:enhance>
			<input type="hidden" name="entryId" value={data.entryId} />
			{#each [...selectedTips] as tip}
				<input type="hidden" name="tip" value={tip} />
			{/each}

			<section class="tips-list">
				{#each filteredTips as tip (tip.title)}
					<TipCard
						icon={tip.icon}
						title={tip.title}
						text={tip.text}
						color={tip.color}
						selectable={true}
						selected={selectedTips.has(tip.title)}
						ontoggle={toggleTip}
					/>
				{/each}
			</section>

			<button type="submit" class="btn-save">
				{selectedTips.size > 0 ? `${selectedTips.size} Tipp${selectedTips.size > 1 ? 's' : ''} speichern` : 'Speichern'}
			</button>
		</form>
	{:else}
		<section class="tips-list">
			{#each filteredTips as tip (tip.title)}
				<TipCard icon={tip.icon} title={tip.title} text={tip.text} color={tip.color} />
			{/each}
		</section>
	{/if}

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

	.assign-banner {
		background: #faf7ff;
		border: 1.5px solid #7d4ec9;
		border-radius: 16px;
		padding: 14px 16px;
	}

	.assign-banner-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.assign-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: #4c407d;
	}

	.assign-sub {
		font-size: 0.825rem;
		color: #6b5a7a;
		line-height: 1.45;
	}

	.alert-success {
		padding: 12px 16px;
		background: #d4edda;
		border: 1px solid #c3e6cb;
		color: #155724;
		border-radius: 12px;
		font-size: 0.9rem;
		font-weight: 600;
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

	.btn-save {
		width: 100%;
		min-height: 50px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 14px;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s;
	}

	.btn-save:hover {
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

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.disclaimer {
		margin: 4px 0 0;
		color: #9b8bb5;
		font-size: 0.8rem;
		line-height: 1.5;
	}
</style>
