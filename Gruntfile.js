/*
 * Exclusivamente para gerar a documentação do SASS
 *
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        //DOCUMENTAÇÃO DO SASS
        sassdoc: {
            default: {
                src: './celsoLisboa-app/src/styles.scss',
                options: {
                    config: './config.json',
                },
            },
        },
    });

    //loading tasks
    grunt.loadNpmTasks('grunt-sassdoc');

    // tasks
    grunt.registerTask('default','sassdoc');
};
