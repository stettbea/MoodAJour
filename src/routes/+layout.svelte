<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<a class="brand" href="/">MoodAJour</a>
		<div class="topbar-actions">
			<div class="user-icon-wrapper">
				{#if data.user}
					<span class="icon-button user-logged-in" title={data.user.username}>👤</span>
					<span class="status-dot logged-in" aria-label="Eingeloggt"></span>
				{:else}
					<a class="icon-button" href="/login" aria-label="Login">
						<span class="icon user-icon">👤</span>
					</a>
					<span class="status-dot logged-out" aria-label="Nicht eingeloggt"></span>
				{/if}
			</div>
			<div class="menu-wrapper">
				<details>
					<summary class="icon-button menu-button" aria-label="Menü öffnen">
						<span class="menu-icon"></span>
					</summary>
					<nav class="dropdown">
						{#if data.user}
							<a href="/overview">Übersicht</a>
						{:else}
							<span class="dropdown-locked" title="Bitte zuerst einloggen">
								Übersicht <span class="lock-icon">🔒</span>
							</span>
						{/if}
						<a href="/tipps">Tipps</a>
						{#if data.user}
							<a href="/settings">Einstellungen</a>
						{:else}
							<span class="dropdown-locked" title="Bitte zuerst einloggen">
								Einstellungen <span class="lock-icon">🔒</span>
							</span>
						{/if}
						{#if data.user}
							<form method="POST" action="/logout">
								<button type="submit" class="dropdown-logout">Ausloggen</button>
							</form>
						{:else}
							<a href="/login">Einloggen</a>
						{/if}
					</nav>
				</details>
			</div>
		</div>
	</header>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: #f4f0f8;
		color: #2c2c3a;
	}

	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 12px 24px;
	}

	.topbar {
		width: min(100%, 430px);
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		background: #ece6f2;
		border-radius: 18px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	}

	.brand {
		color: #7d4ec9;
		font-weight: 700;
		font-size: 1.1rem;
	}

	.topbar-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.icon-button {
		border: none;
		background: white;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
		color: #4c407d;
		text-decoration: none;
	}

	.user-icon-wrapper {
		position: relative;
		display: inline-flex;
	}

	.user-logged-in {
		cursor: default;
		font-size: 1.1rem;
	}

	.status-dot {
		position: absolute;
		bottom: 1px;
		right: 1px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 2px solid #ece6f2;
	}

	.status-dot.logged-in {
		background: #22c55e;
	}

	.status-dot.logged-out {
		background: #d1d5db;
	}

	.menu-button {
		padding: 0;
		list-style: none;
	}

	.menu-button::-webkit-details-marker {
		display: none;
	}

	.menu-wrapper {
		position: relative;
	}

	.menu-icon {
		display: block;
		width: 18px;
		height: 2px;
		background: #4c407d;
		position: relative;
	}

	.menu-icon::before,
	.menu-icon::after {
		content: '';
		position: absolute;
		left: 0;
		width: 18px;
		height: 2px;
		background: #4c407d;
	}

	.menu-icon::before {
		top: -6px;
	}

	.menu-icon::after {
		top: 6px;
	}

	.dropdown {
		position: absolute;
		top: 48px;
		right: 0;
		z-index: 999;
		width: 220px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 18px 40px rgba(73, 60, 108, 0.16);
		display: flex;
		flex-direction: column;
		padding: 8px 0;
		gap: 4px;
	}

	.dropdown a {
		padding: 12px 16px;
		text-decoration: none;
		color: #2c2c3a;
		font-weight: 600;
		border-radius: 12px;
	}

	.dropdown a:hover {
		background: #f3ebfb;
	}

	.dropdown-locked {
		padding: 12px 16px;
		color: #b0a8c0;
		font-weight: 600;
		border-radius: 12px;
		cursor: not-allowed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1rem;
	}

	.lock-icon {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.dropdown form {
		margin: 0;
		padding: 0 4px;
	}

	.dropdown-logout {
		width: 100%;
		padding: 12px 12px;
		text-align: left;
		background: none;
		border: none;
		color: #c0392b;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 12px;
		margin-top: 0;
	}

	.dropdown-logout:hover {
		background: #fdecea;
	}

	.content {
		width: min(100%, 430px);
		margin-top: 18px;
		padding: 0 0 20px;
		background: white;
		border-radius: 24px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		min-height: calc(100vh - 120px);
	}

	@media (max-width: 380px) {
		.topbar {
			padding: 12px 14px;
		}

		.dropdown {
			right: 12px;
			width: calc(100% - 24px);
		}
	}
</style>
