<template>
    <div class="book-form box">
        <form @submit.prevent="onSubmit">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" type="text" v-model="title" placeholder="Title">
                </div>
            </div>
            <div class="field">
                <label class="label">Author</label>
                <div class="control">
                    <input class="input" type="text" v-model="author" placeholder="Author">
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="description" placeholder="Description"></textarea>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary" @click="createNewBook()" :disabled="!isValid">Create New</button>
                </div>
                <div class="control">
                    <button class="button is-success" @click="updateBook()" :disabled="!isValid || !selectedBook">Update Selected</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        selectedBook: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            title: '',
            author: '',
            description: '',
        };
    },
    created() {
        if (this.selectedBook) {
            this.title = this.selectedBook.title;
            this.author = this.selectedBook.author;
            this.description = this.selectedBook.description;
        }
    },
    // Using watch, we dont have to use events to overwrite the data in the form.
    // We simply listen for changes on the prop, and update the form data appropriately.
    watch: {
        selectedBook() {
            if (this.selectedBook) {
                this.title = this.selectedBook.title;
                this.author = this.selectedBook.author;
                this.description = this.selectedBook.description;
                return
            }
            this.title = '';
            this.author = '';
            this.description = '';
        }
    },
    methods: {
        createNewBook() {
            this.$emit('book-create', {
                title: this.title,
                author: this.author,
                description: this.description
            });
        },
        updateBook() {
            this.$emit('book-update', {
                id: this.selectedBookId,
                title: this.title,
                author: this.author,
                description: this.description
            });    
        }
    },
    computed: {
        isValid() {
            return this.title.length > 0 && this.author.length > 0 && this.description.length > 0;
        }
    }
})
export default class BookForm extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.book-form {
    border-radius: 0px 0px 5px 0px;
}
</style>
