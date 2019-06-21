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
                    @input="delayGet"
            />
        </form>
        <div class="preloader" v-show="preloader">Идет загрузка данных...</div>
        <ul class="projects main__projects" v-show="!preloader">
            <li
                    class="projects__item"
                    v-for="project in projects.items"
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
    export default {
        data() {
            return {
                request: '',
                preloader: false
            }
        },
        computed: {
            delayGet: function () {
                const DELAY = 1000;
                return this.delay(this.getData, DELAY);
            },
            projects() {
                return this.$store.state.projects;
            }
        },
        methods: {
            delay(callback, limit) {
                let time = false;
                let minimum = this.request.length;
                return function () {
                    if (!time) {
                        callback.call();

                        if (minimum < 1) {
                            time = true;
                        }
                        setTimeout(function () {
                            time = false;
                        }, limit);
                    }
                }
            },
            getData() {
                if (this.request.length > 1) {
                    this.preloader = true;
                    this.$http.get('/search/repositories?q=' + this.request)
                        .then(response => {
                            return response.json();
                        }, response => {
                            console.log(response);
                        })
                        .then(projects => {
                            console.log(projects);
                            this.$store.state.projects = projects;
                            this.preloader = false;
                        });
                } else if (this.request.length < 1) {
                    this.$store.state.projects = [];
                }
            }
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
