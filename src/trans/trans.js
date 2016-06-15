;
define([], function(){

    var Trans = function(Twig, Lang){

        this.language = Lang == undefined ? {} : Lang;
        Twig.extend(this.extendTransTag.bind(this));
        return Twig;

    };

    Trans.prototype = {

        extendTransTag: function(Twig)
        {
            Twig.exports.extendTag({
                type: "trans",
                regex: /^trans\s+(.+)$/,
                next: [ ],
                open: true,
                compile: this.compile.bind(this),
                parse: this.parse.bind(this)
            });
        },

        compile: function (token) {
            var expression = token.match[1];
            token.stack = Twig.expression.compile.apply(this, [{
                type:  Twig.expression.type.expression,
                value: expression
            }]).stack;

            delete token.match;
            return token;
        },

        parse: function (token, context, chain) {
            var output = token.stack[0] == undefined ?
                '' :
                token.stack[0].value;

            if(this.language[output] != undefined){
                output =      this.language[output];
            }

            return {
                chain: false,
                output: output
            };
        }

    };

    return Trans;
});