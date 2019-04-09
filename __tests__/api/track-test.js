const frisby = require('frisby');

const { Joi } = frisby;

it('should return status of 404 when the track is not found', () => {
  return frisby
          .patch('http://localhost:8000/api/tracks/-1', {
            name: "test",
            milliseconds: "1",
            unitPrice: "1"
          })
          .expect('status', 404);
});

it('should return status of 200 and updated track when the track is found', () => {
  return frisby
          .patch('http://localhost:8000/api/tracks/1', {
            name: "test",
            milliseconds: "1",
            unitPrice: "1"
          })
          .expect('status', 200)
          .expect('json', 'name', 'test')
          .expect('json', 'milliseconds', '1')
          .expect('json', 'unitPrice', '1');
});

it('should return status of 422 and validation errors when the body is incorrect', () => {
  return frisby
          .patch('http://localhost:8000/api/tracks/1', {
            name: "",
            milliseconds: "a",
            unitPrice: "b"
          })
          .expect('status', 422)
          .expect('json', 'errors[0][attribute]', 'name')
          .expect('json', 'errors[1][attribute]', 'unitPrice')
          .expect('json', 'errors[2][attribute]', 'milliseconds');
});
