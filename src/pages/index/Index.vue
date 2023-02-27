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
            <p>This is the welcome page of external questions tool. The idea of this tool is that it allows creating custom question types to use for students during tutorials and examinations.</p>
            <p>You can develop your own questions by navigating to the <a href="edit.html">question editor</a>.</p>

            <h3>Demo Questions</h3>
            <p>You can get an idea of some of the features of this tool via the demo questions below:</p>
            <ul>
              <li v-for="demo in demos" :key="demo.name">
                {{ demo.name }} (type: {{ demo.type }})
                &nbsp; &mdash; &nbsp;
                <a target="_blank" :href="'view.html#'+demo.data">student view</a>
                &nbsp; &mdash; &nbsp;
                <a target="_blank" :href="'edit.html#'+demo.data">question editor</a>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    demos: [
      {
        name: 'Sum and Product',
        type: 'coding',
        data: 'eyJ1dWlkIjoiMjcyODhiMjQtNDA4MS00ZTZkLTk4YmUtYjdhZGEyZGM3NDU0IiwidHlwZSI6ImNvZGluZyIsImRlc2NyaXB0aW9uIjoiIyBTdW0gYW5kIFByb2R1Y3RcblxuV3JpdGUgYSBKYXZhIHByb2dyYW0gdGhhdCBhc2tzIHRoZSB1c2VyIHRvIGVudGVyIHR3byBpbnRlZ2VycywgYW5kIHRoZW4gZmlyc3QgcHJpbnRzIHRoZSBwcm9kdWN0IGFuZCB0aGVuIHByaW50cyB0aGUgc3VtIG9mIHRoZSB0d28gbnVtYmVycy5cblxuQW4gZXhhbXBsZSBleGVjdXRpb24gKHdoZXJlIHRoZSBudW1iZXJzIDUgYW5kIDEwIGFyZSBlbnRlcmVkKSBjb3VsZCBsb29rIGFzIGZvbGxvd3M6XG5cbmBgYFxuUGxlYXNlIGVudGVyIHRoZSBmaXJzdCBpbnRlZ2VyP1xuNVxuUGxlYXNlIGVudGVyIHRoZSBzZWNvbmQgaW50ZWdlcj9cbjEwXG5UaGUgcHJvZHVjdCBvZiB0aGUgbnVtYmVycyBpcyA1MFxuVGhlIHN1bSBvZiB0aGUgbnVtYmVycyBpcyAxNSIsImRlZmF1bHRBbnN3ZXIiOiJpbXBvcnQgamF2YS51dGlsLlNjYW5uZXI7XG5cbnB1YmxpYyBjbGFzcyBTdW1BbmRQcm9kdWN0IHtcblxuXHRwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmcgW10gYXJncykge1xuXG5cdH1cbn1cbiIsIm5hbWUiOiJTdW0gYW5kIFByb2R1Y3QiLCJsYW5nIjoiamF2YSIsImZpbGVuYW1lIjoiTWFpbi5qYXZhIiwibWFpbkNsYXNzIjoiTWFpbiIsInJ1blVybCI6IiIsInJ1blRva2VuIjoiIiwidGVzdENhc2VzIjpbXSwiYWxsb3dDdXN0b21UZXN0Ijp0cnVlLCJyZWZlcmVuY2VVcmwiOiJodHRwczovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvOC9kb2NzL2FwaS9pbmRleC5odG1sIn0='
      },
      {
        name: 'Sport Competition',
        type: 'multicoding',
        data: 'eyJ1dWlkIjoiNmU5OTllNGYtYmU5ZC00NmUzLWJiYWItYWY1NTVlYzE2NWRiIiwidHlwZSI6Im11bHRpY29kaW5nIiwiZGVzY3JpcHRpb24iOiIjIFNwb3J0IENvbXBldGl0aW9uXG5cbkluIHRoaXMgZXhlcmNpc2UgeW91IGltcGxlbWVudCB0d28gY2xhc3NlcyB0aGF0IGNhbiBtb2RlbCBhbmQgbWFuYWdlIGRhdGEgZm9yIGEgU3BvcnRzIGNvbXBldGl0aW9uLlxuXG5GaXJzdCB5b3UgbmVlZCB0byBpbXBsZW1lbnQgYSBjbGFzcyBgVGVhbWAgdGhhdCBob2xkcyB0aGUgKm5hbWUqIG9mIHRoZSB0ZWFtLCB0aGUgKmNvYWNoKiBvZiB0aGUgdGVhbSwgYW5kIGEgbGlzdCB3aXRoIHRoZSAqbmFtZXMgb2YgdGhlIHBsYXllcnMqIG9mIHRoZSB0ZWFtLiBGb3IgdGhpcyBwdXJwb3NlLCB0aGUgY2xhc3Mgc2hvdWxkIGhhdmUgYSBjb25zdHJ1Y3RvciB0aGF0IGFjY2VwdHMgdHdvIGFyZ3VtZW50cywgdGhlIGZpcnN0IGJlaW5nIGEgYFN0cmluZ2Agd2l0aCB0aGUgKm5hbWUgb2YgdGhlIHRlYW0qLCBhbmQgdGhlIHNlY29uZCBiZWluZyBhIGBTdHJpbmdgIHdpdGggdGhlICpuYW1lIG9mIHRoZSBjb2FjaCouIEFkZGl0aW9uYWxseSwgdGhlIGNsYXNzIHNob3VsZCBoYXZlIGEgbWV0aG9kIGBhZGRQbGF5ZXJgIHdoaWNoIGFjY2VwdHMgYSBzaW5nbGUgYFN0cmluZ2AgYXJndW1lbnQgd2l0aCB0aGUgKm5hbWUgb2YgdGhlIHBsYXllciogdG8gYmUgYWRkZWQgdG8gdGhlIHRlYW0uXG5cblNlY29uZCwgeW91IG5lZWQgdG8gaW1wbGVtZW50IGEgY2xhc3MgYENvbXBldGl0aW9uYCwgdGhhdCBob2xkcyBhIGxpc3Qgb2YgdGVhbXMgYW5kIHByb3ZpZGVzIGZ1bmN0aW9uYWxpdHkgdG8gcHJpbnQgcmVwb3J0cyBvbiB0aGUgdGVhbXMgYW5kIHBsYXllcnMgaW4gdGhlIGNvbXBldGl0aW9uLiBJdCBzaG91bGQgaGF2ZSBhIHplcm8tYXJndW1lbnQgY29uc3RydWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYW4gZW1wdHkgY29tcGV0aXRpb24uIEl0IHNob3VsZCBhbHNvIHByb3ZpZGUgYSBtZXRob2QgYGFkZFRlYW1gIHRoYXQgYWNjZXB0cyBhIHNpbmdsZSBhcmd1bWVudCBvZiB0eXBlIGBUZWFtYCB0byBiZSBhZGRlZCB0byB0aGUgY29tcGV0aXRpb24uXG5cbkZ1cnRoZXJtb3JlLCB0aGUgYENvbXBldGl0aW9uYCBjbGFzcyBzaG91bGQgY29udGFpbiBhIG1ldGhvZCBgcHJpbnRUZWFtc2Agd2l0aCBubyBhcmd1bWVudHMgdGhhdCBwcmludHMgaW5mb3JtYXRpb24gb2YgdGhlIHRlYW1zIHRvIGBTeXN0ZW0ub3V0YCwgd2l0aCB0aGUgZm9ybWF0IGAqIFtUZWFtIG5hbWVdIChbbnVtYmVyXSBwbGF5ZXJzKSwgY29hY2hlZCBieSBbY29hY2ggbmFtZV1gLCB3aGVyZSBgW1RlYW0gbmFtZV1gLCBgW251bWJlcl1gIGFuZCBgW2NvYWNoIG5hbWVdYCBhcmUgcmVwbGFjZWQgYnkgdGhlIHBhcnRpY3VsYXIgbmFtZSBvZiB0aGUgdGVhbSwgdGhlIG51bWJlciBvZiBwbGF5ZXJzIG9mIHRoZSB0ZWFtIGFuZCB0aGUgbmFtZSBvZiB0aGUgY29hY2guXG5cbkZpbmFsbHksIHRoZSBgQ29tcGV0aXRpb25gIGNsYXNzIHNob3VsZCBjb250YWluIGEgbWV0aG9kIGBwcmludFBsYXllcnNgIHdpdGggbm8gYXJndW1lbnRzIHRoYXQgcHJpbnRzIGluZm9ybWF0aW9uIG9mIHRoZSBwbGF5ZXJzIHRvIGBTeXN0ZW0ub3V0YCwgd2l0aCB0aGUgZm9ybWF0IGBbUGxheWVyIG5hbWVdIChbVGVhbSBuYW1lXSlgIHdoZXJlIGBbUGxheWVyIG5hbWVdYCBhbmQgYFtUZWFtIG5hbWVdYCBhcmUgcmVwbGFjZWQgYnkgdGhlIG5hbWUgb2YgdGhlIHBsYXllciBhbmQgb2YgdGhlIHRlYW0gcmVzcGVjdGl2ZWx5LlxuXG5UaGUgY2xhc3MgYE1haW5gIGFscmVhZHkgY29udGFpbnMgYW4gZXhhbXBsZSBwcm9ncmFtIHRoYXQgbWFrZXMgdXNlIG9mIHRoZXNlIHR3byBjbGFzc2VzLiBJZiB0aGUgY2xhc3NlcyBhcmUgY29ycmVjdGx5IGltcGxlbWVudGVkIGFuZCB5b3Ugd291bGQgcnVuIHRoaXMgYE1haW5gIGNsYXNzLCB0aGUgZmluYWwgb3V0cHV0IHNob3VsZCBsb29rIGFzIGZvbGxvd3M6XG5cbmBgYFxuTGlzdCBvZiBUZWFtc1xuKiBQdXJwbGUgS2l3aSdzICgzIHBsYXllcnMpLCBjb2FjaGVkIGJ5IEZhbm55IEZhblxuKiBHb2xkZW4gTWVsb25zICg0IHBsYXllcnMpLCBjb2FjaGVkIGJ5IFRvbW15IFRob21hc1xuXG5MaXN0IG9mIFBsYXllcnNcbkFsZXggUGF0ZWwgKFB1cnBsZSBLaXdpJ3MpXG5BbWlyYSBMZWUgKFB1cnBsZSBLaXdpJ3MpXG5MdWNhIFNpbmdoIChQdXJwbGUgS2l3aSdzKVxuTWFyaWEgR2FyY2lhIChHb2xkZW4gTWVsb25zKVxuTW9oYW1tZWQgS2ltIChHb2xkZW4gTWVsb25zKVxuV2VpIENoZW4gKEdvbGRlbiBNZWxvbnMpXG5BbmEgUm9kcmlndWV6IChHb2xkZW4gTWVsb25zKVxuYGBgIiwiZGVmYXVsdEFuc3dlciI6bnVsbCwibmFtZSI6IlNwb3J0cyBDb21wZXRpdGlvbiIsImxhbmciOiJqYXZhIiwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiTWFpbi5qYXZhIiwiY29udGVudCI6InB1YmxpYyBjbGFzcyBNYWluIHsgXG5cblx0cHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nIFtdIGFyZ3MpIHtcblx0XHRUZWFtIHRlYW0xID0gbmV3IFRlYW0oXCJQdXJwbGUgS2l3aSdzXCIsIFwiRmFubnkgRmFuXCIpO1xuXHRcdHRlYW0xLmFkZFBsYXllcihcIkFsZXggUGF0ZWxcIik7XG5cdFx0dGVhbTEuYWRkUGxheWVyKFwiQW1pcmEgTGVlXCIpO1xuXHRcdHRlYW0xLmFkZFBsYXllcihcIkx1Y2EgU2luZ2hcIik7XG5cblx0XHRUZWFtIHRlYW0yID0gbmV3IFRlYW0oXCJHb2xkZW4gTWVsb25zXCIsIFwiVG9tbXkgVGhvbWFzXCIpO1xuXHRcdHRlYW0yLmFkZFBsYXllcihcIk1hcmlhIEdhcmNpYVwiKTtcblx0XHR0ZWFtMi5hZGRQbGF5ZXIoXCJNb2hhbW1lZCBLaW1cIik7XG5cdFx0dGVhbTIuYWRkUGxheWVyKFwiV2VpIENoZW5cIik7XG5cdFx0dGVhbTIuYWRkUGxheWVyKFwiQW5hIFJvZHJpZ3VlelwiKTtcblxuXHRcdENvbXBldGl0aW9uIGNvbXBldGl0aW9uID0gbmV3IENvbXBldGl0aW9uKCk7XG5cdFx0Y29tcGV0aXRpb24uYWRkVGVhbSh0ZWFtMSk7XG5cdFx0Y29tcGV0aXRpb24uYWRkVGVhbSh0ZWFtMik7XG5cdFx0XG5cdFx0U3lzdGVtLm91dC5wcmludGxuKFwiTGlzdCBvZiBUZWFtc1wiKTtcblx0XHRjb21wZXRpdGlvbi5wcmludFRlYW1zKCk7XG5cdFx0U3lzdGVtLm91dC5wcmludGxuKCk7XG5cdFx0U3lzdGVtLm91dC5wcmludGxuKFwiTGlzdCBvZiBQbGF5ZXJzXCIpO1xuXHRcdGNvbXBldGl0aW9uLnByaW50UGxheWVycygpO1xuXHR9XHRcbiBcbn0iLCJyZWFkT25seSI6ZmFsc2V9LHsiZmlsZW5hbWUiOiJDb21wZXRpdGlvbi5qYXZhIiwiY29udGVudCI6InB1YmxpYyBjbGFzcyBDb21wZXRpdGlvbiB7XG5cblxufSJ9LHsiZmlsZW5hbWUiOiJUZWFtLmphdmEiLCJjb250ZW50IjoicHVibGljIGNsYXNzIFRlYW0ge1xuXG5cblxufSJ9XSwibWFpbkNsYXNzIjoiTWFpbiIsInJ1blVybCI6IiIsInJ1blRva2VuIjoiIiwidGVzdENhc2VzIjpbXSwiYWxsb3dDdXN0b21UZXN0Ijp0cnVlLCJyZWZlcmVuY2VVcmwiOiJodHRwczovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvOC9kb2NzL2FwaS9pbmRleC5odG1sIn0='
      },
      
    ]
  })
};
</script>
