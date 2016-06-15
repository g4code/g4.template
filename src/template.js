;
define([
    "twig",
    "./trans/trans",
    './trans/lang'
], function(
    Twig,
    Trans,
    Lang
){

    var Template = function(Html, data, context){

        this.langExists() ?
            new Lang().get(this.doRender.bind(this, Html, data, context)) :
            this.doRender(Html, data, context);

    };

    Template.prototype = {

        getxpandedData: function(data)
        {
            if(data.response == undefined){
                data.response = {
                    site_domain_name: SITE_VARIABLES.DOMAIN,
                    static_domains:SITE_VARIABLES.STATIC_DOMAINS,
                    site_group_name:SITE_VARIABLES.SITE_GROUP_NAME,
                    white_label_config:WL_CONF
                }
            }
            return data;
        },


        render: function(Html, data, context, Lang)
        {
            try {
                Twig = new Trans(Twig, Lang);

                var template = Twig.twig({
                    data: Html,
                    allowInlineIncludes: true,
                    url: '//' + location.hostname,
                    base: '/templates'
                });

                var data = this.getxpandedData(data);

                switch(data.inject_method) {
                    case 'html':
                        $(context).html(template.render(data));
                        break;
                    case 'append':
                        $(context).append(template.render(data));
                        break;
                    case 'prepend':
                        $(context).prepend(template.render(data));
                        break;
                    default:
                        $(context).html(template.render(data));
                }
            }
            catch(err) {
                console.log(Html);
                console.log(err);
            }
        },

        doRender: function(Html, data, context, Lang)
        {
              this.render(Html, data, context, Lang);
        },

        langExists: function()
        {
            return new Lang().exists();
        }

    };

    return Template;
});