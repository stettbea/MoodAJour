<script>
	import MoodForm from '$lib/components/MoodForm.svelte';
	import TipCard from '$lib/components/TipCard.svelte';
	import { enhance } from '$app/forms';
	import { tips } from '$lib/tips.js';

	let { data, form } = $props();

	let selectedTips = $state(new Set(data.entry.usedTips ?? []));

	function toggleTip(title) {
		const next = new Set(selectedTips);
		if (next.has(title)) next.delete(title);
		else next.add(title);
		selectedTips = next;
	}
</script>

<main class="edit-page">
	<a class="back-link" href="/overview">← Zurück zur Übersicht</a>

	<section class="edit-card">
		<div class="card-header">
			<h1>Mood-Eintrag bearbeiten</h1>
		</div>
		<MoodForm
			values={data.entry}
			categories={data.categories}
			persons={data.persons}
			usedCategories={data.usedCategories}
			usedPersons={data.usedPersons}
			formAction="?/save"
			buttonText="Speichern"
		/>
	</section>

	<section class="edit-card tips-card">
		<div class="card-header">
			<h2>Verwendete Tipps</h2>
			<span class="tips-hint">Welche Tipps hast du bei diesem Eintrag ausprobiert?</span>
		</div>

		<form method="POST" action="?/saveTips" use:enhance class="tips-form">
			{#each [...selectedTips] as tip}
				<input type="hidden" name="tip" value={tip} />
			{/each}

			<div class="tips-list">
				{#each tips as tip (tip.title)}
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
			</div>

			{#if form?.tipsSaved}
				<div class="alert-success">Tipps gespeichert. ✓</div>
			{/if}

			<button type="submit" class="btn-save-tips">
				{selectedTips.size > 0
					? `${selectedTips.size} Tipp${selectedTips.size > 1 ? 's' : ''} speichern`
					: 'Tipps speichern'}
			</button>
		</form>
	</section>
</main>

<style>
	.edit-page {
		width: min(100%, 430px);
		margin: 0 auto;
		padding: 20px 0 40px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.back-link {
		display: inline-block;
		margin: 0 0 2px 16px;
		color: #4c407d;
		text-decoration: none;
		font-weight: 700;
	}

	.back-link:hover {
		color: #7d4ec9;
	}

	.edit-card {
		background: #faf7ff;
		border: 1px solid #e8ddff;
		border-radius: 28px;
		overflow: hidden;
	}

	.card-header {
		padding: 18px 20px;
		border-bottom: 1px solid #e8ddff;
	}

	.card-header h1 {
		margin: 0;
		font-size: 1.4rem;
		color: #2c2c3a;
	}

	.card-header h2 {
		margin: 0 0 4px;
		font-size: 1rem;
		font-weight: 700;
		color: #20182f;
	}

	.tips-hint {
		font-size: 0.825rem;
		color: #6b5a7a;
	}

	.tips-form {
		padding: 16px 20px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.tips-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.alert-success {
		padding: 10px 14px;
		background: #d4edda;
		border: 1px solid #c3e6cb;
		color: #155724;
		border-radius: 10px;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.btn-save-tips {
		width: 100%;
		min-height: 48px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 14px;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		transition: background 0.15s;
	}

	.btn-save-tips:hover {
		background: #6940b4;
	}
</style>
