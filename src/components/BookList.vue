<template>
    <div class="book-list">
        <div v-for="book in bookList"
        :key="book._id"
        class="book-entry card"
        :class="{ 'has-background-info': selectedBookId === book._id }"
        :id="book._id"
        @click="onBookClick(book._id)">
            <div class="card-content">
                <div class="media">
                    <div class="media-content has-text-left">
                        <p class="title is-4">{{ book.title }}</p>
                        <p class="subtitle is-6">{{ book.author }}</p>
                    </div>
                </div>
                <div class="content has-text-left">
                    <p>{{ book.description }}</p>
                </div>
                <div class="book-form_delete-wrapper buttons is-left">
                    <button @click="deleteBook(book._id)" class="delete-button button is-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        bookList: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            selectedBookId: null,
        };
    },
    methods: {
        onBookClick(id: string) {
            this.selectedBookId = id;
            this.$emit('book-click', id);
        },
        deleteBook(id: string) {
            this.$emit('book-delete', id);
        }
    },
})
export default class BookList extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@keyframes new-book-animate {
	from {
		transform: translatex(500px);
	}
	to {
		transform: translatex(0);
	}
}

.book-entry {
    animation: new-book-animate 0.5s;
    margin-bottom: 15px;
    border-radius: 5px 0px 0px 5px;
}
</style>
