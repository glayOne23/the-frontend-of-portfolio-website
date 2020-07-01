<template>
<div class="box has-background-dark admin-card">   
    <h1 class="title is-3 white center">Particle Section</h1>

    <form method="post" @submit.prevent="submit" @keydown="errors.clear($event.target.name)">
        <div class="field field-admin">
            <label class="label white">Name</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Your Name" name="name" v-model="introduction.name">
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
                </span>          
            </div>        
            <span class="help is-danger" v-if="errors.has('name')" v-text="errors.get('name')" ></span>
        </div>

        <div class="field field-admin">
            <label class="label white">Greatings</label>

            <div v-for="(greating, i) in introduction.greatings" :key="i">
                <div class="columns">
                    <div class="column is-full">
                        <input class="input" type="text" placeholder="Greating" v-model="introduction.greatings[i]">
                    </div>
                    <div class="column">
                        <a href.prevent="" @click="deleteGreating(i)">
                            <span class="icon is-medium">
                                <i class="fas fa-minus-circle yellow"></i>
                            </span>
                        </a>
                    </div>
                </div>    
            </div>    

            <hr>
            <a href.prevent="" @click="addGreating">
                <span class="icon is-medium admin-color">
                    <i class="fas fa-plus-circle"></i>
                </span>
            </a>
        </div>      

        <div class="field field-admin">
            <label class="label white">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Description" name="description" v-model="introduction.description"></textarea>
            </div>        
            <span class="help is-danger" v-if="errors.has('description')" v-text="errors.get('description')"></span>
        </div>

        <div class="field field-admin">
            <label class="label white">Connect</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Your Name" name="connect" v-model="introduction.connect">
                <span class="icon is-small is-left">
                <i class="fas fa-link"></i>
                </span>          
            </div>        
            <span class="help is-danger" v-if="errors.has('connect')" v-text="errors.get('connect')" ></span>
        </div>

        <div class="has-text-centered">
            <button class="button admin-color-button" :disabled="errors.anyError()">            
                Update
            </button>
        </div>

    </form>

</div>
</template>

<script>

import axios from 'axios';
import Error from '@/helper/Error.js';

export default {
    name: 'AdminParticleSection',

    data() {
        return {
            introduction: [],
            errors: new Error(),
        }
    },

    created() {
        axios.get('introductions')
        .then(response => {            
            this.introduction = response.data          
        })
    },

    methods: {        
        addGreating() {
            this.introduction.greatings.push("");
        },
        deleteGreating(i) {            
            this.$delete(this.introduction.greatings, i)
        },
        submit() {        
            // console.log(this.introduction);                            
            axios.put('introductions/' + this.introduction.id, this.introduction)            
            .then( response => {                                
                this.introduction = response.data                               
                this.$Toast.fire({
                    icon: 'success',
                    title: 'Section succesfully updated'
                })
            })            
            .catch(error => this.errors.record(error.response.data));                        
        },
    }

}
</script>

<style>

</style>
