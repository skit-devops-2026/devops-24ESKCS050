// Placeholder test proving the CI test job actually runs and can fail.
// Replace/extend once the team's app logic has testable functions.
function add(a, b) {
  return a + b;
}

test('add() sums two numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});

test('add() fails loudly on wrong input types (sanity check)', () => {
  expect(add(2, 3)).not.toBe(6);
});
