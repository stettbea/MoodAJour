<script>
	import { enhance } from '$app/forms';

	let {
		values = {},
		buttonText = '+ Hinzufügen',
		categories = [],
		persons = [],
		usedCategories = [],
		usedPersons = [],
		formAction = '?/create'
	} = $props();

	let moodValue = $state(Number(values.mood ?? 5));
	let titleValue = $state(values.title ?? '');
	let localCategories = $state([...categories]);
	let localPersons = $state([...persons]);

	let showModal = $state(false);
	let modalCategories = $state([]);
	let modalPersons = $state([]);
	let modalError = $state('');
	let frozenUsedCategories = $state(new Set());
	let frozenUsedPersons = $state(new Set());

	function openModal() {
		modalCategories = [...localCategories];
		modalPersons = [...localPersons];
		frozenUsedCategories = new Set(usedCategories);
		frozenUsedPersons = new Set(usedPersons);
		modalError = '';
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function addModalCategory() {
		modalCategories = [...modalCategories, ''];
	}

	function removeModalCategory(index) {
		const val = modalCategories[index];
		if (frozenUsedCategories.has(val)) {
			modalError = `„${val}" wird noch in Einträgen verwendet und kann nicht gelöscht werden.`;
			return;
		}
		modalError = '';
		modalCategories = modalCategories.filter((_, i) => i !== index);
	}

	function addModalPerson() {
		modalPersons = [...modalPersons, ''];
	}

	function removeModalPerson(index) {
		const val = modalPersons[index];
		if (frozenUsedPersons.has(val)) {
			modalError = `„${val}" wird noch in Einträgen verwendet und kann nicht gelöscht werden.`;
			return;
		}
		modalError = '';
		modalPersons = modalPersons.filter((_, i) => i !== index);
	}

	function handleModalSubmit() {
		modalError = '';
		return async ({ result }) => {
			if (result.type === 'success') {
				if (result.data?.error) {
					modalError = result.data.error;
				} else {
					localCategories = modalCategories.filter((c) => c.trim());
					localPersons = modalPersons.filter((p) => p.trim());
					showModal = false;
				}
			} else if (result.type === 'failure') {
				modalError = result.data?.error || 'Fehler beim Speichern.';
			}
		};
	}

	// Extrahiert nur den Datumsteil (YYYY-MM-DD) aus datetime-local oder date Strings
	function toDateValue(raw) {
		if (!raw) return new Date().toISOString().split('T')[0];
		return raw.split('T')[0];
	}

	const moodEmoji = $derived(
		moodValue <= 2 ? '😢' :
		moodValue <= 4 ? '😕' :
		moodValue <= 6 ? '😐' :
		moodValue <= 8 ? '🙂' : '😄'
	);

	const moodLabel = $derived(
		moodValue <= 2 ? 'Sehr schlecht' :
		moodValue <= 4 ? 'Eher schlecht' :
		moodValue <= 6 ? 'Okay' :
		moodValue <= 8 ? 'Gut' : 'Sehr gut'
	);

	const moodColor = $derived(
		moodValue <= 3 ? '#c0392b' :
		moodValue <= 5 ? '#e67e22' :
		moodValue <= 7 ? '#2980b9' : '#27ae60'
	);
</script>

<form method="POST" action={formAction} class="mood-form">
	<div class="field-pair">
		<label>
			<span class="label-text">Was?</span>
			<input type="text" name="title" required bind:value={titleValue} placeholder="z. B. Stress im Meeting" />
		</label>

		<label>
			<span class="label-text">Wann?</span>
			<div class="date-wrapper">
				<input type="date" name="date" required value={toDateValue(values.date)} max={new Date().toLocaleDateString('sv-SE')} />
				<span class="date-icon" aria-hidden="true">📅</span>
			</div>
		</label>
	</div>

	<div class="field-pair">
		<label>
			<span class="label-text">
				Person
				<button type="button" class="customize-link" onclick={openModal}>Anpassen</button>
			</span>
			<select name="persons">
				<option value="">Bitte wählen</option>
				{#each localPersons as person}
					<option value={person} selected={person === values.persons}>{person}</option>
				{/each}
			</select>
		</label>

		<label>
			<span class="label-text">
				Kategorie
				<button type="button" class="customize-link" onclick={openModal}>Anpassen</button>
			</span>
			<select name="category">
				<option value="">Bitte wählen</option>
				{#each localCategories as category}
					<option value={category} selected={category === values.category}>{category}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="mood-section">
		<div class="mood-header">
			<span class="label-text">Stimmung</span>
			<span class="mood-badge" style="background: {moodColor}">
				{moodEmoji} {moodValue}/10 · {moodLabel}
			</span>
		</div>
		<input
			class="range-input"
			type="range"
			name="mood"
			min="1"
			max="10"
			bind:value={moodValue}
		/>
		<div class="range-labels">
			<span class="label-start">1</span>
			<span class="label-mid">5</span>
			<span class="label-end">10</span>
		</div>
	</div>

	<label>
		<span class="label-text">Beschreibung <span class="optional">(optional)</span></span>
		<textarea name="description" placeholder="Was ist passiert? Wie hast du dich gefühlt?">{values.description ?? ''}</textarea>
	</label>

	<button type="submit">{buttonText}</button>
</form>

<svelte:window onkeydown={(e) => showModal && e.key === 'Escape' && closeModal()} />

{#if showModal}
<div class="modal-overlay" onclick={closeModal} role="presentation">
	<div class="modal-card" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Kategorien und Personen anpassen">
		<div class="modal-header">
			<h2>Anpassen</h2>
			<button type="button" class="modal-close" onclick={closeModal} aria-label="Schliessen">✕</button>
		</div>

		{#if modalError}
			<div class="modal-alert-error">{modalError}</div>
		{/if}

		<form method="POST" action="/settings" use:enhance={handleModalSubmit} class="modal-form">
			<div class="modal-section">
				<div class="modal-section-header">
					<span>Kategorien</span>
					<button type="button" class="modal-btn-add" onclick={addModalCategory}>+ Hinzufügen</button>
				</div>
				{#if modalCategories.length === 0}
					<p class="modal-empty">Keine Kategorien vorhanden.</p>
				{:else}
					<div class="modal-items">
						{#each modalCategories as cat, i (i)}
							{@const used = frozenUsedCategories.has(cat)}
							<div class="modal-item-row" class:used>
								<input type="text" name="category" bind:value={modalCategories[i]} placeholder="z. B. Arbeit" readonly={used} required />
								<button
									type="button"
									class="modal-btn-remove"
									onclick={() => removeModalCategory(i)}
									disabled={used}
									aria-label="Entfernen"
									title={used ? 'Wird noch verwendet' : 'Entfernen'}
								>✕</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="modal-section">
				<div class="modal-section-header">
					<span>Personen</span>
					<button type="button" class="modal-btn-add" onclick={addModalPerson}>+ Hinzufügen</button>
				</div>
				{#if modalPersons.length === 0}
					<p class="modal-empty">Keine Personen vorhanden.</p>
				{:else}
					<div class="modal-items">
						{#each modalPersons as person, i (i)}
							{@const used = frozenUsedPersons.has(person)}
							<div class="modal-item-row" class:used>
								<input type="text" name="person" bind:value={modalPersons[i]} placeholder="z. B. Freund" readonly={used} required />
								<button
									type="button"
									class="modal-btn-remove"
									onclick={() => removeModalPerson(i)}
									disabled={used}
									aria-label="Entfernen"
									title={used ? 'Wird noch verwendet' : 'Entfernen'}
								>✕</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="modal-actions">
				<button type="submit" class="modal-btn-save">Speichern</button>
				<button type="button" class="modal-btn-cancel" onclick={closeModal}>Abbrechen</button>
			</div>
		</form>
	</div>
</div>
{/if}

<style>
	.mood-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
	}

	.field-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.label-text {
		font-size: 0.875rem;
		font-weight: 600;
		color: #4c407d;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.customize-link {
		font-size: 0.75rem;
		font-weight: 500;
		color: #9b8bb5;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
	}

	.customize-link:hover {
		color: #7d4ec9;
		text-decoration: underline;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	.modal-card {
		background: white;
		border-radius: 20px;
		width: min(100%, 430px);
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid #e6e0f4;
		position: sticky;
		top: 0;
		background: white;
		z-index: 1;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #20182f;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 1rem;
		color: #9b8bb5;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 8px;
	}

	.modal-close:hover {
		background: #f3ebfb;
		color: #4c407d;
	}

	.modal-alert-error {
		margin: 12px 20px 0;
		padding: 10px 14px;
		border-radius: 10px;
		background: #fdecea;
		border: 1px solid #f5c2c7;
		color: #842029;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.modal-form {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.modal-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.modal-section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-section-header span {
		font-size: 0.875rem;
		font-weight: 700;
		color: #2c2c3a;
	}

	.modal-btn-add {
		min-height: 34px;
		padding: 0 12px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.8rem;
		cursor: pointer;
	}

	.modal-btn-add:hover {
		background: #6940b4;
	}

	.modal-items {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.modal-item-row {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.modal-item-row input {
		flex: 1;
		padding: 10px 12px;
		border: 1.5px solid #dcd1f7;
		border-radius: 10px;
		background: white;
		color: #2c2c3a;
		font-size: 0.9rem;
		min-height: 42px;
		font-family: inherit;
	}

	.modal-item-row input:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.1);
	}

	.modal-item-row.used input,
	.modal-item-row input[readonly] {
		background: #f5f0ff;
		border-color: #e6e0f4;
		color: #9b8bb5;
		cursor: not-allowed;
	}

	.modal-btn-remove {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border: 1.5px solid #dcd1f7;
		background: white;
		color: #c0392b;
		border-radius: 10px;
		cursor: pointer;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-btn-remove:hover:not(:disabled) {
		background: #fdecea;
		border-color: #f5c2c7;
	}

	.modal-btn-remove:disabled {
		cursor: not-allowed;
		color: #c0b8d4;
		background: #f5f0ff;
		border-color: #e6e0f4;
	}

	.modal-empty {
		margin: 0;
		color: #9b8bb5;
		font-size: 0.875rem;
	}

	.modal-actions {
		display: flex;
		gap: 10px;
	}

	.modal-btn-save,
	.modal-btn-cancel {
		flex: 1;
		min-height: 46px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		font-family: inherit;
	}

	.modal-btn-save {
		background: #7d4ec9;
		color: white;
		border: none;
	}

	.modal-btn-save:hover {
		background: #6940b4;
	}

	.modal-btn-cancel {
		background: white;
		color: #4c407d;
		border: 1.5px solid #dcd1f7;
	}

	.modal-btn-cancel:hover {
		background: #f3ebfb;
	}

	.optional {
		font-weight: 400;
		color: #9b8bb5;
	}

	.date-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.date-wrapper input[type='date'] {
		flex: 1;
		padding-right: 44px;
		cursor: pointer;
	}

	.date-wrapper input[type='date']::-webkit-calendar-picker-indicator {
		opacity: 0;
		position: absolute;
		right: 0;
		width: 44px;
		height: 100%;
		cursor: pointer;
	}

	.date-icon {
		position: absolute;
		right: 13px;
		font-size: 1.05rem;
		pointer-events: none;
		line-height: 1;
		color: #4c407d;
	}

	input[type='text'],
	input[type='date'],
	select,
	textarea {
		padding: 12px 14px;
		border: 1.5px solid #e6e0f4;
		border-radius: 12px;
		font-size: 0.95rem;
		background: white;
		color: #2c2c3a;
		width: 100%;
		transition: border-color 0.15s;
		-webkit-appearance: none;
		appearance: none;
	}

	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234c407d' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 14px center;
		padding-right: 38px;
		cursor: pointer;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.1);
	}

	textarea {
		resize: vertical;
		min-height: 96px;
		font-family: inherit;
	}

	.mood-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.mood-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.mood-badge {
		padding: 4px 10px;
		border-radius: 20px;
		color: white;
		font-size: 0.8rem;
		font-weight: 700;
		white-space: nowrap;
		transition: background 0.2s;
	}

	.range-input {
		width: 100%;
		height: 6px;
		-webkit-appearance: none;
		appearance: none;
		background: #e6e0f4;
		border-radius: 3px;
		cursor: pointer;
		padding: 0;
		border: none;
	}

	.range-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #7d4ec9;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(125, 78, 201, 0.4);
		border: 2px solid white;
	}

	.range-input::-moz-range-thumb {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #7d4ec9;
		cursor: pointer;
		border: 2px solid white;
		box-shadow: 0 2px 6px rgba(125, 78, 201, 0.4);
	}

	.range-labels {
		position: relative;
		height: 16px;
		margin-top: 2px;
		font-size: 0.75rem;
		color: #9b8bb5;
	}

	.range-labels span {
		position: absolute;
		transform: translateX(-50%);
	}

	/* Wert 1 → 0/9 = 0 % des Sliders */
	.label-start {
		left: 0%;
		transform: none;
	}

	/* Wert 5 → 4/9 ≈ 44.44 % des Sliders */
	.label-mid {
		left: 44.44%;
	}

	/* Wert 10 → 9/9 = 100 % des Sliders */
	.label-end {
		right: 0%;
		transform: none;
	}

	button[type='submit'] {
		padding: 15px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 14px;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		min-height: 52px;
		transition: background 0.15s;
	}

	button[type='submit']:hover {
		background: #6940b4;
	}

	button[type='submit']:active {
		background: #5c3399;
	}

	@media (max-width: 360px) {
		.field-pair {
			grid-template-columns: 1fr;
		}

		.mood-form {
			padding: 16px;
		}
	}
</style>
