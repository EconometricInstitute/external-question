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
        data: 'eJzlWm1z2jgQ_isatx_S1EmAvBPSmbzQljkSOoTkrnPcEGFk8EW2fJacwGT477eSbLBJYtwc5OgdTIIl7a722ZVWK1mPho9HlOGeUX40wtCBX6O4be9tF3Bhw8b7Bxs7xcPDjQO7Z2_sdfcL5NDqktJOwTANMfIJUHcps-7oCCp6hFuB4wuHeVD_Dp0GBN-h6j3x2vCteUgMHI7IkASWw4mJRixEA3xPkGDIYq4fCngcENRVfAT4kM8cT3AT9R1Zko3rtjMkPaDngq8jZiM_YL3Qcrw-wtGzMDXlPQ4c3KUkJrZZkKBmHkGh5wgpQ5JPeLHX0_ycUCop_cCxyPoM3SZqQaHPMEUA6jkEG1MEJnoYONZAUUrJf4XYE44YKaFSCVmPBXJDLlCXIM5oT8p08R0UwkBLdTzog0ghBARQSSCrFbpNaeIz6BY0wOhU-0Tq2g-wq4VjyyK-4JEo0BXdKlveKsPI2oRpzSRZbMgpZdq0E5NF9NJwU1qOKeGKcBN9B5fHSvEBCwGmtqdGyEIhBUyk38aGutUQLOYJ7Hg8ITemADP2SBDZ-blRJO0GVdaA9JSxWs_4CVnYk_aPfNlDIZcDQNmGUcoeZAlwuSHFZSnk_ft2W5CheIzVGKNj1G7bAbYeoxZl1PH4cS0qS-OM0QaKijHW8YcxCPP0V00mG4dUnHj8gQRG2QspNQ0Pu3LKTScWEJIhdn1KatL0chKr_oxycc80YtlGuWQasl-jvDOecDSUsSVLrLxRPoBmwRjtsiH0Uxm6MLp7x-24rm0gLkaUQE3P4T7FozLyYCK1jU9tD8GnYsEA7LNgpNmgVGd9xwI-i1EWBlBXKhagKJFAIWqNuIFfRRMkQ4tkB3cHjPKOYwNNZUs1vkBLpaSOdBwOSE5q5pMAy3CVk94jfYCXk7gLJiM4t2jwb05SQQIPB6Mn1JWt2PgZzmA-TzqjWEo5Q7XOc0ZAfAgzHRi8CVqgvsc0JLGsVu2iepVqBwo-wD32EAt0sRgAbrdLghlCILUdArEhEnZ5fQEUxUJlS1WnhW5pqUlNtpQqUxyZRp3ggtBByTVMhPmOmPBALMgwwudm42LBNnilCZ64p7EivplV7PT7ahgsv_-rsKT8wICBRaTDBUxMl0Bm85pJfAEmSAXU7cQc1o0vaJE2XrbGihbWDzFwiUjF6FmXnayGx56MpNVQK4eVZY5BSYaFtQYLBHO4PDAicPpvCWVnd3lYYNbCVPVEvsmile5APgtphRhlG-G02uy0Gp2zr9WzXxZrkOWsktoeA-z1swbqebXeWpFwkANOwGDP8JZjdXtziWhc2EZRluWc2k3tvHp5vlhMezsLitdSvatGc0XykrzRIYDtaIbNb07q19XFQtpdVKpVb_y6GlN1VrGvtS9fFz0MljgOAuz1mNtxvKz90P9pK7B8W0MWjZ-uyjly55batSb2v3uJ3LmV3tKmuxe6MVtHSdT5kznzd_2KEvs-yVyBWtXfWtnemaj1D62r9KHE66e2D68IZ2L2XODpOIlQ4a61lIGioDi86vqZSdhCsSwRiNcjw4b9o0BSguJzQN7pk3mAbk7kEiy7fh5TWuH54eVzbV7GsSIjBpLb4CQrhK-WnXMgAiWuwi7kKLC_zMB11WrWLr_8TMD0PuQM86y9SO7Y-W8PPPCP-1_A4QfZKdBPBITB2jHvgHsF0eR5A-BwkXoDUEpmQFHrC8ahsrVjqZeMnQdnNlNwQ6FepiBHEJcDfUEtjHF1Tg8810keDv1W4i1388s5eNJoJplYHuJprpOHGiJ4TeYUb7zSyc6XsSBoUHw-qHrt6smEXWlMevmWz_8lVNynThag82q9Nmei5g-s5hKnKGfBq7agZyrypkJwIgLL1uDFCKxZOr5j3eV4hRNR6z1zbup-N8M7zeqCjw9ff1owq9qXZrV6uaJHbacLPwVc1rtwNQYgXGQeS5w16o3rZjEb0exYzcKkBQLRO9suFBY2JLTY0jL03IaPbS9Iz-ZJq7bgU7jC5mLSk6cBjRNfHjfB_5ci3E285CSD3LZ6S22FXDBXLzW1k9N6dRr5ElyfcoTRz6FnybQyncwepjr51mycVc-vm4leEmyzvVS2hi79JC82Ei7k5vJK3WY0yoYdMSFYQltRI1_7gB6nVlQvA-LLaA7h6Bj9vm2iXRPtm6hYgD94LO3_cSRZ2qItNIMlJUnax7a-uNU2yqi4Z6Lpwi1rSrJCXuCShZ2xlqI_8pbdGiUC9RzbPi4eqV9UQQf66ePHlJptoRkideX1w6nOKUr0pINYoePS0fSGXuUY7U6LM70lP7pHiQHgTuilikdZDPpK4jGouo5eJlZm3PRDPljT9-3MSRem6nP84TnG8Uxdopx4DIgIA0_3AVLG6nKe5biYcqNcMI0B5oNvAYF-YagMDV1RVwm8vExbiGqaxOeybIzHfwOPVfCk',
      },
      {
        name: 'List Threshold',
        type: 'blockly',
        data: 'eJzlWm1T4zYQ_isa90s7EyAvvF1Kb4aXcJdpIDch0HaOm6DYcqKeLbmSfJBh-O9dSSaJE-IYcGjuys1wWNpd7fNotVrJvnciPAo49pz6vRPHFP53KtX-3l51b3-jVnGrG9t73s7Gfq3ib7j93VrV2625xN13So4aRQSk-wF3vwYjaPCIdAWNFOUM2n9CLSoV6g4FkUMeeNfsmrV9RRiiCnHXjYVEaogVuiVoQBRSHPG-JOIbQRgFWhUzDw0xPEOXR1zqEXQ7pO4QkYCEhCmJKAMTxEpHWErQdIlQGNr7WJSMBavCGZHI44hxtak9ORYEKz3SkXUfRYIPBA6tS9h1SaS0uW9YUNwPCLphcdgnQt4gDYaywaOX3EdJlx0Poxv1iPkG9IOYbKKmQtAQB572l-nBvNglKfvaf-I9Zb7PeUAwk9aYRLdUDQ1uiUOSDK7lxrRgabopi2JlrYy934QJIRNJ0BoPnDjYB1-UiMkNor4x43IBcCLOjFuJqqZ-QgmVaGAIFZo_hrhA5J8YB3rmtIk5RgxTNz4OJIzDQUTcUgk86ak5jYVuCLkgJTTisRjPTeLhmD0YKFYa44RFl8dM3dhZpOCxC05J4PQWhZiNNF7tDwAQlJj4GcPHAgINcG-aSPZxHKhDJm-JcOosDoKSw4BtiOt0VIMwucNhFJCmZluvooQVp_55r7Rd2i1VyqWdL7Bcxir1nYexVtsA0GrWD9DSTpQMNSXz5_gXGDHwnPo2GFAQFX1-Bx4d3IUBot5v149t1w6SahQQaPGojAI8qkPgM3LtvL9mCH4ONC0DLkZWDZ5afEBd0HN5AIxDW7VShkeNGR6S3kQb9M2iRzoDaHUOdPJA9qgPMgdbpnOBbKAt9VweRsB3TmkeEYF1Vskpz8gA4OUUThZXXtMQCTlFYTEwLEZz0gdbj-RnTAaP5PRkVKqpyTC9yyZDkAhWZI_cqSlZkLbrL7HVbZ41LlL9ICGH2IMFkxgMsRr2bEzPCIKoTwksyMTY-eUZSFTKB1umOW10y1qd9mTLuDLBkUnqGBfk84BcMkWXT8RYx-cig4TTTvusYA5eSMHc9LTXZG5mHTv6az0Iyz__DewOnxEwAb_tSQUL0-yTL1nEZ0BBKqHWptaw7VzgRZq8bI-NLOx-ahgSlcrRs1N2uB4zNhdJ6-FWDpYllD8ByWDYelAgmHerAwP1z-AtoWzvrA4LrFpYqkzlWyzW6R4UkVBWqFE2CUeNTq_b7h1_bBz_Xiwhq9klLR9Qgg-yAvWk0equSTrIAUdAzeu9ZazWNleIJoSzS8CzJqd51TxpnJ8Ui2l3u6B8rd27aHfWpC7Jmx0EpiyD86vD1mWjWEg7RZVarfYf67FUZx372PzwsegwWGEcCMw8HvYoyzoP_Z-OAqvnGqpoPL8r56idu-bUOnX-3Z2qnbvpI216eGU7s33UQr2_OV1-6jeSOIpI5g7UbfzZzZ6dsVuvZNf4ExA2SB0fXpDO1Oy9wHycJKhw311JoBgoVDbCKLMIKxTLCoEwj9y1_ecCSRl6vMWUvQFZBujqUG_BeuinMaUdXp5eTpvLKo41iRgobsVhVgpfL55zIAInLuI-1ChwvszAddHtNM8_fE_A7DnkGMuss0ju3PlfBx7MT_gj4IhEdgn0HQHhsHcsu-BeQzR53gBQqVJvAKrTFVDSu4Ac_cJP9lzzPq6n3xWm6QljZV6mIKpIKEG-bDbGx-acM_DUIHk07FuJtzzNr-biyaIZV2J5hCe1Th5pyOBNXVO88U6nB1_FhmBByeWgWs2LuQW71pjs9q3__pFQySigWYBOGq3mkoWaP7GWVrhEJRcvOoIem8ybSsFTGVj3ioUZ2Kr0Iup-zfEKJ5G2Z-bc0oN-xux0GgVfH778tmDWtQ-dRuN8Ta_ajgq_BVzVu3ATA5AuMq8ljtut9mWnko1oNlazMFmDIPST75fLhYWENVtdhZ81-PH9gvzsHHabBd_ClTeLKU_mE5okkb5ugt-LMtzV45YzneRq5i21G0vFQ7vVNA-PWo1J5pvSep8jjZ7GzNVlZbqYfZca5FOnfdw4uexMjTKlNjvKwdZdGLzX3x8SqfTh8sJ8dOjUHT9R0p8TdpNO-fMv6H7CoiAqFgx9nib7Pvlgq45SH2yh8QdbdbTzUFqosZPovFZj79kalWdrVMsLVQxso5cXyCKNxUBqpRoo7MO_16vsL1QxwiWj-OpRtp-vUivSsYUqAH-i8Fzl7aeVv_x6zR7M148uDXEgnXq55Oh7KVddmNspaLHfJTpDLIcdEkFDxT60zEkIHsv2-ZMgPtUfJ945Dw__AjnXKtE',
      }
    ]
  })
};
</script>
