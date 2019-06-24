import Vue from 'vue'
import Vuex from 'vuex'
import resource from 'vue-resource'

Vue.use(resource);
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        request: '',
        projects: [],
        preloader: false,
        wait: false
    },
    mutations: {
        updatePreloader(state) {
            state.preloader = !state.preloader;
        },
        updateWait(state) {
            state.wait = !state.wait;
        },
        updateProjects(state, projects) {
            state.projects = projects;
        },
        updateRequest(state, request) {
            state.request = request
        },
    },
    actions: {
        getData(ctx) {
            if (ctx.state.request.length > 1 && !ctx.state.wait) {
                ctx.commit('updatePreloader');
                ctx.commit('updateWait');
                setTimeout(function () {
                    ctx.commit('updateWait');
                }, 1000);
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
            } else {
                ctx.commit('updateProjects', []);
            }
        }
    },
    getters: {
        allProjects(state) {
            return state.projects
        },
    }
})
