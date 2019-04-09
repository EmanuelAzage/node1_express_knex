const { expect } = require('chai');
const Track = require('./../../../models/track');


describe('track', () => {
  describe('milliseconds', () => {
    it('should fail when not numeric', async () => {
      try {
        let track = new Track({name: "a", milliseconds: "a"});
        await track.validate();
        expect(1).equal(2); // should not get here if validation fails
      } catch (error) {
        expect(error).to.have.property('errors');
      }
    });

    it('should pass when numeric', async () => {
      try {
        let track = new Track({name: "a", milliseconds: "1"});
        await track.validate();
      } catch (error) {
        expect(error).to.equal(undefined);
      }
    });
  });
});
