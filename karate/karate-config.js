function() {
    karate.configure('connectTimeout', 50000);
    karate.configure('readTimeout', 50000);
    karate.configure('ssl', true);
    karate.configure('logPrettyResponse', true);

    const testConfig = {
        apiURL: 'http://localhost:8080/api/v1',
        environmentDataFolder: '../data/'
    }

    return testConfig
}