<script>
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

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
						<span>👤</span>
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
							<a href="/overview" class:active={page.url.pathname === '/overview'}>Übersicht</a>
						{:else}
							<span class="dropdown-locked" title="Bitte zuerst einloggen">
								Übersicht <span class="lock-icon">🔒</span>
							</span>
						{/if}

						<a href="/tipps" class:active={page.url.pathname === '/tipps'}>Tipps</a>

						{#if data.user}
							<a href="/settings" class:active={page.url.pathname === '/settings'}>Einstellungen</a>
						{:else}
							<span class="dropdown-locked" title="Bitte zuerst einloggen">
								Einstellungen <span class="lock-icon">🔒</span>
							</span>
						{/if}

						<div class="dropdown-divider"></div>

						{#if data.user}
							<form method="POST" action="/logout">
								<button type="submit" class="dropdown-logout">Ausloggen</button>
							</form>
						{:else}
							<a href="/login" class:active={page.url.pathname === '/login'}>Einloggen</a>
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
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
		background: #f4f0f8;
		color: #2c2c3a;
		-webkit-font-smoothing: antialiased;
	}

	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 12px 32px;
	}

	.topbar {
		width: min(100%, 430px);
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: #ece6f2;
		border-radius: 0 0 20px 20px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.brand {
		color: #7d4ec9;
		font-weight: 800;
		font-size: 1.15rem;
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	.topbar-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.icon-button {
		border: none;
		background: white;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		color: #4c407d;
		text-decoration: none;
		font-size: 1rem;
		flex-shrink: 0;
	}

	.user-icon-wrapper {
		position: relative;
		display: inline-flex;
	}

	.user-logged-in {
		cursor: default;
	}

	.status-dot {
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 2px solid #ece6f2;
		pointer-events: none;
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
		width: 16px;
		height: 2px;
		background: #4c407d;
		position: relative;
	}

	.menu-icon::before,
	.menu-icon::after {
		content: '';
		position: absolute;
		left: 0;
		width: 16px;
		height: 2px;
		background: #4c407d;
	}

	.menu-icon::before {
		top: -5px;
	}

	.menu-icon::after {
		top: 5px;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 999;
		width: 200px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(73, 60, 108, 0.18);
		display: flex;
		flex-direction: column;
		padding: 6px;
		gap: 2px;
	}

	.dropdown a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0 14px;
		text-decoration: none;
		color: #2c2c3a;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 10px;
		transition: background 0.15s;
	}

	.dropdown a:hover {
		background: #f3ebfb;
	}

	.dropdown a.active {
		background: #f3ebfb;
		color: #7d4ec9;
	}

	.dropdown-divider {
		height: 1px;
		background: #f0ebfa;
		margin: 4px 0;
	}

	.dropdown-locked {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 44px;
		padding: 0 14px;
		color: #c0b8d4;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 10px;
		cursor: not-allowed;
	}

	.lock-icon {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.dropdown form {
		margin: 0;
	}

	.dropdown-logout {
		display: flex;
		align-items: center;
		min-height: 44px;
		width: 100%;
		padding: 0 14px;
		text-align: left;
		background: none;
		border: none;
		color: #c0392b;
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		border-radius: 10px;
		transition: background 0.15s;
	}

	.dropdown-logout:hover {
		background: #fdecea;
	}

	.content {
		width: min(100%, 430px);
		margin-top: 12px;
		background: white;
		border-radius: 20px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
		min-height: calc(100vh - 100px);
		overflow: hidden;
	}
</style>
