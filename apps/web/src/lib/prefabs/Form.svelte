<!-- src/lib/prefabs/Form.svelte -->
<script lang="ts">
  import type {Field} from "$lib/constants.ts";
  export let fields: Field[] = [];
  export let formData: Record<string, any> = {};
  export let onSubmit: (data: Record<string, any>) => void = () => {};

  const handleChange = (e: Event, name: string) =>
    (formData[name] = (e.target as HTMLInputElement).value);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(formData);
  };
</script>

<form class="form" on:submit={handleSubmit}>
  {#each fields as f}
    <label class="field">
      <span class="label">{f.label}</span>

      {#if f.type === 'textarea'}
        <textarea
          id={f.name}
          placeholder={f.placeholder}
          on:input={(e) => handleChange(e, f.name)}
        />

      {:else if f.type === 'select'}
        <select id={f.name} on:change={(e) => handleChange(e, f.name)}>
          {#each f.options || [] as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>

      {:else}
        <input
          id={f.name}
          type={f.type || 'text'}
          placeholder={f.placeholder}
          on:input={(e) => handleChange(e, f.name)}
        />
      {/if}
    </label>
  {/each}

  <button type="submit">Submit</button>
</form>

<style>
  .form {
    display: grid;
    gap: .75rem;
    max-width: 300px;
    margin: auto;
    padding: 1rem;
    border-radius: .75rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    font-size: .9rem;
    margin-bottom: 10px;
  }

  .label {
    color: white;
    font-family: fantasy;
  }

  input, textarea, select {
    padding: .5rem;
    border: 1px solid #ccc;
    border-radius: .5rem;
    font-size: .9rem;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255,255,255,0.1);
    font-family: fantasy;
    color: white;
  }
  input:focus {
    border-color: #ffffff;
    outline: none;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  button {
    padding: .6rem;
    border: none;
    border-radius: .5rem;
    background: #2563eb;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    width: 40%;
    display: block;
    margin: 0 auto;
  }
  button:hover { background: #1e4fd1; }
</style>