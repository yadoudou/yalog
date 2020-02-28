function loadEsModule( moduleName ) {
    let module = require(`../dist/${moduleName}`);
    if (  'default' in module  ) {
        return module.default;
    }
    return module;
}

module.exports = {
    loadEsModule
};