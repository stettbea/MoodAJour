<script>
	import MoodForm from '$lib/components/MoodForm.svelte';

	let { data } = $props();
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
			formAction="?/save"
			buttonText="Speichern"
		/>
	</section>
</main>

<style>
	.edit-page {
		width: min(100%, 430px);
		margin: 0 auto;
		padding: 20px 0 40px;
	}

	.back-link {
		display: inline-block;
		margin: 0 0 18px 16px;
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
		padding: 20px;
		border-bottom: 1px solid #e8ddff;
	}

	.card-header h1 {
		margin: 0;
		font-size: 1.4rem;
		color: #2c2c3a;
	}
</style>
