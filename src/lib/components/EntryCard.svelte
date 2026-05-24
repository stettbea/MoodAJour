<script>
	let { entry, redirectTo = '/' } = $props();
	let showDeleteModal = $state(false);

	function formatDate(dateStr) {
		if (!dateStr) return '—';
		try {
			// Nur den Datumsteil verwenden, um Timezone-Verschiebungen zu vermeiden
			const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
			return new Intl.DateTimeFormat('de-CH', {
				weekday: 'short',
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			}).format(new Date(year, month - 1, day));
		} catch {
			return dateStr;
		}
	}

	function moodBg(mood) {
		if (mood <= 3) return '#c0392b';
		if (mood <= 5) return '#e67e22';
		if (mood <= 7) return '#2980b9';
		return '#27ae60';
	}

	function moodEmoji(mood) {
		if (mood <= 2) return '😢';
		if (mood <= 4) return '😕';
		if (mood <= 6) return '😐';
		if (mood <= 8) return '🙂';
		return '😄';
	}
</script>

<div class="entry-card">
	<a href="/entries/{entry.id}/edit" class="card-link" aria-label="{entry.title || 'Eintrag'} bearbeiten"></a>

	<button type="button" class="btn-delete-corner" onclick={() => (showDeleteModal = true)} aria-label="Eintrag löschen">
		🗑
	</button>

	<div class="entry-top">
		<h3>{entry.title || 'Unbekannt'}</h3>
		<div class="mood-badge" style="background: {moodBg(entry.mood)}">
			{moodEmoji(entry.mood)} {entry.mood ?? 5}/10
		</div>
	</div>

	<div class="entry-meta">
		{#if entry.date}
			<span class="meta-item">📅 {formatDate(entry.date)}</span>
		{/if}
		{#if entry.category}
			<span class="meta-item">🏷 {entry.category}</span>
		{/if}
		{#if entry.persons}
			<span class="meta-item">👤 {entry.persons}</span>
		{/if}
		{#if entry.usedTips?.length > 0}
			{#each entry.usedTips as tip}
				<span class="meta-item meta-tip">💡 {tip}</span>
			{/each}
		{/if}
	</div>

	{#if entry.description}
		<p class="description">{entry.description}</p>
	{/if}
</div>

{#if showDeleteModal}
	<div class="modal-overlay" onclick={() => (showDeleteModal = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<button class="close-button" onclick={() => (showDeleteModal = false)} aria-label="Schliessen">
				&times;
			</button>
			<h2>Eintrag löschen?</h2>
			<p>
				Bist du sicher, dass du diesen Eintrag löschen möchtest?<br />
				Diese Aktion kann nicht rückgängig gemacht werden.
			</p>
			<div class="modal-actions">
				<button type="button" class="btn btn-secondary" onclick={() => (showDeleteModal = false)}>
					Abbrechen
				</button>
				<form method="POST" action="/entries/{entry.id}/delete">
					<input type="hidden" name="redirectTo" value={redirectTo} />
					<button type="submit" class="btn btn-delete">Löschen</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.entry-card {
		position: relative;
		padding: 16px 14px 16px 16px;
		background: #faf7ff;
		border: 1px solid #e6e0f4;
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: border-color 0.15s, box-shadow 0.15s;
		cursor: pointer;
	}

	.entry-card:hover {
		border-color: #c9b9f0;
		box-shadow: 0 4px 14px rgba(125, 78, 201, 0.12);
	}

	.card-link {
		position: absolute;
		inset: 0;
		border-radius: 16px;
		z-index: 0;
	}

	.btn-delete-corner {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 1;
		width: 30px;
		height: 30px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 8px;
		font-size: 0.85rem;
		color: #c0b8d4;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;
	}

	.btn-delete-corner:hover {
		background: #fdecea;
		color: #c0392b;
	}

	.entry-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
		margin-bottom: 10px;
		padding-right: 24px;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #20182f;
		line-height: 1.35;
	}

	.mood-badge {
		flex-shrink: 0;
		padding: 5px 10px;
		border-radius: 10px;
		color: white;
		font-weight: 700;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.entry-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-bottom: 0;
	}

	.meta-item {
		font-size: 0.8rem;
		color: #6b5a7a;
		background: #f0ebfa;
		padding: 3px 8px;
		border-radius: 6px;
		white-space: nowrap;
	}

	.meta-tip {
		color: #4c407d;
		background: #ede6fb;
	}

	.description {
		margin: 6px 0 0;
		font-size: 0.875rem;
		color: #4c407d;
		line-height: 1.45;
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 16px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		text-decoration: none;
		border: 1.5px solid #dcd1f7;
		background: white;
		color: #4c407d;
		transition: background 0.15s;
	}

	.btn-secondary:hover {
		background: #f3ebfb;
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
		padding: 16px;
	}

	.modal {
		background: white;
		border-radius: 20px;
		padding: 28px 24px;
		width: 100%;
		max-width: 430px;
		position: relative;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
	}

	.close-button {
		position: absolute;
		top: 16px;
		right: 16px;
		background: #f0ebfa;
		border: none;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-size: 1.2rem;
		cursor: pointer;
		color: #6b5a7a;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	h2 {
		margin: 0 0 10px;
		font-size: 1.25rem;
		color: #20182f;
	}

	.modal p {
		color: #6b5a7a;
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

	.btn-delete {
		width: 100%;
		min-height: 48px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		background: #20182f;
		color: white;
		border: none;
		transition: background 0.15s;
	}

	.btn-delete:hover {
		background: #c0392b;
	}

	.modal-actions .btn-secondary {
		min-height: 48px;
	}
</style>
