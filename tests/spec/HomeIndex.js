describe("Launch Home Page", function() {
    var responseEmail = '',
        responseStatus = 0,
        matcherEmail = 'aakash.lpin@gmail.com';

    it ("should validate email", function() {
        expect(validateEmail('')).toBe(false);
        expect(validateEmail('a.a@com')).toBe(false);
        expect(validateEmail('a@a.com')).toBe(true);
    });

    beforeEach(function(done) {
        var request = getRequest().instance;
        var data = new FormData();
        data.append('email', matcherEmail);
        request.onload = function() {
            var serverResponse = JSON.parse(this.responseText);
            responseEmail = serverResponse.email;
            responseStatus = this.status;
            done();
        };
        request.send(data);
    });

    it ("should talk to server", function(done) {
        expect(responseStatus).toBeGreaterThan(199);
        expect(responseStatus).toBeLessThan(400);
        expect(responseEmail).toMatch(matcherEmail);
        done();
    });
});