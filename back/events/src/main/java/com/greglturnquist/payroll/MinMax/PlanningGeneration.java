package com.greglturnquist.payroll.MinMax;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class PlanningGeneration {
    static List<Integer> getPossibleStates(int nombrePlanning) {
        return IntStream.rangeClosed(1, 3).boxed()
                .map(i -> nombrePlanning - i)
                .filter(newHeapCount -> newHeapCount >= 0)
                .collect(Collectors.toList());
    }
}