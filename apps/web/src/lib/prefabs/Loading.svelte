<!-- src/lib/Loading.svelte -->
<script>
  export let message = "Loading...";
</script>

<div class="loading-overlay">
  <div class="spinner"></div>
  <p class = "message">{message}</p>
</div>

<style>
  .message {
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(21, 21, 21, 1);
    color: white;
    z-index: 9999;
  }

  .spinner {
    border: 4px solid rgba(255,255,255,0.2);
    border-top: 4px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
