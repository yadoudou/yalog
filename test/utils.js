function loadEsModule( moduleName ) {
    let module = require(`../dist/${moduleName}`);
    if ( module.__esModule && ( 'default' in module ) ) {
        return module.default;
    }
    return module;
}

module.exports = {
    loadEsModule
};