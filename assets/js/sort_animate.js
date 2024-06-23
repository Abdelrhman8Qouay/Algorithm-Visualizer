
class BubbleSortAnimation {
    constructor(canvasId, array, delay) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.array = array.slice(); // Use a copy of the array
        this.originalArray = array.slice(); // Store the original array for resetting
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.barWidth = this.width / array.length;
        this.maxValue = Math.max(...array);
        this.sorted = false;
        this.currentIndex = 0;
        this.nextIndex = 0;
        this.sorting = false;
        this.delay = delay || 500; // Default delay of 500ms
    }

    drawArray() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.array.forEach((value, index) => {
            this.ctx.fillStyle = 'blue';
            if (index === this.nextIndex || index === this.nextIndex + 1) {
                this.ctx.fillStyle = '#4CAF50';
            }
            const barHeight = (value / this.maxValue) * this.height;
            this.ctx.fillRect(index * this.barWidth, this.height - barHeight, this.barWidth, barHeight);
        });
    }

    bubbleSortStep() {
        if (this.sorted) {
            return;
        }

        if (this.nextIndex < this.array.length - 1 - this.currentIndex) {
            if (this.array[this.nextIndex] > this.array[this.nextIndex + 1]) {
                [this.array[this.nextIndex], this.array[this.nextIndex + 1]] = [this.array[this.nextIndex + 1], this.array[this.nextIndex]];
            }
            this.nextIndex++;
        } else {
            this.currentIndex++;
            if (this.currentIndex >= this.array.length - 1) {
                this.sorted = true;
            }
            this.nextIndex = 0;
        }

        this.drawArray();
        if (!this.sorted) {
            setTimeout(() => this.bubbleSortStep(), this.delay);
        }
    }

    start() {
        if (this.sorting) return;
        this.sorting = true;
        this.sorted = false;
        this.currentIndex = 0;
        this.nextIndex = 0;
        this.array = this.originalArray.slice(); // Reset the array to the original state
        this.drawArray();
        setTimeout(() => this.bubbleSortStep(), this.delay);
    }

    reset() {
        clearTimeout(this.animationFrame);
        this.sorting = false;
        this.array = this.originalArray.slice(); // Reset the array to the original state
        this.drawArray();
    }

    setSpeed(newDelay) {
        this.delay = newDelay;
    }
}

const array = [4, 20, 64, 8, 1, 11];
const bubbleSort = new BubbleSortAnimation('bubbleSortCanvas', array, 500); // Set delay to 1000ms (1 second)
bubbleSort.start();