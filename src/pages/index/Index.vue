<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <h3>External Questions</h3>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h3>External Questions</h3>
            <p>This is the welcome page of external questions tool.</p>
            <p>You can play around with it by navigating to the <a href="edit.html">question editor</a>.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
};
</script>
