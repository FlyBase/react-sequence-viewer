var path = require('path');

module.exports =  {
        type: 'react-component',
        npm: {
            esModules: true,
            umd: {
                global: 'ReactSequenceViewer',
                externals: {
                    react: 'React'
                }
            }
        },
        // Override require('handlebars') in sequence-viewer.js 
        // Without this, the sequence-viewer package will require
        // the main Handlebar.js bundle, which causes problems with webpack.
        //
        // To avoid these problems, you can also import the Handlebars.js
        // runtime only package, but that requires the use of external templates
        // and a webpack loader to precompile them.  The sequence-viewer component
        // uses inline Handlebars.js templates currently.
        webpack: {
            aliases: {
                'handlebars': path.resolve("node_modules/handlebars/dist/handlebars.min.js"),
                'jQuery': path.resolve("node_modules/jquery/dist/jquery.min.js")
            }
        }
};

