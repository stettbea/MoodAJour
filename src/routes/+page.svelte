<script>
	import MoodForm from "$lib/components/MoodForm.svelte";
	import WarningBox from "$lib/components/WarningBox.svelte";
	import EntryCard from "$lib/components/EntryCard.svelte";

	let { data, form } = $props();
</script>

<main class="home-page">
	<section class="form-card">
		<div class="card-header">
			<h2>Neuer Mood-Eintrag erstellen</h2>
		</div>
		<MoodForm categories={data.categories} persons={data.persons} />
	</section>

	{#if form?.showWarning}
		<WarningBox isVisible={true} />
	{/if}

	<section class="recent-entries">
		<div class="recent-header">
			<h3>Letzte Einträge</h3>
		</div>
		{#each data.entries as entry}
			<EntryCard {entry} />
		{/each}
	</section>
</main>

<style>
	.home-page {
		width: min(100%, 430px);
		margin: 0 auto;
		padding: 20px 0 40px;
	}

	.form-card,
	.recent-entries {
		background: white;
		border-radius: 24px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
		margin: 0 16px 20px;
	}

	.card-header {
		padding: 20px 20px 0;
	}

	.card-header h2 {
		margin: 0;
		font-size: 1.2rem;
		color: #2c2c3a;
	}

	.recent-header {
		padding: 20px 20px 0;
	}

	.recent-header h3 {
		margin: 0;
		font-size: 1rem;
		color: #4c407d;
	}

	.recent-entries > :global(.entry-card) {
		margin: 12px 20px 16px;
	}

	@media (max-width: 360px) {
		.home-page {
			padding: 16px 0 32px;
		}

		.form-card,
		.recent-entries {
			margin: 0 12px 18px;
		}
	}
</style>
