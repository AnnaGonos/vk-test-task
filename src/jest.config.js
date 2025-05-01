module.exports = {
    transformIgnorePatterns: [
        "/node_modules/(?!(axios)/)"
    ],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    }
};
