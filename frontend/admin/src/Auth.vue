<script setup lang="ts">
  const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH
</script>

<template>
  <div className="center">
    <form :action="API_BASE_URL + '/login'" method="post">
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input name="password" type="password" class="form-control" id="password" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped>
  .center {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100vh; /* Make the container full viewport height */
  }
</style>
