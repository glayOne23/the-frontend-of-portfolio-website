<template>
<div class="box has-background-dark admin-card">
    
    <h1 class="title is-3 white center">Footer Section</h1>


    <div class="table-container">
        
        <button class="button admin-color-button mg-btm" @click="showModal=true; createConnection">            
            <i class="fas fa-plus-circle"></i>             
            Add Connection
        </button>

        <table class="table is-fullwidth">
            <thead>
                <th>No</th>
                <th>Icon</th>
                <th>Url</th>                
                <th>Action</th>
            </thead>
            <tfoot>
                <tr v-for="(connect, i) in connects" :key="i">
                    <td>{{i+1}}</td>
                    <td>
                        <span class="icon is-medium admin-color">
                            <i :class="connect.icon"></i>
                        </span>                    
                    </td>
                    <td>{{connect.url}}</td>                    
                    <td>
                        <a href.prevent="" @click="updateConnection(connect.id)">
                            <span class="icon is-medium yellow">
                                <i class="fas fa-pen"></i>
                            </span>
                        </a>

                        <a href.prevent="" @click="deleteConnection(connect.id, i)">
                            <span class="icon is-medium red">
                                <i class="fas fa-trash"></i>
                            </span>
                        </a>
                    </td>
                </tr>                
            </tfoot>
        </table>
    </div>

    <ConnectionModal v-show="showModal"  @close="showModal=false" @refreshConnection="refreshConnection" ref="modal"/>

</div>

</template>

<script>

import axios from 'axios';
import Error from '@/helper/Error.js';
import ConnectionModal from '@/components/parts/ConnectionModal.vue';

export default {
    name: 'AdminFooterSection',

    components: 
    {
        ConnectionModal,
    },

    data () {
        return {
            connects : [],
            errors: new Error(),                
            showModal : false,
        }
    },

    created() {
        this.loadConnection()
    },

    methods : {
        loadConnection() {
            axios.get('connects')
            .then(response => {            
                this.connects = response.data            
            })
        },
        
        refreshConnection() {
            this.loadConnection()
        },

        createConnection() {            
            this.$refs.modal.modalOnCreate();            
        },
        updateConnection(id) {            
            this.$refs.modal.modalOnUpdate(id);
            this.showModal = true
        },

        deleteConnection(id, index){            
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
                    axios.delete('/connects/' + id)            
                    .then( () => {                        
                        this.$delete(this.connects, index)                        
                        swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                        )
                    })                                
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === swalWithBootstrapButtons.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary data is safe :)',
                    'error'
                    )
                }
            })
        },

    }
}
</script>

<style>

</style>
