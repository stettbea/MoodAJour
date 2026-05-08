<script>
	let {
		values = {},
		buttonText = '+ Hinzufügen',
		categories = [],
		persons = [],
		formAction = '?/create'
	} = $props();

	let moodValue = $state(Number(values.mood ?? 5));

	// Extrahiert nur den Datumsteil (YYYY-MM-DD) aus datetime-local oder date Strings
	function toDateValue(raw) {
		if (!raw) return new Date().toISOString().split('T')[0];
		return raw.split('T')[0];
	}

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
			<input type="text" name="title" required value={values.title ?? ''} placeholder="z. B. Stress im Meeting" />
		</label>

		<label>
			<span class="label-text">Wann?</span>
			<div class="date-wrapper">
				<input type="date" name="date" required value={toDateValue(values.date)} />
				<span class="date-icon" aria-hidden="true">📅</span>
			</div>
		</label>
	</div>

	<div class="field-pair">
		<label>
			<span class="label-text">Person</span>
			<select name="persons">
				<option value="">Bitte wählen</option>
				{#each persons as person}
					<option value={person} selected={person === values.persons}>{person}</option>
				{/each}
			</select>
		</label>

		<label>
			<span class="label-text">Kategorie</span>
			<select name="category">
				<option value="">Bitte wählen</option>
				{#each categories as category}
					<option value={category} selected={category === values.category}>{category}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="mood-section">
		<div class="mood-header">
			<span class="label-text">Stimmung</span>
			<span class="mood-badge" style="background: {moodColor}">
				{moodValue}/10 · {moodLabel}
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
		padding-right: 40px;
		cursor: pointer;
	}

	.date-wrapper input[type='date']::-webkit-calendar-picker-indicator {
		opacity: 0;
		position: absolute;
		right: 0;
		width: 40px;
		height: 100%;
		cursor: pointer;
	}

	.date-icon {
		position: absolute;
		right: 14px;
		font-size: 1rem;
		pointer-events: none;
		line-height: 1;
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
