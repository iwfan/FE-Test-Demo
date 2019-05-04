function add(a, b) {
    return a + b;
}

test('should return 2 when given 1 and 1', () => {
    // Arrange
    const [num1, num2] = [1, 1];
    // Act
    const result = add(num1, num2);
    // Assert
    expect(result).toEqual(2);
})
