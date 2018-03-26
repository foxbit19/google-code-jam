module.exports = class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(el) {
        this.queue.push(el);
    }

    dequeue() {
        return this.queue.shift();
    }
}