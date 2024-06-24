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
        this.padding = 20; // Padding inside the canvas

        // Adjust canvas size
        // this.adjustCanvasSize();
        // window.addEventListener('resize', () => this.adjustCanvasSize());
    }

    adjustCanvasSize() {
        this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.height = this.canvas.height = this.canvas.parentElement.offsetHeight - 100;
        this.barWidth = (this.width - this.padding * 2) / this.array.length;
        this.drawArray();
    }

    drawArray() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.array.forEach((value, index) => {
            const barHeight = (value / this.maxValue) * (this.height - this.padding * 2);
            const x = this.padding + index * this.barWidth;
            const y = this.height - this.padding - barHeight;

            // Create a gradient for the bar
            const gradient = this.ctx.createLinearGradient(x, y, x + this.barWidth, this.height);
            gradient.addColorStop(0, '#4CAF50');
            gradient.addColorStop(1, 'blue');
            this.ctx.fillStyle = gradient;

            // Highlight the active bars
            if (index === this.nextIndex || index === this.nextIndex + 1) {
                this.ctx.fillStyle = '#FF5733';
            }

            // Draw the bar
            this.ctx.fillRect(x, y, this.barWidth, barHeight);

            // Draw the value below the bar
            this.ctx.fillStyle = 'black';
            this.ctx.font = `${this.barWidth / 3}px serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'top';
            this.ctx.fillText(value, x + this.barWidth / 3, this.height - this.padding + 5);
        });
    }

    bubbleSortStep() {
        if (this.sorted) return;

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
const bubbleSort = new BubbleSortAnimation('bubbleSortCanvas', array, 500); // Set delay to 500ms
bubbleSort.start();



// Custom Visualizing ===================================

// Handle form submission
document.getElementById('visualizeBtn').addEventListener('click', () => {
    const dataInput = document.getElementById('dataInput').value;
    // const algorithm = document.getElementById('algorithmSelect').value;

    // Parse the input data
    const data = dataInput.split(',').map(Number);

    // Validate data
    if (data.some(isNaN)) {
        alert("Please enter valid numbers separated by commas.");
        return;
    }

    // Visualize the sorting
    const visualizing = new BubbleSortAnimation('visualizationCanvas', data, 500);
    visualizing.start();


    fetchData(getDynamicURL('sort_algos.json', 'content'))
    .then(data => {
        const algorithm = data.bubble;

            // Set title and description
            document.getElementById('algorithmTitle').innerText = algorithm.title;
            document.getElementById('algorithmDescription').innerText = algorithm.description;

            // Set steps
            const stepsList = document.getElementById('algorithmSteps');
            algorithm.steps.forEach(step => {
                const listItem = document.createElement('li');
                listItem.innerText = step;
                stepsList.appendChild(listItem);
            });

            // Set pseudo code
            document.getElementById('algorithmPseudoCode').innerText = algorithm.pseudo_code.join('\n');

            // Set complexity details
            const complexityList = document.getElementById('algorithmComplexity');
            for (const [key, value] of Object.entries(algorithm.complexity_details)) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${key.replace(/_/g, ' ')}:</strong> ${value}`;
                complexityList.appendChild(listItem);
            }

            // Set applications
            const applicationsList = document.getElementById('algorithmApplications');
            algorithm.applications.forEach(application => {
                const listItem = document.createElement('li');
                listItem.innerText = application;
                applicationsList.appendChild(listItem);
            });
    })
    .catch(error => {
        console.error("Failed to fetch data:", error);
    });
});

console.log(getDynamicURL('logo.svg', 'assets'))