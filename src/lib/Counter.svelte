<script lang="ts">
  import Button, { Label } from '@smui/button'
  let count: number = 0
  const increment = () => { count++; }
</script>

<Button on:click={() => {count++}}>
  <Label>count is {count}</Label>
</Button>
