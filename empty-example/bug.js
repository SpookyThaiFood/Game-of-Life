function Bug(i, j, w, alive, decay) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.alive = alive;
	this.decay = decay;
	this.w = w;
}

Bug.prototype.draw = function() {
	if (this.alive) {
		fill(255);
	} else {
		fill(this.decay+30);
		if (this.decay > 0) {
			this.decay -= 10;
		}
	}
	square(this.x, this.y, this.w);
}

Bug.prototype.kill = function() {
	this.alive = 0;
	this.decay = 70;
}

Bug.prototype.neighbours = function() {
	var count = 0;
	for (var i = -1; i <= 1; i++) for (var j = -1; j <= 1; j++) {
		var xoff = this.i+i;
		var yoff = this.j+j;
		if (xoff > -1 && xoff < cols && yoff > -1 && yoff < rows) {
			count += grid[xoff][yoff].alive;
		}
	}
	count -= this.alive;
	return count;
}

Bug.prototype.copy = function() {
	var b = new Bug(this.i, this.j, this.w)
	b.alive = this.alive;
	b.decay = this.decay;
	return b;
}