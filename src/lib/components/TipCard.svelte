<script>
	let { title, text } = $props();
</script>

<div class="tip-card">
	<h3>{title}</h3>
	<p>{text}</p>
</div>

<style>
	.tip-card {
		padding: 16px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		margin-bottom: 12px;
	}

	h3 {
		margin: 0 0 8px 0;
		color: #7d4ec9;
		font-size: 1.1em;
	}

	p {
		margin: 0;
		color: #2c2c3a;
		line-height: 1.5;
	}
</style>