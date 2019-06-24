<template>
    <div class="main">
        <form class="search main__search">
            <input
                    type="text"
                    size="50"
                    value=""
                    class="search__text"
                    placeholder="Search for projects on githab"
                    v-model="request"
                    @input="getData"
            />
        </form>
        <div class="preloader" v-show="preloader">Идет загрузка данных...</div>
        <ul class="projects main__projects" v-show="!preloader">
            <li
                    class="projects__item"
                    v-for="project in allProjects.items"
            >
                <span class="projects__icon"><i class="fab fa-github"></i></span> <a :href="project.html_url"
                                                                                     target="_blank"
                                                                                     class="projects__link">{{
                project.full_name }}</a>
                <p class="projects__info"><span class="projects__icon"><i class="fas fa-star "></i></span> {{
                    project.stargazers_count }} <span class="projects__icon"><i class="fas fa-eye"></i></span> {{
                    project.watchers_count }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                preloader: state => state.preloader
            }),
            ...mapGetters(['allProjects']),
            request: {
                get() {
                    return this.$store.state.request
                },
                set(value) {
                    this.$store.commit('updateRequest', value)
                }
            }
        },
        methods: {
            ...mapActions(['getData', 'delay'])
        }
    }
</script>
<style scoped>
    .search__text {
        font: 18px Arial, Helvetica, sans-serif;
        color: #6e6e6e;
        background: #fff;
        width: 400px;
        padding: 10px 20px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #6e6e6e;
    }

    .main__projects {

    }

    .main__search {
        margin-bottom: 30px;
    }

    .projects {
        padding: 0;
        margin: 0;
    }

    .projects__item {
        padding: 0 0 10px 0;
        margin: 0 0 10px 0;
        list-style: none;
        border-bottom: 1px solid #6e6e6e;
    }

    .projects__item:last-child {
        padding: 0;
        margin: 0;
        border-bottom: none;
    }

    .projects__info {
        padding-top: 10px;
        font-size: 12px;
    }

    .projects__icon {
        color: #000;
        margin-right: 5px;
        display: inline-block;
    }

    .preloader {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #ff0000;
        text-transform: uppercase;
    }
</style>
