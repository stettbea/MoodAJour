<script>
	let { filters = {}, categories = [], persons = [], onAddEntry = null } = $props();

	const activeCount = $derived(
		[filters.title, filters.category, filters.mood,
		 filters.persons, filters.day, filters.month, filters.year]
			.filter((v) => v && v !== '').length
	);

	// null = Standardverhalten (offen wenn Filter aktiv), true/false = User-Override
	let filterOverride = $state(null);
	const isOpen = $derived(filterOverride !== null ? filterOverride : activeCount > 0);

	function toggleFilter() {
		filterOverride = !isOpen;
	}
</script>

<section class="filter-panel">
	<div class="panel-header">
		<div>
			<h2>Übersicht</h2>
			<p>Deine Mood-Einträge</p>
		</div>
		<div class="header-actions">
			<button
				type="button"
				class="filter-toggle"
				class:has-filters={activeCount > 0}
				onclick={toggleFilter}
				aria-expanded={isOpen}
			>
				{#if activeCount > 0}
					<span class="filter-badge">{activeCount}</span>
				{/if}
				Filter
				<span class="toggle-arrow" class:open={isOpen}>↓</span>
			</button>
			{#if onAddEntry}
			<button type="button" class="add-button" onclick={onAddEntry}>+ Eintrag</button>
		{:else}
			<a class="add-button" href="/">+ Eintrag</a>
		{/if}
		</div>
	</div>

	{#if isOpen}
		<div class="filter-body">
			<form method="GET" class="filter-form">
				<div class="grid-2">
					<label>
						<span>Was</span>
						<input type="text" name="title" value={filters.title} placeholder="z. B. Stress" />
					</label>
					<label>
						<span>Kategorie</span>
						<select name="category">
							<option value="">Alle</option>
							{#each categories as cat}
								<option value={cat} selected={cat === filters.category}>{cat}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="grid-2">
					<label>
						<span>Stimmung</span>
						<select name="mood">
							<option value="">Alle</option>
							{#each Array(10) as _, i}
								<option value={i + 1} selected={String(i + 1) === filters.mood}>{i + 1}</option>
							{/each}
						</select>
					</label>
					<label>
						<span>Person</span>
						<select name="persons">
							<option value="">Alle</option>
							{#each persons as person}
								<option value={person} selected={person === filters.persons}>{person}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="date-group">
					<span class="date-label">Datum</span>
					<div class="grid-3">
						<label>
							<span>Tag</span>
							<input type="text" name="day" value={filters.day} maxlength="2" placeholder="TT" inputmode="numeric" />
						</label>
						<label>
							<span>Monat</span>
							<input type="text" name="month" value={filters.month} maxlength="2" placeholder="MM" inputmode="numeric" />
						</label>
						<label>
							<span>Jahr</span>
							<input type="text" name="year" value={filters.year} maxlength="4" placeholder="JJJJ" inputmode="numeric" />
						</label>
					</div>
				</div>

				<div class="action-row">
					<button type="submit" class="btn-apply">Filter anwenden</button>
					<a class="btn-reset" href="/overview">Zurücksetzen</a>
				</div>
			</form>
		</div>
	{/if}
</section>

<style>
	.filter-panel {
		background: #f6f1ff;
		border: 1px solid #e6e0f4;
		border-radius: 20px;
		overflow: hidden;
		margin-bottom: 16px;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
	}

	h2 {
		margin: 0 0 2px;
		font-size: 1.2rem;
		font-weight: 700;
		color: #20182f;
	}

	.panel-header p {
		margin: 0;
		color: #6b5a7a;
		font-size: 0.8rem;
	}

	.header-actions {
		display: flex;
		gap: 8px;
		align-items: center;
		flex-shrink: 0;
	}

	.filter-toggle {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 38px;
		padding: 0 14px;
		background: white;
		border: 1.5px solid #dcd1f7;
		border-radius: 10px;
		color: #4c407d;
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		white-space: nowrap;
		transition: all 0.15s;
	}

	.filter-toggle.has-filters {
		border-color: #7d4ec9;
		color: #7d4ec9;
		background: #f3ebfb;
	}

	.filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background: #7d4ec9;
		color: white;
		border-radius: 50%;
		font-size: 0.7rem;
		font-weight: 700;
	}

	.toggle-arrow {
		font-size: 0.7rem;
		transition: transform 0.2s;
		display: inline-block;
	}

	.toggle-arrow.open {
		transform: rotate(180deg);
	}

	.add-button {
		display: inline-flex;
		align-items: center;
		min-height: 38px;
		padding: 0 14px;
		background: #7d4ec9;
		color: white;
		border-radius: 10px;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.875rem;
		white-space: nowrap;
		transition: background 0.15s;
	}

	.add-button:hover {
		background: #6940b4;
	}

	.filter-body {
		border-top: 1px solid #e6e0f4;
		padding: 16px 20px 20px;
	}

	.filter-form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.date-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.date-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #4c407d;
	}

	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1.4fr;
		gap: 8px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	label span {
		font-size: 0.8rem;
		font-weight: 600;
		color: #4c407d;
	}

	input,
	select {
		padding: 10px 12px;
		border: 1.5px solid #e6e0f4;
		border-radius: 10px;
		background: white;
		color: #2c2c3a;
		font-size: 0.9rem;
		min-height: 42px;
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
	}

	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234c407d' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		padding-right: 32px;
	}

	input:focus,
	select:focus {
		outline: none;
		border-color: #7d4ec9;
		box-shadow: 0 0 0 3px rgba(125, 78, 201, 0.1);
	}

	.action-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.btn-apply,
	.btn-reset {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 0.9rem;
		cursor: pointer;
		transition: background 0.15s;
	}

	.btn-apply {
		background: #7d4ec9;
		color: white;
		border: none;
	}

	.btn-apply:hover {
		background: #6940b4;
	}

	.btn-reset {
		background: white;
		color: #4c407d;
		border: 1.5px solid #dcd1f7;
		text-decoration: none;
	}

	.btn-reset:hover {
		background: #f3ebfb;
	}
</style>
