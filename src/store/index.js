import { createStore } from 'vuex';
import user from './user';
import status from './status';
import atendimentos from './atendimentos';

export default createStore({
    modules: {
        user, status, atendimentos
    }
});