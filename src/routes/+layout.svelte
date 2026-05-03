<script>
	import favicon from '$lib/assets/favicon.svg';

	// In Svelte 5 wird der Seiteninhalt über $props() bereitgestellt.
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<a class="brand" href="/">MoodAJour</a>
		<div class="topbar-actions">
			<a class="icon-button" href="/login" aria-label="Login">
				<span class="icon user-icon">👤</span>
			</a>
			<div class="menu-wrapper">
				<details>
					<summary class="icon-button menu-button" aria-label="Menü öffnen">
						<span class="menu-icon"></span>
					</summary>
					<nav class="dropdown">
						<a href="/overview">Übersicht</a>
						<a href="/tipps">Tipps</a>
						<a href="/settings">Einstellungen</a>
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

	.menu-button {
		padding: 0;
		list-style: none; /* Entfernt den Standard-Pfeil von <summary> */
	}

	.menu-button::-webkit-details-marker {
		display: none; /* Versteckt den Standard-Pfeil in Webkit-Browsern */
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
