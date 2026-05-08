<script>
	let { filters = {}, categories = [], persons = [] } = $props();
</script>

<section class="filter-panel">
	<div class="panel-header">
		<div>
			<h2>Übersicht</h2>
			<p>Alle Einträge anzeigen und filtern</p>
		</div>
		<a class="add-button" href="/">+ Eintrag</a>
	</div>

	<div class="filter-label">Filter</div>
	<form method="GET" class="filter-form">
		<div class="grid-row">
			<label>
				<span>Was</span>
				<input type="text" name="title" value={filters.title} placeholder="z. B. Stress" />
			</label>
			<label>
				<span>Kategorie</span>
				<select name="category" value={filters.category}>
					<option value="">Alle</option>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="grid-row">
			<label>
				<span>Stimmung</span>
				<select name="mood" value={filters.mood}>
					<option value="">Alle</option>
					{#each Array(10) as _, i}
						<option value={i + 1}>{i + 1}</option>
					{/each}
				</select>
			</label>
			<label>
				<span>Personen</span>
				<select name="persons" value={filters.persons}>
					<option value="">Alle</option>
					{#each persons as person}
						<option value={person}>{person}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="date-row">
			<label>
				<span>Tag</span>
				<input type="text" name="day" value={filters.day} maxlength="2" placeholder="DD" />
			</label>
			<label>
				<span>Monat</span>
				<input type="text" name="month" value={filters.month} maxlength="2" placeholder="MM" />
			</label>
			<label>
				<span>Jahr</span>
				<input type="text" name="year" value={filters.year} maxlength="4" placeholder="YYYY" />
			</label>
		</div>

		<div class="action-row">
			<button type="submit">Filter anwenden</button>
			<a class="reset-link" href="/overview">Zurücksetzen</a>
		</div>
	</form>
</section>

<style>
	.filter-panel {
		background: #f6f1ff;
		border: 1px solid #e8ddff;
		border-radius: 28px;
		padding: 20px;
		margin-bottom: 24px;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 18px;
	}

	h2 {
		margin: 0;
		font-size: 1.3rem;
		color: #2c2c3a;
	}

	.panel-header p {
		margin: 6px 0 0;
		color: #6f5d8f;
		font-size: 0.95rem;
	}

	.add-button {
		padding: 12px 16px;
		background: #7d4ec9;
		color: white;
		border-radius: 16px;
		text-decoration: none;
		font-weight: 700;
		white-space: nowrap;
	}

	.filter-label {
		margin-bottom: 12px;
		font-size: 0.95rem;
		font-weight: 700;
		color: #4c407d;
	}

	.filter-form {
		display: grid;
		gap: 16px;
	}

	.grid-row,
	.date-row {
		display: grid;
		gap: 12px;
	}

	.grid-row {
		grid-template-columns: 1fr 1fr;
	}

	.date-row {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	label {
		display: grid;
		gap: 8px;
		font-size: 0.9rem;
		color: #4c407d;
	}

	input,
	select {
		padding: 12px 14px;
		border: 1px solid #dcd1f7;
		border-radius: 16px;
		background: white;
		color: #2c2c3a;
		font-size: 0.95rem;
	}

	.action-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: space-between;
	}

	button {
		flex: 1 1 140px;
		padding: 14px 18px;
		background: #7d4ec9;
		color: white;
		border: none;
		border-radius: 16px;
		font-weight: 700;
		cursor: pointer;
	}

	.reset-link {
		flex: 1 1 140px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 14px 18px;
		border-radius: 16px;
		background: white;
		color: #4c407d;
		border: 1px solid #dcd1f7;
		text-decoration: none;
	}

	@media (max-width: 520px) {
		.panel-header {
			flex-direction: column;
			align-items: stretch;
		}

		.grid-row,
		.date-row,
		.action-row {
			grid-template-columns: 1fr;
		}
	}
</style>