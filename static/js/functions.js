const functions = document.getElementById("functions");

function random_color(){
	return Math.floor(Math.random() * 255);
}

function manage_config(string){
	let COLOR = ""
	split = string.split("[")

	if (split.length > 1 && string.indexOf("]")-string.indexOf("[") != 1)
		COLOR = split[1].replace("]", "")
	else
		COLOR = random_color() + "," + random_color() + "," + random_color()

	if (split.length > 2)
		THICKNESS = split[2].replace("]", "")
	else
		THICKNESS = 2

	if (split.length > 3)
		LATEX = split[3].indexOf("yes") != -1 ? true : false;
	else
		LATEX = false

	return { "color": COLOR, "thick": THICKNESS, "latex": LATEX }
}

function transform(string){
	if (string.indexOf("[") !== -1)
		string = string.split("[")[0];
	if (string.indexOf('~') === 0)
		return string.replace("~", "");

	string = string.replaceAll("sin", "Math.sin");
	string = string.replaceAll("cos", "Math.cos");
	string = string.replaceAll("tan", "Math.tan");
	string = string.replaceAll("arcsin", "Math.asin");
	string = string.replaceAll("arccos", "Math.acos");
	string = string.replaceAll("arctan", "Math.atan");
	string = string.replaceAll("csc", "math.csc");
	string = string.replaceAll("sec", "math.sec");
	string = string.replaceAll("cot", "math.cot");
	string = string.replaceAll("sqrt", "Math.sqrt");
	string = string.replaceAll("cbrt", "Math.cbrt");
	string = string.replaceAll("exp", "Math.exp");
	string = string.replaceAll("pow", "Math.pow");
	string = string.replaceAll("log", "Math.log");
	string = string.replaceAll("log2", "Math.log2");
	string = string.replaceAll("log10", "Math.log10");
	string = string.replaceAll("#pi", "math.pi");
	string = string.replaceAll("#e", "math.e");
	string = string.replaceAll("derivative", "math.derivative");
	string = string.replaceAll("integral", "math.integral");
	string = string.replaceAll("factorial", "math.factorial");
	string = string.replaceAll("gamma", "math.gamma");

	return string;
}

function add_latex(content){
	latex_box = document.getElementById("latexbox");
	const latex = document.createElement("div");
	latex.classList.add("latex-container");
	latex_box.appendChild(latex);

	content = content.replaceAll("sin", "\\sin");
	content = content.replaceAll("cos", "\\cos");
	content = content.replaceAll("tan", "\\tan");
	content = content.replaceAll("arcsin", "\\arcsin");
	content = content.replaceAll("arccos", "\\arccos");
	content = content.replaceAll("arctan", "\\arctan");
	content = content.replaceAll("sec", "\\sec");
	content = content.replaceAll("csc", "\\csc");
	content = content.replaceAll("cot", "\\cot");
	content = content.replaceAll("*", "\\times");
	content = content.replaceAll("exp", "\\exp");
	content = content.replaceAll("gcd", "\\gcd");
	content = content.replaceAll("pow", "\\pow");
	content = content.replaceAll("binom", "\\binom");
	content = content.replaceAll("#pi", "\\pi");
	content = content.replaceAll("#e", "e");

	katex.render(content, latex, { throwOnError: false });
}

function execute_functions() {
	draw();
	document.getElementById("latexbox").innerHTML = "";
	let value = functions.value.split("\n");

	for (let i = 0; i < value.length; i++){
		if (value[i].indexOf(";") !== -1) value[i] = value[i].split(";")[0];
		let config = manage_config(value[i]);
		if (value[i].indexOf(":") !== -1)
			localStorage.setItem(value[i].split(":")[0].replace("#",""), value[i].split(":")[1].split("[")[0])
		if (value[i].indexOf("$") !== -1){
			for (let u = 0; u < value[i].split("$").length; u++){
				value[i]=value[i].replaceAll("$"+value[i].split("$")[1].split(" ")[0], localStorage.getItem(value[i].split("$")[1].split(" ")[0]))
			}
		}
		if (value[i].indexOf("%") !== -1)
			continue;

		graph(
			document.getElementById("canvas").getContext("2d"),
			axes,
			function _(x){ return eval(transform(value[i])) },
			`rgb(${config["color"]})`,
			parseInt(config["thick"])
		);

		if (config.latex) add_latex(value[i].split("[")[0])
	}
}

functions.addEventListener("change", (e) => {
	execute_functions();
});
