<template>
    <div class="displayEnv">
        <ul v-if="data">
            <li v-for="[varname, value] of Object.entries(data)" :key="varname">
                <div class="variable">
                    A variable with name <code class="varname">{{ varname }}</code>
                    which holds
                    <ValueDisplay :data="value" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ValueDisplay from './ValueDisplay.vue';

export default {
    name: 'EnvironmentDisplay',
    props: [
      'data'
    ],
    components: {
      ValueDisplay
    },
  };
</script>
  
<style scoped>
.varname {
	font-family: monospace;
	font-weight: bold;
	font-size: 130%;
	background-color: whitesmoke;
    padding: 0;
}
</style>