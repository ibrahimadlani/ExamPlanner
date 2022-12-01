package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Planning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanningRepository extends JpaRepository<Planning, Long> {
}
