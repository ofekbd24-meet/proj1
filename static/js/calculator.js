let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let axes = {};
axes.negative = true;
axes.x0 = .5 + .5*canvas.width;
axes.y0 = .5 + .5*canvas.height;
axes.scale = 30;

let dx = 1;
let i_max = Math.round((ctx.canvas.width - axes.x0) / dx);
let i_min = axes.negative ? Math.round(-axes.x0 / dx) : 0;

function draw() {
	canvas.setAttribute("width", visualViewport.width);
	canvas.setAttribute("height", visualViewport.height / 2 - 15);
	if (canvas == null || !canvas.getContext) return;

	show_axes(ctx, axes);
}

function graph(ctx, axes, func, color, thickness) {
	let x, y;

	ctx.beginPath();
	ctx.lineWidth = thickness;
	ctx.strokeStyle = color;

	for (let i = i_min; i <= i_max; i++) {
		x = dx * i;
		y = axes.scale * func(x / axes.scale);

		if (i == i_min)
			ctx.moveTo(axes.x0 + x, axes.y0 - y);
		else
			ctx.lineTo(axes.x0 + x, axes.y0 - y);
	}
	ctx.stroke();
}

function show_axes(ctx, axes) {
	let w = ctx.canvas.width;
	let h = ctx.canvas.height;
	let x_min = axes.negative ? 0 : axes.x0;

	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)";
	
	// x axis
	ctx.moveTo(x_min, axes.y0);
	ctx.lineTo(w, axes.y0);
	// y axis
	ctx.moveTo(axes.x0, 0);
	ctx.lineTo(axes.x0, h);

	ctx.stroke();
}

let scale = document.getElementById("scale");
scale.addEventListener("change", () => {
	axes.scale = parseFloat(scale.value);
	execute_functions();
});
