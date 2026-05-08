<script>
	let { data, form } = $props();

	let categories = $state(data.categories || []);
	let persons = $state(data.persons || []);

	const usedCategories = new Set(data.usedCategories || []);
	const usedPersons = new Set(data.usedPersons || []);

	let clientError = $state('');

	function addCategory() {
		clientError = '';
		categories = [...categories, ''];
	}

	function addPerson() {
		clientError = '';
		persons = [...persons, ''];
	}

	function removeCategory(index) {
		const val = categories[index];
		if (usedCategories.has(val)) {
			clientError = `„${val}" wird noch in Einträgen verwendet und kann nicht gelöscht werden.`;
			return;
		}
		clientError = '';
		categories = categories.filter((_, i) => i !== index);
	}

	function removePerson(index) {
		const val = persons[index];
		if (usedPersons.has(val)) {
			clientError = `„${val}" wird noch in Einträgen verwendet und kann nicht gelöscht werden.`;
			return;
		}
		clientError = '';
		persons = persons.filter((_, i) => i !== index);
	}

</script>

<main class="settings-page">
	<section class="card">
		<div class="card-header">
			<h1>Einstellungen</h1>
			<p>Kategorien und Personen verwalten</p>
		</div>

		{#if clientError}
			<div class="alert alert-error">{clientError}</div>
		{/if}
		{#if form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}
		{#if form?.success}
			<div class="alert alert-success">Einstellungen gespeichert.</div>
		{/if}

		<form method="POST" class="settings-form">
			<div class="settings-section">
				<div class="section-header">
					<h2>Kategorien</h2>
					<button type="button" class="btn-add" onclick={addCategory}>+ Hinzufügen</button>
				</div>

				{#if categories.length === 0}
					<p class="empty-hint">Keine Kategorien vorhanden.</p>
				{:else}
					<div class="items-list">
						{#each categories as category, index (index)}
							{@const used = usedCategories.has(category)}
							<div class="item-row" class:used>
								<input
									type="text"
									name="category"
									bind:value={categories[index]}
									placeholder="z. B. Arbeit"
									readonly={used}
									required
								/>
								<button
									type="button"
									class="btn-remove"
									onclick={() => removeCategory(index)}
									disabled={used}
									aria-label="Entfernen"
									title={used ? 'Wird noch verwendet' : 'Entfernen'}
								>
									✕
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="settings-section">
				<div class="section-header">
					<h2>Personen</h2>
					<button type="button" class="btn-add" onclick={addPerson}>+ Hinzufügen</button>
				</div>

				{#if persons.length === 0}
					<p class="empty-hint">Keine Personen vorhanden.</p>
				{:else}
					<div class="items-list">
						{#each persons as person, index (index)}
							{@const used = usedPersons.has(person)}
							<div class="item-row" class:used>
								<input
									type="text"
									name="person"
									bind:value={persons[index]}
									placeholder="z. B. Freund"
									readonly={used}
									required
								/>
								<button
									type="button"
									class="btn-remove"
									onclick={() => removePerson(index)}
									disabled={used}
									aria-label="Entfernen"
									title={used ? 'Wird noch verwendet' : 'Entfernen'}
								>
									✕
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="action-row">
				<button type="submit" class="btn-save">Speichern</button>
				<a href="/" class="btn-cancel">Abbrechen</a>
			</div>
		</form>
	</section>
</main>

<style>
	.settings-page {
		padding: 16px 16px 40px;
	}

	.card {
		background: #faf7ff;
		border: 1px solid #e6e0f4;
		border-radius: 20px;
		overflow: hidden;
	}

	.card-header {
		padding: 16px 20px;
		border-bottom: 1px solid #e6e0f4;
	}

	h1 {
		margin: 0 0 4px;
		font-size: 1.2rem;
		font-weight: 700;
		color: #20182f;
	}

	.card-header p {
		margin: 0;
		color: #6b5a7a;
		font-size: 0.85rem;
	}

	.alert {
		margin: 16px 20px 0;
		padding: 12px 16px;
		border-radius: 12px;
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.45;
	}

	.alert-error {
		background: #fdecea;
		border: 1px solid #f5c2c7;
		color: #842029;
	}

	.alert-success {
		background: #d4edda;
		border: 1px solid #c3e6cb;
		color: #155724;
	}

	.settings-form {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #2c2c3a;
	}

	.btn-add {
		min-height: 38px;
		padding: 0 14px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.85rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s;
	}

	.btn-add:hover {
		background: #6940b4;
	}

	.items-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item-row {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.item-row input {
		flex: 1;
		padding: 11px 14px;
		border: 1.5px solid #dcd1f7;
		border-radius: 12px;
		background: white;
		color: #2c2c3a;
		font-size: 0.95rem;
		min-height: 44px;
	}

	.item-row.used input,
	.item-row input[readonly] {
		background: #f5f0ff;
		border-color: #e6e0f4;
		color: #9b8bb5;
		cursor: not-allowed;
	}

	.item-row input:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.1);
	}

	.btn-remove {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 1.5px solid #dcd1f7;
		background: white;
		color: #c0392b;
		border-radius: 12px;
		cursor: pointer;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.btn-remove:hover:not(:disabled) {
		background: #fdecea;
		border-color: #f5c2c7;
	}

	.btn-remove:disabled {
		cursor: not-allowed;
		color: #c0b8d4;
		background: #f5f0ff;
		border-color: #e6e0f4;
	}

	.empty-hint {
		margin: 0;
		padding: 12px 0;
		color: #9b8bb5;
		font-size: 0.875rem;
	}

	.action-row {
		display: flex;
		gap: 12px;
		padding-top: 4px;
	}

	.btn-save,
	.btn-cancel {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		border-radius: 14px;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		text-decoration: none;
		transition: background 0.15s;
	}

	.btn-save {
		background: #7d4ec9;
		color: white;
		border: none;
	}

	.btn-save:hover {
		background: #6940b4;
	}

	.btn-cancel {
		background: white;
		color: #4c407d;
		border: 1.5px solid #dcd1f7;
	}

	.btn-cancel:hover {
		background: #f3ebfb;
	}
</style>
