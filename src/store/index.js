import Vue from 'vue'
import Vuex from 'vuex'
import resource from 'vue-resource'

Vue.use(resource);
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        request: '',
        projects: [],
        preloader: false
    },
    mutations: {
        updatePreloader(state) {
            state.preloader = !state.preloader;
        },
        updateProjects(state, projects) {
            state.projects = projects;
        },
        updateRequest(state, request) {
            state.request = request
        },
    },
    actions: {
        // delay({ commit, dispatch }) {
        //     let time = false;
        //     let minimum = 1;
        //     console.log('st' + time)
        //         if (!time) {
        //             dispatch('getData');
        //             time = true;
        //             console.log('end' + time)
        //             setTimeout(function () {
        //                 time = false;
        //                 console.log('d' + time)
        //             }, 10000);
        //         }
        // },
        getData(ctx) {
            if (ctx.state.request.length > 1) {
                ctx.commit('updatePreloader');
                Vue.http.get('/search/repositories?q=vue')
                    .then(response => {
                        return response.json();
                    }, response => {
                        console.log(response);
                    })
                    .then(projects => {
                        ctx.commit('updateProjects', projects);
                        ctx.commit('updatePreloader');
                    });
            }
        }
    },
    getters: {
        allProjects(state) {
            return state.projects
        },
    }
})
