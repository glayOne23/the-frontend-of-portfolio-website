<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
    <p class="modal-card-title" v-show="!editmode">Add Project</p>
    <p class="modal-card-title" v-show="editmode">Update Project</p>
    <button class="delete" aria-label="close" @click="$emit('close'); clearModal()"></button>
    </header>
    <form method="post" @submit.prevent="editmode ? submitUpdate() : submitCreate()" @click="errors.clear($event.target.name)">
    <section class="modal-card-body">

        <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Project Name" name="name" v-model="form.name">                
                <span class="icon is-small is-left">
                    <i class="fas fa-suitcase"></i>
                </span>          
                <span class="help is-danger" v-if="errors.has('name')" v-text="errors.get('name')" ></span>
            </div>        
        </div>

        <div class="field">
            <label class="label">URL</label>
            <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Project URL" name="url" v-model="form.url">
                <span class="icon is-small is-left">
                    <i class="fas fa-link"></i>
                </span>
                <span class="help is-danger" v-if="errors.has('url')" v-text="errors.get('url')" ></span>
            </div>        
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Description" name="description" v-model="form.description"></textarea>
            </div>        
            <span class="help is-danger" v-if="errors.has('description')" v-text="errors.get('description')" ></span>
        </div>

        <div class="field">
            <label class="label">Image</label>
            <input type="file" name="image" @change="checkFile" ref="fileupload">
            <span class="help is-danger" v-if="errors.has('image')" v-text="errors.get('image')" ></span>            
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

    name: 'WorkModal',

    data () {
        return {  
            form : {                                
                name : '',
                url : '',
                description : '',
                image : '',        
            },
            errors: new Error(),                            
            editmode : false,
            idForUpdate : null,
        }
    },

    methods : {

        checkFile() {
            if(event.target.files.length > 0) {                                
                this.form.image = event.target.files[0];                                                
            }
        },

        formDataJs() {
            let formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('url', this.form.url);
            formData.append('description', this.form.description);
            formData.append('image', this.form.image);
            return formData;            
        },

        clearModal() {
            // clear form
            this.form = {                                
                name : '',
                url : '',
                description : '',
                image : '',        
            }
            // clear file input
            const input = this.$refs.fileupload;
            input.type = 'text'; 
            input.type = 'file';            

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
            axios.get('works/' + id)
            .then(response => {            
                this.form = response.data            
                this.form.image = ""
            })
        },

        submitCreate() {                

            let formData = this.formDataJs()            

            axios.post( '/works', formData).then( () => {
                this.$emit('close')
                this.$emit('refreshWork')
                this.clearModal()                      
                this.$Toast.fire({
                    icon: 'success',
                    title: 'Work succesfully added'
                })
            })
            .catch(error => this.errors.record(error.response.data)); 
        },

        submitUpdate() {                
            
            let formData = this.formDataJs()            
            
            axios.post( '/works/' + this.idForUpdate + "?_method=PUT", formData).then( () => {                
                
                this.$emit('close')
                this.$emit('refreshWork')
                this.clearModal()                      
                this.$Toast.fire({
                    icon: 'success',
                    title: 'Work succesfully updated'
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