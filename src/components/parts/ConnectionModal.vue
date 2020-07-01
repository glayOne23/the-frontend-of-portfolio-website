<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
    <p class="modal-card-title" v-show="!editmode">Add Connection</p>
    <p class="modal-card-title" v-show="editmode">Update Connection</p>
    <button class="delete" aria-label="close" @click="$emit('close'); clearModal()"></button>
    </header>
    <form method="post" @submit.prevent="editmode ? submitUpdate() : submitCreate()" @click="errors.clear($event.target.name)">
    <section class="modal-card-body">

        <div class="field">
            <label class="label">Icon Font Awesome</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="fab fa-3x fa-github" name="icon" v-model="form.icon">                
                <span class="icon is-small is-left">
                    <i class="fas fa-square"></i>
                </span>          
                <span class="help is-danger" v-if="errors.has('icon')" v-text="errors.get('icon')" ></span>
            </div>        
        </div>

        <div class="field">
            <label class="label">URL</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="http url" name="url" v-model="form.url">                
                <span class="icon is-small is-left">
                    <i class="fas fa-link"></i>
                </span>          
                <span class="help is-danger" v-if="errors.has('url')" v-text="errors.get('url')" ></span>
            </div>        
        </div>

    </section>

    <footer class="modal-card-foot">
        <button class="button is-success" :disabled="errors.anyError()">Save</button>
        <button class="button" @click.prevent="$emit('close'); clearModal()">Cancel</button>
    </footer>
    </form>
    

  </div>
</div>
</template>


<script>

import axios from 'axios';
import Error from '@/helper/Error.js';

export default {

    name: 'ConnectionModal',

    data () {
        return {  
            form : {                                
                icon : '',
                url : '',                
            },
            errors: new Error(),                            
            editmode : false,
            idForUpdate : null,
        }
    },

    methods : {

        clearModal() {
            // clear form
            this.form = {                                
                icon : '',
                url : '',                
            }

            // clear errors
            this.errors = new Error()
        },
        
        modalOnCreate() {
            this.form = this.clearModal()
            this.editmode = false
        },

        modalOnUpdate(id){       
            this.editmode = true
            this.idForUpdate = id
            axios.get('connects/' + id)
            .then(response => {            
                this.form = response.data                            
            })
        },

        submitCreate() {                            

            axios.post( 'connects', this.form).then( () => {
                this.$emit('close')
                this.$emit('refreshConnection')
                this.clearModal()                      
                this.$Toast.fire({
                    icon: 'success',
                    title: 'Connection succesfully added'
                })
            })
            .catch(error => this.errors.record(error.response.data)); 
        },

        submitUpdate() {                
            
            axios.put( 'connects/' + this.idForUpdate, this.form).then( () => {                
                
                this.$emit('close')
                this.$emit('refreshConnection')
                this.clearModal()                      
                this.$Toast.fire({
                    icon: 'success',
                    title: 'Connection succesfully updated'
                })
            })
            .catch(error => this.errors.record(error.response.data));             
            
        },

    }
  
}
</script>

<style>
    .modal-card{
        overflow: auto;
        -ms-overflow-y: auto;
    }
</style>