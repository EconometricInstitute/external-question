<template>
    <div class="displayEnv">
        <ul v-if="data">
            <li v-for="[varname, value] of Object.entries(data)" :key="varname">
                <div class="variable">
                    <template v-if="compare">
                        <v-icon v-if="compare[varname]" color="success">mdi-check</v-icon>
                        <v-icon v-else color="error">mdi-alert-circle</v-icon>
                    </template>
                    A variable with name <code class="varname">{{ varname }}</code>
                    which holds
                    <ValueDisplay :data="value" />
                    <template v-if="compare && !compare[varname]">
                        but for which the expected value is
                        <ValueDisplay :data="reference[varname]" />
                    </template>
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
      'data',
      'reference',
      'compare'
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
    display: inline;
}
</style>