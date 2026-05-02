<script>
	let { buttonText = "Hinzufügen" } = $props();

	function handleSubmit(event) {
		event.preventDefault();
		// Noch keine Speicherlogik
	}
</script>

<form onsubmit={handleSubmit} class="mood-form">
	<label>
		Was?
		<input type="text" required />
	</label>
	<label>
		Wann?
		<input type="datetime-local" required />
	</label>
	<label>
		Personen
		<input type="text" />
	</label>
	<label>
		Kategorie
		<select>
			<option value="arbeit">Arbeit</option>
			<option value="freizeit">Freizeit</option>
			<option value="familie">Familie</option>
			<option value="gesundheit">Gesundheit</option>
		</select>
	</label>
	<label>
		Stimmung (1-10)
		<input type="range" min="1" max="10" value="5" />
	</label>
	<label>
		Beschreibung
		<textarea></textarea>
	</label>
	<button type="submit">{buttonText}</button>
</form>

<style>
	.mood-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: 600;
		color: #2c2c3a;
	}

	input, select, textarea {
		margin-top: 4px;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 16px;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	button {
		padding: 10px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		margin-top: 8px;
	}

	button:hover {
		background: #6a3fb3;
	}
</style>