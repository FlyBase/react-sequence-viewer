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
        webpack: {
            compat: {
                enzyme: true
            }
        }
};

