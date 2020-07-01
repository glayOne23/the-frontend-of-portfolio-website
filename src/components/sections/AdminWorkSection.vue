<template>
<div class="box has-background-dark admin-card">
    
    <h1 class="title is-3 white center">Recent Work Section</h1>

    <div class="table-container">
        
        <button class="button admin-color-button mg-btm" @click="showModal=true; createWork">            
            <i class="fas fa-plus-circle"></i>             
            Add Project
        </button>

        <table class="table is-fullwidth">
            <thead>
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>URL</th>
                <th>Image</th>
                <th>Action</th>
            </thead>
            <tfoot>
                <tr v-for="(work, i) in works" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{work.name}}</td>
                    <td v-if="work.description.length >= 200">{{work.description.slice(0, 200)}}...</td>
                    <td v-if="work.description.length < 200">{{work.description}}</td>
                    <td>{{work.url}}</td>
                    <td>
                        <img :src="url+work.image" :alt="url+work.image">                        
                    </td>
                    <td>
                        <a href.prevent="" @click="updateWork(work.id)">
                            <span class="icon is-medium yellow">
                                <i class="fas fa-pen"></i>
                            </span>
                        </a>

                        <a href.prevent="" @click="deleteWork(work.id, i)">
                            <span class="icon is-medium red">
                                <i class="fas fa-trash"></i>
                            </span>
                        </a>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>

    <WorkModal v-show="showModal"  @close="showModal=false" @refreshWork="refreshWork" ref="modal"/>

</div>

</template>

<script>

import axios from 'axios';
import Error from '@/helper/Error.js';
import {mapGetters} from 'vuex';
import WorkModal from '@/components/parts/WorkModal.vue';

export default {
    name: 'AdminWorkSection',

    components: 
    {
        WorkModal,
    },
    
    data () {
        return {
            works : [],
            errors: new Error(),                
            showModal : false,
        }
    },
    
    computed : {
        ...mapGetters({
            url: 'url'
        })
    },

    created() {
        this.loadWork()
    },

    methods : {
        loadWork() {
            axios.get('works')
            .then(response => {            
                this.works = response.data            
            })
        },
        
        refreshWork() {
            this.loadWork()
        },

        createWork() {            
            this.$refs.modal.modalOnCreate();            
        },
        updateWork(id) {            
            this.$refs.modal.modalOnUpdate(id);
            this.showModal = true
        },

        deleteWork(id, index){            
            const swalWithBootstrapButtons = this.$Swal.mixin({
                customClass: {
                    confirmButton: 'button is-success left',
                    cancelButton: 'button is-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
                }).then((result) => {
                if (result.value) {
                    axios.delete('/works/' + id)            
                    .then( () => {                        
                        this.$delete(this.works, index)                        
                        swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    })                                
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === swalWithBootstrapButtons.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                }
            })
        },

    }
}
</script>

<style>
    img{
        max-width: 10em;
    }
    .left {
        margin-left: 1em;
    }
</style>
