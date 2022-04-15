/** IGNORE: Only use when forcing webpack v5 on moralis sdk
 * 
 * module.exports = function override(config, env) {
    let loaders = config.resolve
    loaders.fallback = {
        "os": require.resolve("os-browserify/browser"),
        "fs": false,
        "tls": false,
        "net": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve('https-browserify'),
        "zlib": require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert"),
        "crypto": require.resolve("crypto-browserify")
    }

    return config
}
 */

