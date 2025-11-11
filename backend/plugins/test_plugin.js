module.exports = {
    name: "My Plugin 1.0",
    disabled: false,

    provideSearch: async function(query) {
        return [
            { 
                title_name: `Test Plugin Query Result For ${query}`,
                type: 1,
                display_url: "https://soreyfitness.com/wp-content/uploads/2016/09/it-works-wraps-min.png"
            }
        ];
    }
};