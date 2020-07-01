import axios from "axios";


export default ({

    //enable namespace
    namespaced : true,

    state: {            

        token : null,

        user : null,

    },

    getters: {
        token(state) {
            return state.token
        },

        // check if token available
        authenticated (state) {
            return state.token && state.user
        },

        // check if user available
        user (state) {
            return state.user
        },
    },

    mutations: {

        // set state token
        SET_TOKEN (state, token) {
            state.token = token
        },

        // set state token
        SET_USER (state, user) {
            state.user = user
        }
        
    },

    actions: {

        async login( {dispatch}, credentials) {
            let response = await axios.post('login', credentials);
            
            // dispatch attempt action            
            return dispatch('attempt', response.data.access_token)
        },
        
        async attempt ( {commit, state}, token) {
            if (token) {                
                commit('SET_TOKEN', token)
            }         

            // jika token pada state tidak ada, code akan berhenti disini
            if (!state.token) {                
                return
            }           

            try {
                let response = await axios.get('me') 
                commit('SET_USER', response.data)
            } catch (e) {
                // in case token expired
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        logout({commit}) {
            return axios.post('logout')
                .then(()=> {
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                })
        }
        
    },


})
