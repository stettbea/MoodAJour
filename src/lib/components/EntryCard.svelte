<script>
	let { entry } = $props();
</script>

<div class="entry-card">
	<h3>{entry.was || "Unbekannt"}</h3>
	<p><strong>Datum:</strong> {entry.wann || "Unbekannt"}</p>
	<p><strong>Kategorie:</strong> {entry.kategorie || "Unbekannt"}</p>
	<p><strong>Stimmung:</strong> {entry.stimmung || 5}/10</p>
	<p>{entry.beschreibung || "Keine Beschreibung"}</p>
	<div class="actions">
		<button>Bearbeiten</button>
		<button>Löschen</button>
	</div>
</div>

<style>
	.entry-card {
		padding: 16px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		margin-bottom: 12px;
	}

	h3 {
		margin: 0 0 8px 0;
		color: #7d4ec9;
		font-size: 1.2em;
	}

	p {
		margin: 4px 0;
		color: #2c2c3a;
	}

	.actions {
		margin-top: 12px;
		display: flex;
		gap: 8px;
	}

	button {
		padding: 6px 12px;
		background: #ece6f2;
		color: #4c407d;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
	}

	button:hover {
		background: #d4c9e6;
	}
</style>