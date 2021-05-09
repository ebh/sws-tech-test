using System;
using App.Utils;
using FluentAssertions;
using Xunit;

namespace App.Test.Utils
{
    public class StatisticsTests
    {
        [Theory]
        [InlineData(new double[] {})]
        [InlineData(new double[] {1})]
        
        public void StandardDeviation_WhenCalledNotithEnoughData_ThrowsException(double[] input)
        {
            // Assemble
            
            // Act
            Action act = () => Statistics.StandardDeviation(input);
            
            // Assert
            act.Should().Throw<ArgumentException>()
                .WithMessage("At least 2 numbers need to be provided");
        }
        
        
        [Theory]
        // Expected test results from https://www.calculator.net/standard-deviation-calculator.html
        [InlineData(new double[] {1, 1}, 0)]
        [InlineData(new double[] {1, 2}, 0.5)]
        [InlineData(new double[] {1, 2, 3}, 0.816496580927726)]
        public void StandardDeviation_WhenCalledWithEnoughData_ReturnsExpected(double[] input, double expected)
        {
            // Assemble
            
            // Act
            var result = Statistics.StandardDeviation(input);

            // Assert
            result.Should().Be(expected);
        }
    }
}