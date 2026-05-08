<script>
	let { form } = $props();

	let showRegisterModal = $state(form?.action === 'register');
</script>

<main class="auth-page">
	<div class="auth-card">
		<h1>Willkommen zurück</h1>
		<p>Logge dich ein, um deine Mood-Einträge zu sehen.</p>

		{#if form?.action === 'login' && form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}

		<form method="POST" action="?/login" class="auth-form">
			<label>
				<span>E-Mail oder Benutzername</span>
				<input id="input" name="input" type="text" autocomplete="username" required />
			</label>

			<label>
				<span>Passwort</span>
				<input id="password" name="password" type="password" autocomplete="current-password" required />
			</label>

			<button type="submit" class="btn-primary">Einloggen</button>
		</form>

		<p class="switch-link">
			Noch kein Konto?
			<button type="button" class="link-btn" onclick={() => (showRegisterModal = true)}>
				Registrieren
			</button>
		</p>
	</div>
</main>

{#if showRegisterModal}
	<div class="modal-overlay" onclick={() => (showRegisterModal = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<button class="close-btn" onclick={() => (showRegisterModal = false)} aria-label="Schliessen">
				&times;
			</button>

			<h2>Konto erstellen</h2>
			<p>Erstelle ein Konto, damit deine Einträge persönlich gespeichert werden.</p>

			{#if form?.action === 'register' && form?.error}
				<div class="alert alert-error">{form.error}</div>
			{/if}

			<form method="POST" action="?/register" class="auth-form">
				<label>
					<span>Benutzername</span>
					<input
						name="username"
						type="text"
						value={form?.values?.username ?? ''}
						autocomplete="username"
						required
					/>
				</label>

				<label>
					<span>E-Mail</span>
					<input
						name="email"
						type="email"
						value={form?.values?.email ?? ''}
						autocomplete="email"
						required
					/>
				</label>

				<label>
					<span>Passwort</span>
					<input name="password" type="password" autocomplete="new-password" required />
				</label>

				<label>
					<span>Passwort bestätigen</span>
					<input name="passwordConfirm" type="password" autocomplete="new-password" required />
				</label>

				<button type="submit" class="btn-primary">Registrieren</button>
			</form>
		</div>
	</div>
{/if}

<style>
	.auth-page {
		padding: 16px 16px 40px;
	}

	.auth-card {
		background: #faf7ff;
		border: 1px solid #e6e0f4;
		border-radius: 20px;
		padding: 24px 20px;
	}

	h1 {
		margin: 0 0 6px;
		font-size: 1.4rem;
		font-weight: 700;
		color: #20182f;
	}

	p {
		margin: 0 0 20px;
		color: #6b5a7a;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.alert {
		padding: 12px 14px;
		border-radius: 12px;
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 16px;
		line-height: 1.45;
	}

	.alert-error {
		background: #fdecea;
		border: 1px solid #f5c2c7;
		color: #842029;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label span {
		font-size: 0.875rem;
		font-weight: 600;
		color: #4c407d;
	}

	input {
		padding: 13px 14px;
		border: 1.5px solid #e6e0f4;
		border-radius: 12px;
		font-size: 0.95rem;
		background: white;
		color: #2c2c3a;
		min-height: 48px;
		-webkit-appearance: none;
		appearance: none;
	}

	input:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.1);
	}

	.btn-primary {
		margin-top: 4px;
		min-height: 52px;
		padding: 0 16px;
		border: none;
		border-radius: 14px;
		background: #7d4ec9;
		color: white;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s;
	}

	.btn-primary:hover {
		background: #6940b4;
	}

	.btn-primary:active {
		background: #5c3399;
	}

	.switch-link {
		margin: 20px 0 0;
		text-align: center;
		font-size: 0.9rem;
		color: #6b5a7a;
	}

	.link-btn {
		background: none;
		border: none;
		color: #7d4ec9;
		text-decoration: underline;
		cursor: pointer;
		font-size: inherit;
		font-weight: 600;
		padding: 0;
	}

	/* Modal als Bottom Sheet */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 1000;
	}

	.modal {
		background: white;
		border-radius: 20px 20px 0 0;
		padding: 28px 20px 48px;
		width: 100%;
		max-width: 430px;
		max-height: 92dvh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15);
	}

	.close-btn {
		position: absolute;
		top: 16px;
		right: 16px;
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

	h2 {
		margin: 0 0 6px;
		font-size: 1.3rem;
		font-weight: 700;
		color: #20182f;
	}
</style>
