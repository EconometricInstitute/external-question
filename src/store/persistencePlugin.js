function getKey(state) {
    return `answer_${state.question.uuid}`;
}

function storeData(state) {
    const key = getKey(state);
    const value = JSON.stringify(state.answer);
    window.localStorage[key] = value;
}

function readData(state) {
    const key = getKey(state);
    const value = window.localStorage[key];
    if (value) {
        return JSON.parse(value);
    }
    return null;
}

const plugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type == 'setQuestion' && state.question.uuid) {
            // Load answer from localStorage
            const answer = readData(state);
            if (answer) {
                store.commit('setAnswer', answer);
            }
        }
        if (mutation.type == 'setAnswer' && state.question.uuid) {
            // Save answer to localStorage
            storeData(state);
        }
    })
};

export default plugin;