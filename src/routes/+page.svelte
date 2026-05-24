<script>
	import MoodForm from '$lib/components/MoodForm.svelte';
	import WarningBox from '$lib/components/WarningBox.svelte';
	import EntryCard from '$lib/components/EntryCard.svelte';

	let { data, form } = $props();
</script>

<main class="home-page">
	<div class="greeting">
		<h1>Hallo, <span class="username">{data.username}</span> 👋</h1>
		<p>Wie geht es dir heute?</p>
	</div>

	<section class="card">
		<div class="card-header">
			<h2>Neuer Eintrag</h2>
		</div>
		<MoodForm categories={data.categories} persons={data.persons} usedCategories={data.usedCategories} usedPersons={data.usedPersons} />
	</section>

	{#if form?.showWarning}
		<WarningBox isVisible={true} entryId={form.entryId} />
	{/if}

	<section class="card">
		<div class="card-header">
			<h2>Letzte Einträge</h2>
			<a href="/overview" class="header-link">Alle anzeigen →</a>
		</div>

		{#if data.entries.length === 0}
			<p class="empty-state">Noch keine Einträge. Erstelle deinen ersten Mood-Eintrag oben.</p>
		{:else}
			<div class="entries-list">
				{#each data.entries as entry}
					<EntryCard {entry} />
				{/each}
			</div>
		{/if}
	</section>
</main>

<style>
	.home-page {
		padding: 16px 16px 40px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.greeting h1 {
		margin: 0 0 4px;
		font-size: 1.4rem;
		font-weight: 700;
		color: #20182f;
	}

	.username {
		color: #7d4ec9;
	}

	.greeting p {
		margin: 0;
		font-size: 0.95rem;
		color: #6b5a7a;
	}

	.card {
		background: #faf7ff;
		border: 1px solid #e6e0f4;
		border-radius: 20px;
		overflow: hidden;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid #e6e0f4;
	}

	h2 {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
		color: #20182f;
	}

	.header-link {
		font-size: 0.875rem;
		font-weight: 600;
		color: #7d4ec9;
		text-decoration: none;
	}

	.entries-list {
		display: flex;
		flex-direction: column;
	}

	.entries-list :global(.entry-card) {
		border-radius: 0;
		border: none;
		border-bottom: 1px solid #e6e0f4;
		box-shadow: none;
		background: transparent;
	}

	.entries-list :global(.entry-card:last-child) {
		border-bottom: none;
	}

	.empty-state {
		margin: 0;
		padding: 28px 20px;
		color: #9b8bb5;
		font-size: 0.9rem;
		text-align: center;
		line-height: 1.5;
	}
</style>
