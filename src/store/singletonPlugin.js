const bc = new BroadcastChannel('singleton-focus');    

const plugin = store => {
    console.log('Activating singleton plugin')
    bc.onmessage = (msg) => {
        const data = msg.data;
        if (data.type == 'lostFocus'
            && store.state.question?.uuid
            && store.state.question.uuid == data.uuid) {
                store.commit('lostFocus');
                console.log('Focus lost');
        }
    };

    store.subscribe((mutation, state) => {
        if (mutation.type == 'setQuestion' && state.question.uuid) {
            bc.postMessage({type: 'lostFocus', uuid: state.question.uuid});
        }
    })
}

export default plugin;