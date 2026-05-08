<script>
	let { icon, title, text, color = '#f3ebfb', featured = false } = $props();
</script>

<article class="tip-card" class:featured>
	<div class="tip-icon" style="background: {color}">
		<span>{icon}</span>
	</div>
	<div class="tip-content">
		<h3>{title}</h3>
		<p>{text}</p>
	</div>
</article>

<style>
	.tip-card {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 16px;
		background: white;
		border: 1.5px solid #e6e0f4;
		border-radius: 16px;
		transition: box-shadow 0.15s;
	}

	.tip-card.featured {
		background: #faf7ff;
		border-color: #7d4ec9;
		box-shadow: 0 4px 16px rgba(125, 78, 201, 0.12);
	}

	.tip-icon {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
	}

	.tip-content {
		flex: 1;
		min-width: 0;
	}

	h3 {
		margin: 0 0 5px;
		font-size: 0.95rem;
		font-weight: 700;
		color: #20182f;
		line-height: 1.3;
	}

	p {
		margin: 0;
		font-size: 0.875rem;
		color: #6b5a7a;
		line-height: 1.5;
	}
</style>
