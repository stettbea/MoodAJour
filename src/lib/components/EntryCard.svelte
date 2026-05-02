<script>
let { entry } = $props();
</script>

<div class="entry-card">
<div class="entry-top">
<h3>{entry.was || 'Unbekannt'}</h3>
<div class="mood-badge">{entry.stimmung || 5}</div>
</div>
<div class="entry-meta">
<span>{entry.wann || 'Unbekannt'}</span>
<span>{entry.kategorie || 'Unbekannt'}</span>
</div>
<p>{entry.beschreibung || 'Keine Beschreibung'}</p>
<div class="actions">
<button>Bearbeiten</button>
<button>Löschen</button>
</div>
</div>

<style>
.entry-card {
padding: 18px;
background: #faf7ff;
border: 1px solid #ece6f2;
border-radius: 20px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.entry-top {
display: flex;
justify-content: space-between;
align-items: center;
gap: 12px;
}

h3 {
margin: 0;
font-size: 1rem;
color: #2c2c3a;
}

.mood-badge {
min-width: 42px;
padding: 10px 12px;
border-radius: 14px;
background: #7d4ec9;
color: white;
font-weight: 700;
text-align: center;
}

.entry-meta {
display: flex;
flex-wrap: wrap;
gap: 12px;
font-size: 0.9rem;
color: #5e4e8b;
margin: 10px 0;
}

p {
margin: 0;
color: #2c2c3a;
line-height: 1.6;
}

.actions {
margin-top: 14px;
display: flex;
gap: 10px;
}

button {
flex: 1;
padding: 12px 14px;
background: white;
color: #4c407d;
border: 1px solid #dcd1f7;
border-radius: 14px;
cursor: pointer;
font-weight: 700;
}

button:hover {
background: #f3ebfb;
}
</style>
