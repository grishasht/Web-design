let myModule = (function(){
	'use strict';
	let _tree = [
	"root",
	[
		["Кольори",
			[
				["Червоний",[]],
				["Зелений",[]],
				["Синій",[]],
				["Жовтий",[]]	
			]
		],
		["Предмети",
			[
				["Комп.графіка",
					[
						["доц. Клятченко Я. М.",
							["107-15 Лаб",]
						]
					]
				],
				["ВЕБ-дизайн",
					[
						["доц. Петрашенко А. В.",
							[["511-19 Лек",[]]]
						]
					]
				],
				["Арх. комп'ютерів",[]],
				["Комп. схемотехіка",[]]
			]
		],
		["Файли",
			[
				["index.html",[]],
				["main.js",[]]
			]
		],
		["Автор",
			[
				["Штефанович Г.М.", []]	
			]
		]
	]
];	
	function open_branch ( e ) {
		function _insertAfter ( elem, refElem ) {
		return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
		}
		function _getCurrentElem ( number_line ) {
		let ptr = _tree[1];
			for (let i = 1; i < number_line.length; i++){
				ptr = ptr[number_line[i]][1];
		}
		return ptr;
}
		e = e || window.event;
		let current = e.currentTarget;
		let pdiv = document.createElement("div");
		_insertAfter(pdiv,current);
		let number_line;
		if ( e.currentTarget.id == "root" )
			number_line = "0";
		else 
			number_line = e.currentTarget.id;
		let vec_elem = _getCurrentElem(number_line);
			for ( let i = 0; i < vec_elem.length; i++ ) {
				let p = document.createElement("p");
				p.id = number_line + i;
				p.innerHTML = vec_elem[i][0];
				if ( vec_elem[i][1].length == 0 )
					p.className = "end";
				pdiv.appendChild(p);
				p.onclick = open_branch;
		}
		current.onclick = close_branch;
}
	function close_branch (e) {
		e = e || window.event;
		let current = e.currentTarget;
		current.parentNode.removeChild(current.nextSibling);
		current.onclick = open_branch;
}
	return{
		open_branch,
		close_branch,	
	};
}());
document.getElementById("root").onclick = myModule.open_branch;