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
        data: 'eJxtUu-LGjEQ_VeG7Zc70F0VrdZ-KOK3QuFASz_cHjgms5qaTZb8OO8Q__dOdldOjkIgM_NeXt5kcskafNcWZba8ZDEq3rPJfLJY7CfT4XS0GA-n9FUOvy32NNzPUeJEivl0Ns0GWXhviNnCSmUOnEvywqkmKGu4_AU2sQY0Ep6clVGE0pTmj1OBAOEnviI0zh4c1hCOGAD9yXNEED05CBbIhBScLSiODuT8oFVjjoFKOR9YgKHuVNPd8cG4wzz7sFUbJjkT6z2r5cnPygC9Yd1o4p1ETN7h4XwkRy2_58KsFR6PABlonZF8BGGjlqCtPbF9qKzW9uyXSXe325XmSRN6ujXCap3rvp0fpZn9h-NJWL7qgzQelWZ712Hfyc2ZYnM9467PO3Q8a0dTYdRhZfyZHA9H1Y11Af7yGHJuWucbgcaQ-57MN3GvlQCh0fs0xJWR_QjhkvAy9AwfMPD2apWEGpV52AR-9QM8v_A7HfzjjX4tDS-2YbBOP-bTx2BAI_-gZZb8cFYpTT31F8vmfTldsU6m-jqXXDS_nea8i7f2RKbLAvmw5qdl8vPLIMM0m3X0wdZbRrJlcJH4DFU8SiOoUzmG0PhlUUgrfG4dCk25sHWRDHgqFi1QYKMKZSS95cdQ6-x6_QcRuSPd'
      },
      {
        name: 'Sport Competition',
        type: 'multicoding',
        data: 'eJydVm1P5DYQ_iuj9EMXtCw67kBlq35ASJxOByoqVP3AImU2mSUujh3ZDsse4r93bOeV5aWtkJYk8_7MM2M_JRVupMY8mT8ldS34f3JEx8fH9GW1t6TjfO_LEX3eWy5xuYerw8NDyj4dHebLZJq4TUWsXdbSiUznQt3xx5xsZkTlhFYs-wmuKm0cnOqyIif81wX_fVPgCmGBHslkwhJsdA2irCSVpBy4tYZMorVkWQ8dZKig1DlJQJVDiQrvCHJ0CCttAGMQC1kfZebDnAljXfCtiHJwehADYwRIrwnLNIYptMx9RIJdhSXtgl6FN8cq0_g905gVLwQ-JwQpONZauKJ3YFu9SuKGjB3ZzeCMcw8wVLWptKUYIqZlC13LHAp8IJ-qVtaZOnPBgjPFLKOKK_ZIobmrfUk22q9C0UvidrBleuUMP6UvMhsmshsr8K-WOFL-b40jFjM4yfOAOUq5ebuGklyhc0gxzy8DHOy2EFnR1YJgOZikPmxb2RvxI6q7vq9LjpDnsccdwJ4CV6Gi6UckGPAznQ7J0PTVR2SXNiBVGf0gmOewqlUWCxdu4z1XnLcDQ5GOWnW5NIaRBiBUg19PV_jmXuD1g4ze6xDYYoAfCa66trGmzBA6NlNAZcXJvOEbpdVt_uOeDMZgqyFdFh4GHvpuaLaB3xrB2vBnU2rT0HsE9ZgoXKNDxqbPK-DpY9mGg2pA95hsUPGQ8iYo0Xsdctv6vNKrjXVUznTtuLkdl6IBpLtw40OAp9YtTG5UXS7J3Lbd2plGonONyw3chOeo651xbVzTwAF_TFsXaeh6OrLh_MkzRGIWPQYmo-EVWks08HI6I2rRof_ecmig0o3v1nA2W3Awmf8d_jis_6cBbaoft-AmBula0MO5k3YYD3VaZAe4vwrs9roIhkPwDNmKeIwfSG4CXtfdAksvGA92LHm48k0LkA1T9oh-i_hZujPsJUBR4j1vBR7JJgA_DI4ynsNVvx1Z0SecaWM4utz0W4mz9zn6jbUOjTF1c1w2-QT7dtlzb4FRrepuxqXW94C8nbSUem3nvqY0TRfqvNlkYaAWahcu-dzhGr6LtfjZwuTz65Q_Q6XCrzf5yluRFFyQ5IUEky-vm1zrsuTfQpdoffg2csOlhTqR9AiXvLEkTEZZ7LCsFAbhnGhbdF5nfNjzUiq2ZRdoBMJX5AsFwmSUp5fqAsuSs_suym3pXyTgtOAvW5IThfCHzo24q-nHtphxDXeeFfIl6ETZNZlkrmopp4mnHt-AmqvJYOzYQCLflebJ3_iA_LYSkmwyv3kKT42db_WsUfDEY2Lw16peSpE19PQq8AQe4IVrJNbxCGbwoIW_Jwk1iWcp3Nz6ubU78OSVF2GpBv5_gt_4YFwHUkwWyQjVRTKFRdL3P9n5NVoHw1l3krNd39B3tdrWvqfUN7nRGid8ME541JGY8Ih9o0AHo0BDxryrN-DOe3oti97TGfFpWN-AIMNDtCl2IJ20zodHbXOATwKaHykctArxt1_Ns7DLpfJNGO2K5DWX_eHcpfSKq3dEfZR2L7wdp9Fo3D373Jn4zzwcfjf_ruQmma_4dkPP09EYDYD7YJqGDXgKXWH3L7z5aj9wE3ja2AcPt9PED-KplzZz7bOu1Z9G8nt8vtb3pOKbI-tO0YaNwLbol_hpbZ0ur1mSzPkWSL7qFZ-KKqPopXCusvP9_VxndqYNZpJmjOG-z9XS_i9BsI-V2Bcqp8dZ4UqZPD__Ay_P--Y'
      },
      {
        name: 'Break Even',
        type: 'blockly',
        data: 'eJzlWm1z2jgQ_isatx_SlCRA3gnpTF7cljkSbgjJXee4IcLI4Its-Sw5gcnw328l2WCTxLg5yNEeTIIl7a722ZVWK1mPho9HlOGeUXk0wtCBX6O0be9tF3Fxw8b7Bxs7pcPDjQO7Z2_sdfeL5NDqkvJO0SgYYuQToO5SZt3REVT0CLcCxxcO86D-HToNCL5D5j3x2vCteUgMHI7IkASWw0kBjViIBvieIMGQxVw_FPA4IKir-AjwIZ85nuAF1HdkSTau286Q9ICeC76OmI38gPVCy_H6CEfPoqAp73Hg4C4lMbHNggQ18wgKPUdIGZJ8wou9nubnhFJJ6QeORdZn6DZRCwp9hikCUM8h2JgiKKCHgWMNFKWU_HeIPeGIkRIqlZD1WCA35AJ1CeKM9qRMF99BIQy0VMeDPogUQkAAlQSyWqHblCY-g25BA4xOtU-krv0Au1o4tiziCx6JAl3RrbLlrTKMrE2YtpAkiw05pUybdmKyiF4abkrLMSVcEW6ib-DyWCk-YCHA1PbUCFkopICJ9NvYULcagsU8gR2PJ-TGFGDGHgkiOz83iqTdoMoakJ4yVusZPyELe9L-kS97KORyACjbMErZgywBLjekuCKFvH_fbgsyFI-xGmN0jNptO8DWY9SijDoeP65FZWmcMdpAUTHGOv4wBmGe_qrJZOOQihOPP5DAqHghpQXDw66cctOJBYRkiF2fkpo0vZzEqj-jUtorGLFso1IuGLJfo7IznnA0lLElS6y8UTmAZsEY7bIh9FMdujC6e8ftuK5tIC5GlEBNz-E-xaMK8mAitY1PbQ_Bp2rBAOyzYKTZoFRnfccCPotRFgZQVy4VoSiRQCFqjbiBX0UTJEOLZAd3B4zyjmMDTXVLNb5AS6WkjnQcDkhOauaTAMtwlZPeI32Al5O4CyYjOLdo8G9OUkECDwejJ9TVrdj4Gc5gPk86o1ROOUO1znNGQHwIMx0YvAlaoL7HNCSxrFbtwrxKtQMFH-Aee4gFulgMALfbJcEMIZDaDoHYEAm7vL4AilKxuqWq00K3tNSkJltKlSmOTKNOcEHooOQaJsJ8R0x4IBZkGOFzs3GxYBu80gRP3NNYEd_MKnb6bTUMlt__Jiwp3zFgYBHpcAET0yWQ2bxmEl-ACVIBdTsxh3XjC1qkjZetsaKF9UMMXCJSMXrWZSer4bEnI2k11MphZZljUJJhYa3BAsEcLg-MCJz-W0LZ2V0eFpi1MFU9kW-yaKU7kM9CWiFG2UY4NZudVqNz9tU8-2WxBlnOKqntMcBeP2ugnpv11oqEgxxwAgZ7hrccq9ubS0TjwjaKsizn1G5q5-bl-WIx7e0sKF5L9a4azRXJS_JGhwC2oxk2vzmpX5uLhbS7qFSr3vhtNabqrGJfa1--LnoYLHEcBNjrMbfjeFn7of_TVmD5toYsGj9dlXPkzi21a03sf_cSuXMrvaVNdy90Y7aOkqjzF3Pm7_oVJfZ9krkCtczfW9nemaj1L62r9KHE66e2D68IZ2L2XODpOIlQ4a61lIGioDjcdP3MJGyhWJYIxOuRYcP-XiApQfE5IO_0yTxANydyCZZdP48prfD88PK5Ni_jWJERA8ltcJIVwlfLzjkQgRJXYRdyFNhfZuC6ajVrl19-JGB6H3KGedZeJHfs_K8HHvjH_Rlw-EF2CvQDAWGwdsw74F5BNHneADhcpN4AlJMZUNT6gnGobO1Y6iVj58GZzRTcUKiXKcgRxOVAX1QLY1yd0wPPdZKHQ7-VeMvd_HIOnjSaSSaWh3ia6-ShhghekznFG690svNlLAgaFJ8Pql67ejJhVxqTXr7l88-EivvUyQJ0btZrcyZq_sBaWOIU5Sx41Rb0TEXeVAhORGDZGrwYgTVLx3esuxyvcCJqvWfOTd3vZninaS74-PD1pwWzqn1pmublih61nS78FHBZ78LVGIBwkXkscdaoN66bpWxEs2M1C5MWCETvbLtYXNiQ0GLLy9BzGz62vSA9myet2oJP4Yqbi0lPngY0Tnx53AT_X4pwN_GSkwxy2-ottRVywVy91NROTuvmNPIluD7lCKOfQ8-SaWU6mT1MdfJrs3Fmnl83E70k2GZ7qW4NXfpJXmwkXMjN5ZW6zWhUDDtiQrCEtqJGvvYBPU6tqF4GxJfRHMLRMfpju4B2C2i_gEpF-IPH8v6fR5KlLdpCM1hSkqR9bOuLW22jgkp7BTRduGVNWVbIC1yysDPWUvRH3rJbo0SgnmPbx6Uj9Yuq6EA_ffyYUrMtNEOkrrx-ONU5RYmedBArdFw-mt7Qqx6j3WlxprfkR_coMQDcCb1U8SiLQV9JPAZV19HLxMqMm37IB2v6vl1h0kVB9Tn-8BzjeKYuUU48BkSEgaf7ACljdTnPclxMuVEpjcf_AAHu4Xs'
      }
    ]
  })
};
</script>
