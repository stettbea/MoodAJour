<script>
	let { entry, redirectTo = '/' } = $props();
	let showDeleteModal = $state(false);
</script>

<div class="entry-card">
	<div class="entry-top">
		<h3>{entry.title || 'Unbekannt'}</h3>
		<div class="mood-badge">{entry.mood || 5}</div>
	</div>
	<div class="entry-meta">
		<span>{entry.date || 'Unbekannt'}</span>
		<span>{entry.category || 'Unbekannt'}</span>
		<span>{entry.persons ? entry.persons : 'Personen: -'}</span>
	</div>
	<p>{entry.description || 'Keine Beschreibung'}</p>
	<div class="actions">
		<a href="/entries/{entry.id}/edit" class="action-btn">Bearbeiten</a>
		<button type="button" class="action-btn delete-btn" onclick={() => (showDeleteModal = true)}>
			Löschen
		</button>
	</div>
</div>

{#if showDeleteModal}
	<div class="modal-overlay" onclick={() => (showDeleteModal = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<button class="close-button" onclick={() => (showDeleteModal = false)}>&times;</button>
			<h2>Eintrag löschen?</h2>
			<p>
				Bist du sicher, dass du diesen Eintrag löschen möchtest?<br />
				Diese Aktion kann nicht rückgängig gemacht werden.
			</p>
			<div class="modal-actions">
				<button type="button" class="btn-cancel" onclick={() => (showDeleteModal = false)}>
					Abbrechen
				</button>
				<form method="POST" action="/entries/{entry.id}/delete">
					<input type="hidden" name="redirectTo" value={redirectTo} />
					<button type="submit" class="btn-delete">Löschen</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.entry-card {
		padding: 18px;
		background: #faf7ff;
		border: 1px solid #ece6f2;
		border-radius: 20px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	}

	.entry-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		color: #2c2c3a;
	}

	.mood-badge {
		min-width: 42px;
		padding: 10px 12px;
		border-radius: 14px;
		background: #7d4ec9;
		color: white;
		font-weight: 700;
		text-align: center;
	}

	.entry-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		font-size: 0.9rem;
		color: #5e4e8b;
		margin: 10px 0;
	}

	p {
		margin: 0;
		color: #2c2c3a;
		line-height: 1.6;
	}

	.actions {
		margin-top: 14px;
		display: flex;
		gap: 10px;
	}

	.action-btn {
		flex: 1;
		padding: 12px 14px;
		background: white;
		color: #4c407d;
		border: 1px solid #dcd1f7;
		border-radius: 14px;
		cursor: pointer;
		font-weight: 700;
		text-decoration: none;
		text-align: center;
		display: block;
		font-size: 1rem;
	}

	.action-btn:hover {
		background: #f3ebfb;
	}

	.delete-btn {
		color: #c0392b;
		border-color: #f3b6b6;
	}

	.delete-btn:hover {
		background: #fdecea;
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		padding: 20px;
	}

	.modal {
		background: white;
		border-radius: 22px;
		padding: 28px 24px 24px;
		width: min(100%, 390px);
		position: relative;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
	}

	.close-button {
		position: absolute;
		top: 14px;
		right: 16px;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #6b5a7a;
		padding: 0;
		line-height: 1;
	}

	h2 {
		margin: 0 0 12px;
		font-size: 1.3rem;
		color: #20182f;
	}

	.modal p {
		color: #4c407d;
		font-size: 0.95rem;
		line-height: 1.55;
		margin: 0 0 24px;
	}

	.modal-actions {
		display: flex;
		gap: 12px;
	}

	.modal-actions form {
		flex: 1;
	}

	.btn-cancel,
	.btn-delete {
		width: 100%;
		padding: 14px;
		border-radius: 16px;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		border: 1px solid #d9c8f3;
	}

	.btn-cancel {
		background: white;
		color: #2c2c3a;
		flex: 1;
	}

	.btn-cancel:hover {
		background: #f3ebfb;
	}

	.btn-delete {
		background: #20182f;
		color: white;
		border-color: #20182f;
	}

	.btn-delete:hover {
		background: #c0392b;
		border-color: #c0392b;
	}
</style>
