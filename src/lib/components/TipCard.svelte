<script>
	let { title, text } = $props();
</script>

<article class="tip-card">
	<div class="tip-text">
		<h3>{title}</h3>
		<p>{text}</p>
	</div>

	<div class="tip-visual" aria-hidden="true">
		<div class="shape triangle"></div>
		<div class="shape circle"></div>
		<div class="shape square"></div>
	</div>
</article>

<style>
	.tip-card {
		display: grid;
		grid-template-columns: 1fr 96px;
		overflow: hidden;
		background: #f7f3fc;
		border: 1px solid #d9c8f3;
		border-radius: 14px;
		box-shadow: 0 8px 18px rgba(125, 78, 201, 0.06);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.tip-card:hover {	
		box-shadow: 0 12px 26px rgba(125, 78, 201, 0.1);
	}

	.tip-text {
		padding: 16px 14px;
	}

	h3 {
		margin: 0 0 8px;
		color: #20182f;
		font-size: 1.05rem;
		font-weight: 700;
	}

	p {
		margin: 0;
		color: #2c2c3a;
		font-size: 0.92rem;
		line-height: 1.45;
	}

	.tip-visual {
		position: relative;
		background: #efe6f9;
		border-left: 1px solid rgba(125, 78, 201, 0.14);
	}

	.shape {
		position: absolute;
		background: #d6c4f0;
		opacity: 0.65;
	}

	.triangle {
		width: 0;
		height: 0;
		background: transparent;
		border-left: 13px solid transparent;
		border-right: 13px solid transparent;
		border-bottom: 24px solid #d6c4f0;
		top: 34px;
		left: 32px;
		transform: rotate(8deg);
		opacity: 0.65;
	}

	.circle {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		top: 64px;
		left: 24px;
	}

	.square {
		width: 23px;
		height: 23px;
		border-radius: 6px;
		top: 63px;
		left: 52px;
		transform: rotate(4deg);
	}

	@media (max-width: 360px) {
		.tip-card {
			grid-template-columns: 1fr 78px;
		}

		.tip-text {
			padding: 14px 12px;
		}
	}
</style>