<template>
    <div class="container">
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

<style>
    html {
        height: 100%;
        padding: 0;
        margin: 0;
    }

    body {
        padding: 0;
        margin: 0;
        height: 100%;
        font: 14px Arial, Helvetica, sans-serif;
        color: #6e6e6e;
        background: #fff;
    }

    a {
        color: #6e6e6e;
        text-decoration: underline;
        transition: all linear 0.2s;
    }

    a:hover {
        color: #6e6e6e;
        text-decoration: none;
    }

    p {
        padding: 0 0 30px 0;
        margin: 0;
    }

    p:last-of-type {
        padding-bottom: 0;
    }

    form, input, select, textarea {
        padding: 0;
        margin: 0;
        outline: medium none;
        resize: none;
    }

    textarea {
        overflow: hidden;
    }

    select, input[type='radio'], input[type='checkbox'], input[type='button'], input[type='submit'], label, button {
        cursor: pointer;
    }

    article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
        display: block;
    }

    audio, canvas, progress, video {
        display: inline-block;
        vertical-align: baseline;
    }

    .button {
        transition: all linear 0.2s;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    td {
        padding: 0;
    }

    img {
        max-width: 100%;
        border: none;
    }

    h1, h2, h3, h4, h5, h6 {
        padding: 0;
        margin: 0 0 10px 0;
        font-weight: normal;
    }

    *:focus {
        outline: none;
    }

    h1 {
        font-size: 22px;
    }

    h2 {
        font-size: 20px;
    }

    h3 {
        font-size: 18px;
    }

    h4 {
        font-size: 16px;
    }

    h5 {
        font-size: 14px;
    }

    h6 {
        font-size: 12px;
    }

    .clear:after {
        display: block;
        content: '';
        clear: both;
    }

    .content {
        position: relative;
        max-width: 1170px;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .container {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        min-height: 100%;
        height: auto !important;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 40px 0;
    }

    .search__text {
        font: 18px Arial, Helvetica, sans-serif;
        color: #6e6e6e;
        background: #fff;
        max-width: 400px;
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #6e6e6e;
    }

    .main {
        width: 100%;
    }

    .main__projects {

    }

    .main__search {
        margin-bottom: 30px;
        text-align: center;
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

    @media screen and (max-width: 601px) {
        .container {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
</style>
