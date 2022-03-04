<template>
    <div class="columns">
        <div class="book-form-wrapper column">
            <BookForm :selectedBook="selectedBook"
            @book-create="onBookCreate"
            @book-update="onBookUpdate"/>
        </div>
        <div class="book-list-wrapper column">
            <BookList :bookList="bookList"
            @book-click="onBookClick"
            @book-delete="onBookDelete"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BookList from './components/BookList.vue';
import BookForm from './components/BookForm.vue';
import axios from 'axios';

@Options({
    components: {
        BookList,
        BookForm,
    },
    methods: {
        onBookClick(id: string) {
            this.selectedBook = this.bookList.find((book: { _id: string; }) => book._id === id);
        },
        onBookCreate(book: { title: string; author: string; description: string; }) {
            this.axiosInstance.post('/books', book)
                .then((response: { data: { _id: string; }; }) => {
                    this.bookList.push(response.data);
                })
                .catch((error: { response: { data: { message: string; }; }; }) => {
                    console.log(error.response.data.message);
                });
        },
        onBookUpdate(book: { id: string; title: string; author: string; description: string; }) {
            this.axiosInstance.put('/books/' + this.selectedBook._id, book)
                .then(() => {
                    this.getBooks()
                })
                .catch((error: { response: { data: { message: string; }; }; }) => {
                    console.log(error.response.data.message);
                });
        },
        onBookDelete(id: string) {
            this.axiosInstance.delete('/books/' + id)
                .then(() => {
                    this.getBooks()
                    this.selectedBook = null;
                })
                .catch((error: { response: { data: { message: string; }; }; }) => {
                    console.log(error.response.data.message);
                });
        },
        getBooks() {
            this.axiosInstance.get('books')
            .then((response: { data: Record<string, unknown> }) => {
                this.bookList = response.data;
            })
            .catch((error: string) => {
                console.log(error);
            });
        }
    },
    data() {
        return {
            bookList: {},
            selectedBook: null
        };
    },
    computed: {
        axiosInstance() {
            return axios.create({
                baseURL: 'http://localhost:3000/api'
            });
        }
    },
    created() {
        this.getBooks();
    },
})
export default class App extends Vue {}
</script>

<style>
</style>
