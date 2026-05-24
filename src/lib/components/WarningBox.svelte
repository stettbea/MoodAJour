<script>
	let { isVisible = true, entryId = null } = $props();
	let visible = $state(isVisible);

	function dismiss() {
		visible = false;
	}
</script>

{#if visible}
	<div class="modal-overlay" onclick={dismiss}>
		<div class="modal" onclick={(e) => e.stopPropagation()} role="alert">
			<button class="close-btn" onclick={dismiss} aria-label="Schliessen">&times;</button>

			<div class="icon">💡</div>
			<h2>Stimmung unter 5 erfasst</h2>
			<p>
				Bei tiefen Stimmungswerten stehen dir Tipps und Notfallkontakte zur Verfügung.
			</p>

			<div class="actions">
				<a href="/tipps{entryId ? `?entryId=${entryId}` : ''}" class="btn-primary">Tipps anzeigen</a>
				<button type="button" class="btn-secondary" onclick={dismiss}>Schliessen</button>
			</div>
		</div>
	</div>
{/if}

<style>
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
		max-width: 390px;
		position: relative;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
		text-align: center;
	}

	.close-btn {
		position: absolute;
		top: 14px;
		right: 14px;
		width: 32px;
		height: 32px;
		background: #f0ebfa;
		border: none;
		border-radius: 50%;
		font-size: 1.2rem;
		cursor: pointer;
		color: #6b5a7a;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-btn:hover {
		background: #e6ddf7;
	}

	.icon {
		font-size: 2rem;
		margin-bottom: 12px;
	}

	h2 {
		margin: 0 0 12px;
		font-size: 1.15rem;
		font-weight: 700;
		color: #20182f;
	}

	p {
		margin: 0 0 24px;
		font-size: 0.9rem;
		color: #6b5a7a;
		line-height: 1.55;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.btn-primary,
	.btn-secondary {
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
		border: none;
	}

	.btn-primary {
		background: #7d4ec9;
		color: white;
	}

	.btn-primary:hover {
		background: #6940b4;
	}

	.btn-secondary {
		background: #f0ebfa;
		color: #4c407d;
	}

	.btn-secondary:hover {
		background: #e6ddf7;
	}
</style>
