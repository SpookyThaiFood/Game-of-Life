function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (var i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var next;
const width = 1000;
const height = 800;
const res = 20;

var paused = false;
const bufferTime = 0;
var buffer = 0;

const cols = 96;
const rows = 45;

function setup() {
	createCanvas(1920, 900);
	grid = make2DArray(cols, rows);
	next = make2DArray(cols, rows);

	for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
		grid[i][j] = new Bug(i, j, res, 0, 0);
		next[i][j] = new Bug(i, j, res, 0, 0);
	}
	grid[3][3].alive = 1;
}

function keyPressed() {
	if (key == 'p') {
		paused = !paused;
	} else if (key == 'r') {
		for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
			grid[i][j] = new Bug(i, j, res, 0, 0);
		}
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
		if (mouseX > i*res && mouseX < i*res+res && mouseY > j*res && mouseY < j*res+res) {
			if (grid[i][j].alive == 1) {
				grid[i][j].alive = 0;
			} else {
				grid[i][j].alive = 1;
			}
		}
	}
}

function draw() {
	background(255);
	stroke(0);
	for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
		grid[i][j].draw();
	}
	if (!paused) {
		if (buffer >= bufferTime) {
			update();
			buffer = 0;
		} else {
			buffer++;
		}
	}
}

function update() {
	for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
		var count = grid[i][j].neighbours();
		var state = grid[i][j].alive;
		if (state == 0 && count == 3) {
			//next[i][j].alive = 1;
			next[i][j] = new Bug(i, j, res, 1, 0);
		} else if (state == 1 && (count < 2 || count > 3)) {
			//next[i][j].kill();
			next[i][j] = new Bug(i, j, res, 0, 70);
		} else {
			//next[i][j].alive = grid[i][j].alive;
			next[i][j] = grid[i][j];
		}
	}
	grid = next;
	next = make2DArray(cols, rows);
}