using System;
using System.Linq;

namespace App.Utils
{
    public static class Statistics
    {
        // NOTE: I don't know if it is just my poor Googling skills or not. This is the first time I've
        // needed to calculate standard deviation in .Net Core and there does not seem to be method
        // in the standard framework to do so. Also was not a clear winner in terms of open source
        // packages. So quickly implemented one myself :)
        //
        // P.S. I gave me an excuse to write some more tests as a demonstration
        public static double StandardDeviation(double[] input)
        {
            if (input.Length < 2) throw new ArgumentException("At least 2 numbers need to be provided");
            
            var mean = input.Average();

            var squaredDifferences = input.Select(i =>
            {
                var diff = i - mean;
                var squaredDifference = Math.Pow(diff, 2);
                return squaredDifference;
            });

            var meanOfSquaredDifferences = squaredDifferences.Average();

            var standardDeviation = Math.Sqrt(meanOfSquaredDifferences);

            return standardDeviation;
        }
    }
}