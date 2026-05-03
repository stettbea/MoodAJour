<script>
	import { page } from '$app/state';

	let { form } = $props();

	let showRegisterModal = $state(false);
</script>

<main class="auth-page">
	<section class="auth-card">
		<h1>Willkommen zurück</h1>
		<p>Logge dich ein, um deine Mood-Einträge zu sehen.</p>

		{#if form?.error}
			<div class="error-message">{form.error}</div>
		{/if}

		<form method="POST" action="?/login">
			<label for="input">E-Mail oder Benutzername</label>
			<input id="input" name="input" type="text" required />

			<label for="password">Passwort</label>
			<input id="password" name="password" type="password" required />

			<button type="submit">Einloggen</button>
		</form>

		<p class="switch-link">
			Noch kein Konto?
			<button type="button" class="link-button" on:click={() => showRegisterModal = true}>Registrieren</button>
		</p>
	</section>

	{#if showRegisterModal}
		<div class="modal-overlay" on:click={() => showRegisterModal = false}>
			<div class="modal" on:click|stopPropagation>
				<button class="close-button" on:click={() => showRegisterModal = false}>&times;</button>
				<h1>Konto erstellen</h1>
				<p>Erstelle ein Konto, damit deine Einträge persönlich gespeichert werden.</p>

				{#if form?.error}
					<div class="error-message">{form.error}</div>
				{/if}

				<form method="POST" action="?/register">
					<label for="username">Benutzername</label>
					<input
						id="username"
						name="username"
						type="text"
						value={form?.values?.username ?? ''}
						required
					/>

					<label for="register-email">E-Mail</label>
					<input
						id="register-email"
						name="email"
						type="email"
						value={form?.values?.email ?? ''}
						required
					/>

					<label for="register-password">Passwort</label>
					<input id="register-password" name="password" type="password" required />

					<label for="passwordConfirm">Passwort bestätigen</label>
					<input id="passwordConfirm" name="passwordConfirm" type="password" required />

					<button type="submit">Registrieren</button>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	.auth-page {
		padding: 20px;
	}

	.auth-card {
		background: #f7f3fc;
		border: 1px solid #d9c8f3;
		border-radius: 22px;
		padding: 20px;
		box-shadow: 0 8px 20px rgba(125, 78, 201, 0.08);
	}

	h1 {
		margin: 0 0 8px;
		color: #20182f;
		font-size: 1.6rem;
	}

	p {
		margin: 0 0 18px;
		color: #6b5a7a;
		line-height: 1.45;
		font-size: 0.95rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	label {
		font-weight: 600;
		color: #2c2c3a;
		font-size: 0.9rem;
	}

	input {
		padding: 12px;
		border: 1px solid #d9c8f3;
		border-radius: 12px;
		font-size: 0.95rem;
		background: white;
		color: #2c2c3a;
	}

	input:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.12);
	}

	button {
		margin-top: 8px;
		padding: 12px;
		border: none;
		border-radius: 14px;
		background: #7d4ec9;
		color: white;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
	}

	.link-button {
		background: none;
		border: none;
		color: #7d4ec9;
		text-decoration: underline;
		cursor: pointer;
		font-size: inherit;
		padding: 0;
		margin: 0;
	}

	.error-message {
		background: #fdecec;
		border: 1px solid #f3b6b6;
		color: #7a1f1f;
		padding: 12px;
		border-radius: 12px;
		margin-bottom: 14px;
		font-size: 0.9rem;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		background: #f7f3fc;
		border: 1px solid #d9c8f3;
		border-radius: 22px;
		padding: 20px;
		box-shadow: 0 8px 20px rgba(125, 78, 201, 0.08);
		max-width: 400px;
		width: 90%;
		position: relative;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #6b5a7a;
	}

	.switch-link {
		margin: 18px 0 0;
		text-align: center;
	}

</style>