const ROOT = 'app';

module.exports = function(plop) {

	// create component
	plop.setGenerator('component', {
		description : 'Create Component',
		prompts : [
			{
				type : 'input',
				name : 'name',
				message : 'name: ',
				validate : function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'name is required';
				}
			}
		],
		actions : [
			{
				type: 'add',
				path : ROOT + '/components/{{ properCase name }}.js',
				templateFile : './plop-templates/component.txt'
			},
			{
				type: 'add',
				path : ROOT + '/styles/components/_{{ dashCase name }}.scss',
				templateFile : './plop-templates/scss.txt'
			},
			{
				type: 'modify',
				path: ROOT + '/styles/app.scss',
				pattern: /(\/\*imports\*\/)/gi,
				template: '$1\r\n@import "\components/{{dashCase name}}\";'
			},
		]
	});
	// -- end component
}