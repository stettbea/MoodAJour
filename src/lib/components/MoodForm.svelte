<script>
  let { values = {}, buttonText = '+ Hinzufügen' } = $props();
</script>

<form method="POST" class="mood-form">
  <div class="field-pair">
    <label>
      Was?
      <input type="text" name="title" required value={values.title ?? ''} />
    </label>
    <label>
      Wann?
      <input type="datetime-local" name="date" required value={values.date ?? ''} />
    </label>
  </div>

  <div class="field-pair">
    <label>
      Personen
      <input type="text" name="persons" value={values.persons ?? ''} />
    </label>
    <label>
      Kategorie
      <select name="category" value={values.category ?? ''}>
        <option value="">Bitte wählen</option>
        <option value="Arbeit">Arbeit</option>
        <option value="Freizeit">Freizeit</option>
        <option value="Familie">Familie</option>
        <option value="Gesundheit">Gesundheit</option>
      </select>
    </label>
  </div>

  <div class="range-row">
    <span>Stimmungsskala</span>
    <span>1–10</span>
  </div>
  <input class="range-input" type="range" name="mood" min="1" max="10" value={values.mood ?? 5} />

  <label>
    Beschreibung
    <textarea name="description">{values.description ?? ''}</textarea>
  </label>

  <button type="submit">{buttonText}</button>
</form>

<style>
.mood-form {
display: flex;
flex-direction: column;
gap: 16px;
padding: 22px;
}

.field-pair {
display: grid;
gap: 12px;
}

label {
display: flex;
flex-direction: column;
font-weight: 600;
color: #2c2c3a;
}

input,
select,
textarea {
margin-top: 8px;
padding: 14px;
border: 1px solid #e6e0f4;
border-radius: 16px;
font-size: 15px;
background: #faf7ff;
}

textarea {
resize: vertical;
min-height: 100px;
}

.range-row {
display: flex;
justify-content: space-between;
font-weight: 700;
color: #4c407d;
}

.range-input {
width: 100%;
margin-top: 6px;
}

button {
padding: 14px;
background: #7d4ec9;
color: white;
border: none;
border-radius: 16px;
font-weight: 700;
cursor: pointer;
}

button:hover {
background: #6940b4;
}

@media (min-width: 520px) {
.field-pair {
grid-template-columns: 1fr 1fr;
}
}
</style>
