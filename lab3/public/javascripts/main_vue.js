



Vue.component('item', {
  template: '#item-template',
  props: {
    model: Array
  },
  data: function () {
    return {
	  open: false,
	  create: false,
	  str: ""
    }
  },
  computed: {
    isFolder: function () {
	  return this.model[1].length != 0
    },
	isRoot: function () {
		if (this.$root.$children[0] == this){
		return true
		}
		return false
	}
  },
  methods: {
    toggle: function () {
		if (this.model[1].length == 0&&this.isRoot) {
			function __get(){
				return $.get("/data")
			}
		    var _get = async function() {
				var res = await __get()
				return JSON.parse(res) 
			}
			_get()
			.then (data => {
				this.model = data
				this.open = !this.open
			})
		}
		else{
        this.open = !this.open
		}
    },
    addChild: function () {
		this.create = true
    },
	addElement: function() {
		if (this.str.length != 0){
		this.model[1].push([this.str,[]])
		var tree = JSON.stringify(this.$root.$children[0].model)
		function __get(data){
				return $.get("/data", "data=" + data)
			}
		var _get = async function(dt) {
			var res = await __get(dt)
			return res
		}
		_get(tree)
		.then( data => {
			setTimeout(() => {},200)
		})
		}
		this.create = false
	}
  }
})

var demo = new Vue({
  el: '#demo',
  data: function () {
	  return {
		  treeData: ['Корінь',[]]
	  }
  }
})