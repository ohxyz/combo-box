var path = require( 'path' );

module.exports = env => {

    const environ = env.NODE_ENV;
    const componentName = env.COMPONENT;
    const appName = env.APP;

    let outputPath = path.join( __dirname, 'test/dev' );
    let entryPath = './src/app.js';

    if ( environ === 'prod' ) {

        outputPath = path.join( __dirname , 'dist' );
    }

    let outputPathFragment = '';
    let fileName = '';
    let folder = '';

    if ( environ === 'dev' ) { 

        // Todo: check componentName's actual type, eg. '', undefined or null
        if ( componentName ) {

            folder = path.join( __dirname, 'test', environ, 'components', componentName );

            entryPath = path.join( folder, 'app.js' );
            outputPath = folder;
        }
        else if ( appName ) {

            folder = path.join( __dirname, 'test', environ, 'apps', appName );

            entryPath = path.join( folder, 'app.js' );
            outputPath = folder;
        }
    }

    console.log( 'Entry path  : ', entryPath );
    console.log( 'Output path : ', outputPath );
    console.log( '\n' );

    return {

        mode: 'development',
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'bundle.js'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [ 
                {
                    test: /\.js[x]{0,1}$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [ 'react', 'env' ]
                        }
                    }
                },
                { 
                    test: /\.less$/,
                    use: [ 
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "less-loader" }
                    ]
                } 
            ]
        },
        devServer: {
            contentBase: outputPath,
            compress: true,
            port: 5000,
            inline: false, /* Only disable auto-reload for browser, not code. */
        },
    };
};