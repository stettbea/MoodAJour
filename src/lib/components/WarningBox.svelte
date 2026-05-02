<script>
	let { isVisible = true } = $props();
	let visible = $state(isVisible);

	function dismiss() {
		visible = false;
	}
</script>

{#if visible}
	<div class="warning-notification" role="alert">
		<div class="notification-header">
			<h3>Hinweis: Du hast gerade ein belastendes Erlebnis erfasst.</h3>
			<button class="close-btn" onclick={dismiss} aria-label="Schließen">
				✕
			</button>
		</div>
		<p class="notification-text">
			Wenn du möchtest, kannst du dir jetzt passende Tipps oder Unterstützung anzeigen lassen.
		</p>
		<a href="/tipps" class="tip-button">Tipps anzeigen</a>
	</div>
{/if}

<style>
	.warning-notification {
		margin: 0 16px 20px;
		padding: 18px;
		background: #f8d7da;
		border: 1px solid #f5c2c7;
		border-radius: 20px;
		color: #842029;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.notification-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
		margin-bottom: 12px;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #842029;
	}

	.close-btn {
		background: none;
		border: none;
		color: #842029;
		font-size: 1.4rem;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.close-btn:hover {
		opacity: 0.7;
	}

	.notification-text {
		margin: 0 0 14px 0;
		font-size: 0.95rem;
		line-height: 1.5;
		color: #842029;
	}

	.tip-button {
		display: inline-flex;
		padding: 12px 18px;
		background: #842029;
		color: white;
		text-decoration: none;
		border-radius: 14px;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.tip-button:hover {
		background: #6f1f2e;
	}
</style>
