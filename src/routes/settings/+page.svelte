<script>
	let { data, form } = $props();

	// State für Kategorien und Personen
	let categories = $state(data.categories || []);
	let persons = $state(data.persons || []);

	// Neue Kategorie oder Person hinzufügen
	function addCategory() {
		categories = [...categories, ''];
	}

	function addPerson() {
		persons = [...persons, ''];
	}

	// Kategorie oder Person entfernen
	function removeCategory(index) {
		categories = categories.filter((_, i) => i !== index);
	}

	function removePerson(index) {
		persons = persons.filter((_, i) => i !== index);
	}

	// Kategorie oder Person ändern
	function updateCategory(index, value) {
		categories[index] = value;
	}

	function updatePerson(index, value) {
		persons[index] = value;
	}
</script>

<main class="settings-page">
	<a class="back-link" href="/overview">← Zurück</a>

	<section class="settings-card">
		<div class="card-header">
			<h1>Einstellungen</h1>
			<p>Verwalt deine Kategorien und Personen für bessere Filteroptionen</p>
		</div>

		<form method="POST" class="settings-form">
			<!-- Kategorien -->
			<div class="settings-section">
				<div class="section-header">
					<h2>Kategorien</h2>
					<button type="button" class="add-btn" onclick={addCategory}>+ Kategorie hinzufügen</button>
				</div>

				<div class="items-list">
					{#each categories as category, index (index)}
						<div class="item-input">
							<input
								type="text"
								name="category"
								value={category}
								onchange={(e) => updateCategory(index, e.target.value)}
								placeholder="z. B. Arbeit"
								required
							/>
							<button
								type="button"
								class="remove-btn"
								onclick={() => removeCategory(index)}
								aria-label="Entfernen"
							>
								✕
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- Personen -->
			<div class="settings-section">
				<div class="section-header">
					<h2>Personen</h2>
					<button type="button" class="add-btn" onclick={addPerson}>+ Person hinzufügen</button>
				</div>

				<div class="items-list">
					{#each persons as person, index (index)}
						<div class="item-input">
							<input
								type="text"
								name="person"
								value={person}
								onchange={(e) => updatePerson(index, e.target.value)}
								placeholder="z. B. Freund"
								required
							/>
							<button
								type="button"
								class="remove-btn"
								onclick={() => removePerson(index)}
								aria-label="Entfernen"
							>
								✕
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- Buttons -->
			<div class="action-row">
				<button type="submit" class="save-btn">Speichern</button>
				<a href="/overview" class="cancel-link">Abbrechen</a>
			</div>
		</form>

		{#if form?.success}
			<p class="success-message">✓ Einstellungen gespeichert!</p>
		{/if}
	</section>
</main>

<style>
	.settings-page {
		width: min(100%, 430px);
		margin: 0 auto;
		padding: 20px 0 40px;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 18px;
		color: #4c407d;
		text-decoration: none;
		font-weight: 700;
	}

	.back-link:hover {
		color: #7d4ec9;
	}

	.settings-card {
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
		margin: 0 0 8px;
		font-size: 1.4rem;
		color: #2c2c3a;
	}

	.card-header p {
		margin: 0;
		color: #6f5d8f;
		font-size: 0.95rem;
	}

	.settings-form {
		padding: 20px;
		display: grid;
		gap: 24px;
	}

	.settings-section {
		display: grid;
		gap: 12px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.1rem;
		color: #2c2c3a;
	}

	.add-btn {
		padding: 8px 14px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 12px;
		font-weight: 700;
		font-size: 0.9rem;
		cursor: pointer;
		white-space: nowrap;
	}

	.add-btn:hover {
		background: #6940b4;
	}

	.items-list {
		display: grid;
		gap: 10px;
	}

	.item-input {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.item-input input {
		flex: 1;
		padding: 12px 14px;
		border: 1px solid #dcd1f7;
		border-radius: 14px;
		background: white;
		color: #2c2c3a;
		font-size: 0.95rem;
	}

	.item-input input:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 2px rgba(125, 78, 201, 0.1);
	}

	.remove-btn {
		width: 36px;
		height: 36px;
		padding: 0;
		border: 1px solid #dcd1f7;
		background: white;
		color: #842029;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.remove-btn:hover {
		background: #fef2f2;
		border-color: #f5c2c7;
	}

	.action-row {
		display: flex;
		gap: 12px;
		margin-top: 12px;
	}

	.save-btn {
		flex: 1;
		padding: 14px 18px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 14px;
		font-weight: 700;
		cursor: pointer;
		font-size: 0.95rem;
	}

	.save-btn:hover {
		background: #6940b4;
	}

	.cancel-link {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 14px 18px;
		border-radius: 14px;
		background: white;
		color: #4c407d;
		border: 1px solid #dcd1f7;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.cancel-link:hover {
		background: #f3ebfb;
	}

	.success-message {
		margin-top: 16px;
		padding: 12px 14px;
		background: #d4edda;
		border: 1px solid #c3e6cb;
		border-radius: 12px;
		color: #155724;
		text-align: center;
		font-weight: 700;
	}

	@media (max-width: 520px) {
		.section-header {
			flex-direction: column;
			align-items: stretch;
		}

		.add-btn {
			width: 100%;
		}
	}
</style>