<script>
	let { form } = $props();
</script>

<main class="registration-page">
	<section class="auth-card">
		<h1>Registrierung</h1>
		<p>Erstelle ein Konto, damit deine Mood-Einträge gespeichert werden können.</p>

		{#if form?.error}
			<div class="error-message">
				{form.error}
			</div>
		{/if}

		<form method="POST">
			<label for="username">Benutzername</label>
			<input
				id="username"
				name="username"
				type="text"
				value={form?.values?.username ?? ''}
				required
			/>

			<label for="email">E-Mail</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form?.values?.email ?? ''}
				required
			/>

			<label for="password">Passwort</label>
			<input id="password" name="password" type="password" required />

			<label for="passwordConfirm">Passwort bestätigen</label>
			<input id="passwordConfirm" name="passwordConfirm" type="password" required />

			<button type="submit">Registrieren</button>
		</form>

		<p class="login-link">
			Du hast bereits ein Konto?
			<a href="/login">Zum Login</a>
		</p>
	</section>
</main>

<style>
	.registration-page {
		padding: 20px;
	}

	.auth-card {
		background: #f7f3fc;
		border: 1px solid #d9c8f3;
		border-radius: 20px;
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

	.error-message {
		background: #fdecec;
		border: 1px solid #f3b6b6;
		color: #7a1f1f;
		padding: 12px;
		border-radius: 12px;
		margin-bottom: 14px;
		font-size: 0.9rem;
	}

	.login-link {
		margin: 18px 0 0;
		text-align: center;
	}

	a {
		color: #7d4ec9;
		font-weight: 700;
		text-decoration: none;
	}
</style>